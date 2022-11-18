import { styled } from '@mui/material/styles';
import { Toolbar, Stack, Typography, Slider, IconButton, IconButtonProps } from '@mui/material';
import { useMusicPlayer } from '../../state';
import PlayIcon from '@mui/icons-material/PlayCircleOutline';
import PauseIcon from '@mui/icons-material/PauseCircleOutline';
import NextIcon from '@mui/icons-material/SkipNext';
import PrevIcon from '@mui/icons-material/SkipPrevious';

export function PlayerControls() {
  const { state, dispatch, Actions } = useMusicPlayer();

  return (
    <>
      <SliderContainer>
        <Slider/>
      </SliderContainer>

      <ToolbarContainer>
        <Stack direction="row" alignItems="start" spacing={1}>
          <ControlButton
            disabled={state.currentSongIndex < 1}
            onClick={() => dispatch(Actions.previousSong())}
          >
            <PrevIcon/>
          </ControlButton>
          <ControlButton
            disabled={state.currentSongIndex === -1}
            onClick={() => dispatch(state.isPlaying ? Actions.pause() : Actions.play())}
          >
            {state.isPlaying ? <PauseIcon/> : <PlayIcon/>}
          </ControlButton>
          <ControlButton
            disabled={state.currentSongIndex === state.playlist.length - 1}
            onClick={() => dispatch(Actions.nextSong())}
          >
            <NextIcon/>
          </ControlButton>
        </Stack>

        <Stack sx={{flexGrow: 1}}/>

        <Typography variant="caption" component="pre">
          {formatDuration(0) + ' / ' + formatDuration(state.currentSongDuration)}
        </Typography>
      </ToolbarContainer>
    </>
  );
}

function formatDuration(duration: number): string {
  return [duration / 60, duration % 60]
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
    'font-size': '2rem',
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