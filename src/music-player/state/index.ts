import { createContext, useContext, Dispatch } from 'react';
import { State, Action, Playlist } from './definitions';
import { Actions } from './actions';

interface ContextInterface {
  state: State;
  dispatch: Dispatch<Action>;
  Actions: typeof Actions;
}

export const MusicPlayerContext = createContext({} as ContextInterface);

export function useMusicPlayer(): ContextInterface {
  return useContext(MusicPlayerContext);
}

export type MusicPlayerList = Playlist;
export { initialState } from './definitions';
export { reducer } from './reducer';
export { Actions } from './actions';
