import { useRef, useEffect } from 'react';
import { useMusicPlayer } from '../../state';

export function Visualizer() {
  const { state, dispatch, Actions } = useMusicPlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    function readMetadata() {
      console.log('readMetadata', audioRef.current?.duration);
      dispatch(Actions.updateSongDuration(audioRef.current?.duration));
    }

    if (state.isPlaying) {
      audioRef.current?.play();
      // renderFrame();
    } else {
      audioRef.current?.pause();
    }

    audioRef.current?.addEventListener('loadedmetadata', readMetadata);

    return () => {
      audioRef.current?.removeEventListener('loadedmetadata', readMetadata);
    };
  }, [state]);

  function renderFrame() {
    requestAnimationFrame(renderFrame);

    if (audioRef.current && canvasRef.current) {
      let context = new AudioContext();
      let src = context.createMediaElementSource(audioRef.current);
      let analyser = context.createAnalyser();
      let ctx = canvasRef.current.getContext("2d");
      src.connect(analyser);
      analyser.connect(context.destination);
      analyser.fftSize = 256;
      let bufferLength = analyser.frequencyBinCount;
      console.log(bufferLength);
      let dataArray = new Uint8Array(bufferLength);
      let barWidth = (canvasRef.current.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;
      analyser.getByteFrequencyData(dataArray);

      if (ctx) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        var r = barHeight + (25 * (i/bufferLength));
        var g = 250 * (i/bufferLength);
        var b = 50;

        if (ctx) {
          ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
          ctx.fillRect(x, canvasRef.current.height - barHeight, barWidth, barHeight);
        }
        x += barWidth + 1;
      }
    }
  }

  return (
    <>
      <audio ref={audioRef} preload="auto" src={state.playlist[state.currentSongIndex]?.audio}></audio>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}
