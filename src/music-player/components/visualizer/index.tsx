import { useRef, useEffect } from 'react';
import { useMusicPlayer } from '../../state';
import { styled } from '@mui/material/styles';
import { Container } from './Container';
// import { Wave } from '@foobar404/wave';

export function Visualizer() {
  const { state, dispatch, Actions } = useMusicPlayer();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (state.isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [state.currentSongIndex, state.isPlaying]);

  useEffect(() => {
    if (audioRef.current && !state.currentSongTimeUserUpdate) {
      audioRef.current.currentTime = state.currentSongTime || 0;
    }
  }, [state.currentSongTimeUserUpdate]);

  useEffect(() => {
    const ref = audioRef.current;

    const readMetadata = () => dispatch(Actions.updateSongDuration(ref?.duration));
    const jumpInTime = () => !state.currentSongTimeUserUpdate && dispatch(Actions.updateSongTime(ref?.currentTime));
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
  }, [state.currentSongIndex, state.currentSongTimeUserUpdate, Actions, dispatch]);

  // MediaElementAudioSource outputs zeroes due to CORS access restrictions
  /*
  useLayoutEffect(() => {
    let audioElement = document.getElementById('audioRef');
    let canvasElement = document.getElementById('canvasRef');

    if (state.currentSongIndex > -1 && state.isPlaying) {
      let wave = new Wave(audioElement as any, canvasElement as any);
      wave.addAnimation(new wave.animations.Wave());
    }
  }, [state.currentSongIndex, state.isPlaying]);
  */

  return (
    <Container
      animate={state.isPlaying}
      colors={state.playlist[state.currentSongIndex]?.color}
    >
      <audio id="audioRef" ref={audioRef} preload="auto" src={state.playlist[state.currentSongIndex]?.audio}></audio>
      <SoundCanvas id="canvasRef"></SoundCanvas>
    </Container>
  );
}

export const SoundCanvas = styled('canvas')`
  width: 100%;
  height: 100%;
`;
