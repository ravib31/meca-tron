export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';

export interface SetUserAction {
  type: typeof SET_USER;
  payload: string | null; // userId can be string or null
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes = SetUserAction | LogoutAction;

export const setUser = (userId: string | null): any => ({
  type: SET_USER,
  payload: userId,
});

export const logout = (): any => ({
  type: LOGOUT,
});
