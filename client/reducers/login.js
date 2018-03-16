import {
  AUTHENTICATE_USER,
  UNAUTHENTICATE_USER
} from '../constants/actionTypes';

const initialState = {
  username: null,
  sessionToken: null,
  jwtToken: null,
}

export default function login(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER: {
      let loginToken = action.loginToken;
      let jwtToken = 'JWT ' + loginToken.sessionToken;
      return Object.assign({}, state, {
        username: loginToken.username,
        sessionToken: loginToken.sessionToken,
        jwtToken: jwtToken,
      });
    }
    case UNAUTHENTICATE_USER: {
      return Object.assign({}, state, {
        username: null,
        sessionToken: null,
        jwtToken: null,
      });
    }
    default:
      return state;
  }
}
