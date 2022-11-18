import { useReducer, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { MusicPlayerContext, reducer, initialState, Actions, MusicPlayerList } from './state';
import { Playlist, SongDetails, PlayerControls, Visualizer } from './components';

interface MusicPlayerProps {
  initialPlaylist?: MusicPlayerList;
}

export default function MusicPlayer(props: MusicPlayerProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (Array.isArray(props.initialPlaylist) && props.initialPlaylist.length) {
      dispatch(Actions.addToPlaylist(props.initialPlaylist));
    }
  }, [props]);

  return (
    <MusicPlayerContext.Provider value={{ state, dispatch, Actions }}>
      <Paper>
        <GridContainer>
          <VisualizerContainer>
            <SongDetails/>
            <Visualizer/>
          </VisualizerContainer>

          <ControlsContainer>
            <PlayerControls/>
          </ControlsContainer>

          <PlaylistContainer>
            <Playlist/>
          </PlaylistContainer>
        </GridContainer>
      </Paper>
    </MusicPlayerContext.Provider>
  );
}

const GridContainer = styled('div')`
  display: grid;
  grid: "visualizer" 300px
        "controls" 100px
        "playlist" auto
        / auto;

  @media (min-width: 768px) {
    grid: "visualizer playlist" 500px
          "controls playlist" 100px
          / auto 300px;
  }
`;

const VisualizerContainer = styled('div')`
  grid-area: visualizer;
`;

const ControlsContainer = styled('footer')`
  grid-area: controls;
  position: relative;
`;

const PlaylistContainer = styled('aside')`
  grid-area: playlist;
  overflow: auto;
`;
