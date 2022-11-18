import { List, ListSubheader, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useMusicPlayer } from '../../state';

export function SongDetails() {
  const { state } = useMusicPlayer();
  const song = state.playlist[state.currentSongIndex];

  if (!song) {
    return (<></>);
  }

  return (
    <InfoList
      subheader={
        <InfoListHeader>
          Currently playing
        </InfoListHeader>
      }
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar
            alt={song.name}
            src={song.cover}
            variant="rounded"
          />
        </ListItemAvatar>
        <ListItemText
          primary={song.name}
          secondary={song.artist}
        />
      </ListItem>
    </InfoList>
  );
}

const InfoList = styled(List)`
  background-color: rgba(255, 255, 255, 0.5);
`;

const InfoListHeader = styled(ListSubheader)`
  background-color: transparent;
`;
