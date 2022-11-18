import { Action, ActionType, Playlist } from './definitions';

export namespace Actions {
  export function reset(): Action {
    return {
      type: ActionType.RESET,
    };
  }

  export function play(): Action {
    return {
      type: ActionType.PLAY,
    };
  }

  export function pause(): Action {
    return {
      type: ActionType.PAUSE,
    };
  }

  export function setSongByIndex(index: number): Action {
    return {
      type: ActionType.SET_SONG_BY_INDEX,
      payload: index,
    };
  }

  export function nextSong(): Action {
    return {
      type: ActionType.NEXT_SONG,
    };
  }

  export function previousSong(): Action {
    return {
      type: ActionType.PREV_SONG,
    };
  }

  export function addToPlaylist(list: Playlist): Action {
    return {
      type: ActionType.ADD_TO_PLAYLIST,
      payload: list,
    };
  }

  export function updateSongDuration(duration?: number): Action {
    return {
      type: ActionType.UPDATE_SONG_DURATION,
      payload: duration,
    };
  }

  export function updateSongTime(time?: number): Action {
    return {
      type: ActionType.UPDATE_SONG_TIME,
      payload: time,
    };
  }

  export function updateSongTimeByUser(time?: number): Action {
    return {
      type: ActionType.UPDATE_SONG_TIME_BY_USER,
      payload: time,
    };
  }
}
