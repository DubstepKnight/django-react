import { createContext, Dispatch } from 'react';

export const initAuthState: AuthState = {
  isAuthenticated: false,
  devMode: false,
};

export type AuthState = {
  isAuthenticated: boolean;
  devMode: boolean;
};

export enum ActionType {
  SIGN_IN,
  SIGN_OUT,
  SWITCH_DEV_MODE,
}

type Action = { type: ActionType.SIGN_IN } | { type: ActionType.SIGN_OUT } | { type: ActionType.SWITCH_DEV_MODE };

export const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case ActionType.SIGN_IN:
      return { ...state, isAuthenticated: true };
    case ActionType.SIGN_OUT:
      return { ...state, isAuthenticated: false };
    case ActionType.SWITCH_DEV_MODE:
      return { ...state, devMode: !state.devMode };
    default:
      return state;
  }
};

export const AuthContext = createContext<(AuthState & { dispatch: Dispatch<Action> }) | null>(null);
