import { SET_RECENCY_DAYS } from "../constants/actionTypes";

const initialState = {
  recencyDays: 7
};
export default function queryOptions(state = initialState, action) {
  switch (action.type) {
    case SET_RECENCY_DAYS:
      return { ...state, recencyDays: action.recencyDays };
    default:
      return state;
  }
}
