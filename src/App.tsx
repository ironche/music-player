import { styled } from '@mui/material/styles';
import MusicPlayer from './music-player';
import data from 'api/data';

const apiData = data();

export default function App() {
  return (
    <AppContainer>
      <MusicPlayer initialPlaylist={apiData}/>
    </AppContainer>
  );
}

const AppContainer = styled('div')`
  @media (min-width: 768px) {
    margin: 50px auto;
    max-width: 768px;
  }
`;
