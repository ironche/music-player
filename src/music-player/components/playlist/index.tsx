import { List, ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import EmptyList from './EmptyList';
import { useMusicPlayer } from '../../state';

export function Playlist() {
  const { state, dispatch, Actions } = useMusicPlayer();

  return (
    <List>
      {(state.playlist.length < 1) && <EmptyList count={3}/>}
      {state.playlist.map((song, i) =>
        <ListItemButton
          key={song.id}
          selected={state.currentSongIndex === i}
          onClick={() => dispatch(Actions.setSongByIndex(i))}
        >
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
        </ListItemButton>
      )}
    </List>
  );
}
