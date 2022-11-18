export interface Song {
  id: string;
  name: string;
  cover: string;
  artist: string;
  audio: string;
  color: string[];
}

export type Playlist = Array<Song & {active: boolean}>;

export interface State {
  playlist: Song[];
  isPlaying: boolean;
  currentSongIndex: number;
  currentSongDuration: number;
}

export const initialState: State = {
  playlist: [],
  isPlaying: false,
  currentSongIndex: -1,
  currentSongDuration: 0,
};

export enum ActionType {
  RESET,
  PLAY,
  PAUSE,
  SET_SONG_BY_INDEX,
  NEXT_SONG,
  PREV_SONG,
  ADD_TO_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  UPDATE_SONG_DURATION,
}

export interface Action {
  type: ActionType;
  payload?: unknown;
}
