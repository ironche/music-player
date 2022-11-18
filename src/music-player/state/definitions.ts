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
  currentSongTime: number;
  currentSongTimeUserUpdate: number;
}

export const initialState: State = {
  playlist: [],
  isPlaying: false,
  currentSongIndex: -1,
  currentSongDuration: 0,
  currentSongTime: 0,
  currentSongTimeUserUpdate: 0,
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
  UPDATE_SONG_TIME,
  UPDATE_SONG_TIME_BY_USER,
}

export interface Action {
  type: ActionType;
  payload?: unknown;
}
