import { SyntheticEvent } from 'react';
import { Toolbar, Stack, Typography, Slider, IconButton, IconButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useMusicPlayer } from '../../state';
import PlayIcon from '@mui/icons-material/PlayCircleOutline';
import PauseIcon from '@mui/icons-material/PauseCircleOutline';
import NextIcon from '@mui/icons-material/SkipNext';
import PrevIcon from '@mui/icons-material/SkipPrevious';

export function PlayerControls() {
  const { state, dispatch, Actions } = useMusicPlayer();
  const songNotSet = state.currentSongIndex === -1;

  function handleSliderChange(event: Event | SyntheticEvent<Element, Event>, value: number | number[]): void {
    dispatch(Actions.updateSongTimeByUser(true));
    dispatch(Actions.updateSongTime(value as number));
  }

  function handleSliderChangeCommited(event: Event | SyntheticEvent<Element, Event>, value: number | number[]): void {
    dispatch(Actions.updateSongTime(value as number));
    dispatch(Actions.updateSongTimeByUser(false));
  }

  return (
    <>
      <SliderContainer>
        <Slider
          valueLabelDisplay="auto"
          valueLabelFormat={formatTime}
          max={Math.floor(state.currentSongDuration)}
          value={state.currentSongTime}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderChangeCommited}
        />
      </SliderContainer>

      <ToolbarContainer>
        <Stack direction="row" alignItems="start" spacing={1}>
          <ControlButton
            disabled={songNotSet}
            onClick={() => dispatch(Actions.previousSong())}
          >
            <PrevIcon/>
          </ControlButton>
          <ControlButton
            disabled={songNotSet}
            onClick={() => dispatch(state.isPlaying ? Actions.pause() : Actions.play())}
          >
            {state.isPlaying ? <PauseIcon/> : <PlayIcon/>}
          </ControlButton>
          <ControlButton
            disabled={songNotSet}
            onClick={() => dispatch(Actions.nextSong())}
          >
            <NextIcon/>
          </ControlButton>
        </Stack>

        <Stack sx={{flexGrow: 1}}/>

        <Typography variant="caption" component="pre">
          {formatTime(state.currentSongTime) + ' / ' + formatTime(state.currentSongDuration)}
        </Typography>
      </ToolbarContainer>
    </>
  );
}

function formatTime(time: number): string {
  return [time / 60, time % 60]
    .map((val) => Math.floor(val).toString().padStart(2, '0'))
    .join(':')
}

const ControlButton = styled((props: IconButtonProps) => {
  const { color, edge, size, ...rest } = props;
  return (
    <IconButton color="inherit" edge="start" size="medium" {...rest}>
      {props.children}
    </IconButton>
  );
})(({ theme }) => ({
  '.MuiSvgIcon-root': {
    fontSize: '2rem',
  },
}));

const SliderContainer = styled('header')`
  position: absolute;
  top: -13px;
  left: 0px;
  right: 0px;
`;

const ToolbarContainer = styled(Toolbar)`
  margin-top: 20px;
`;
