import { AuthActionTypes, LOGOUT, SET_USER } from "./auth-actions";

interface AuthState {
  userId: string | null;
}

const initialState: AuthState = {
  userId: null,
};

const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userId: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        userId: null,
      };
    default:
      return state;
  }
};

export default authReducer;
