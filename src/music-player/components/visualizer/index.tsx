import { useRef, useEffect } from 'react';
import { useMusicPlayer } from '../../state';

export function Visualizer() {
  const { state, dispatch, Actions } = useMusicPlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (state.isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [state.currentSongIndex, state.isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = state.currentSongTime || 0;
    }
  }, [state.currentSongTimeUserUpdate]);

  useEffect(() => {
    const ref = audioRef.current;

    const readMetadata = () => dispatch(Actions.updateSongDuration(ref?.duration));
    const jumpInTime = () => dispatch(Actions.updateSongTime(ref?.currentTime));
    const goToNext = () => dispatch(Actions.nextSong());

    const events: Array<[string, () => void]> = [
      ['loadedmetadata', readMetadata],
      ['timeupdate', jumpInTime],
      ['ended', goToNext],
    ];

    events.forEach((ev) => ref?.addEventListener(ev[0], ev[1]));
    return () => {
      events.forEach((ev) => ref?.removeEventListener(ev[0], ev[1]));
    };
  }, [state.currentSongIndex, Actions, dispatch]);

  return (
    <>
      <audio ref={audioRef} preload="auto" src={state.playlist[state.currentSongIndex]?.audio}></audio>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}
