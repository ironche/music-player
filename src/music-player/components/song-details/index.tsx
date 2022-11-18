import { List, ListSubheader, ListItem, ListItemAvatar, Avatar, ListItemText, Skeleton } from '@mui/material';
import { useMusicPlayer } from '../../state';

export function SongDetails() {
  const { state, dispatch, Actions } = useMusicPlayer();
  const song = state.playlist[state.currentSongIndex];

  if (!song) {
    return (<></>);
  }

  return (
    <List
      subheader={
        <ListSubheader>
          Currently playing
        </ListSubheader>
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
    </List>
  );
}

