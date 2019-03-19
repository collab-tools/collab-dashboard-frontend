import { SET_LOADING } from "../constants/actionTypes";

const initialState = false;
export default function loading(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}
