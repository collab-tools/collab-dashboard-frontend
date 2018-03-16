import {
  GET_TOTAL_MESSAGES,
} from '../constants/actionTypes';

const initialState = {
  totalMessages: -1,
}

export default function messages(state = initialState, action) {
  switch (action.type) {
    case GET_TOTAL_MESSAGES:
      return Object.assign({}, state, {
        totalMessages: action.totalMessages,
      });
    default:
      return state;
  }
}
