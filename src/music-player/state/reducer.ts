import { State, initialState, Action, ActionType, Playlist } from './definitions';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.RESET: {
      return {
        ...initialState,
      };
    }
    case ActionType.PLAY: {
      return {
        ...state,
        isPlaying: state.currentSongIndex > -1,
      };
    }
    case ActionType.PAUSE: {
      return {
        ...state,
        isPlaying: false,
      };
    }
    case ActionType.SET_SONG_BY_INDEX: {
      let newIndex = action.payload as number;

      if (newIndex >= state.playlist.length) {
        newIndex = state.playlist.length - 1;
      } else if (newIndex < 0) {
        newIndex = 0;
      }

      return {
        ...state,
        currentSongIndex: newIndex,
      };
    }
    case ActionType.NEXT_SONG: {
      if (!state.playlist.length) {
        return {
          ...state,
          currentSongIndex: -1,
        };
      }
      return {
        ...state,
        currentSongIndex: (state.currentSongIndex + 1) % state.playlist.length,
      };
    }
    case ActionType.PREV_SONG: {
      if (!state.playlist.length) {
        return {
          ...state,
          currentSongIndex: -1,
        };
      }
      return {
        ...state,
        currentSongIndex: (state.currentSongIndex || state.playlist.length) - 1,
      };
    }
    case ActionType.ADD_TO_PLAYLIST: {
      let payloadSongs = [];
      let payloadSongsLastActiveIndex = -1;

      if (Array.isArray(action.payload)) {
        let list = action.payload as Playlist;
        let i = 0;
        while (i < list.length) {
          const { active, ...song } = list[i];
          payloadSongs.push(song);
          if (active) {
            payloadSongsLastActiveIndex = i;
          }
          i++;
        }
      }

      let newSongIndex = state.currentSongIndex;
      if (payloadSongsLastActiveIndex > -1) {
        newSongIndex = payloadSongsLastActiveIndex;
        if (state.currentSongIndex > -1) {
          newSongIndex += state.playlist.length;
        }
      }

      return {
        ...state,
        currentSongIndex: newSongIndex,
        playlist: [...state.playlist, ...payloadSongs],
      };
    }
    case ActionType.UPDATE_SONG_DURATION: {
      return {
        ...state,
        currentSongDuration: action.payload as number || 0,
      };
    }
    default:
      throw new Error('Unknown music player action');
  }
}
