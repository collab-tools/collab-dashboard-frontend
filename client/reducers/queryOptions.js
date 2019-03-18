import { SET_MAX_ENTRIES, SET_RECENCY_DAYS } from "../constants/actionTypes";

const initialState = {
  maxEntries: 10,
  recencyDays: 7
};
export default function queryOptions(state = initialState, action) {
  switch (action.type) {
    case SET_MAX_ENTRIES:
      return { ...state, maxEntries: action.maxEntries };
    case SET_RECENCY_DAYS:
      return { ...state, recencyDays: action.recencyDays };
    default:
      return state;
  }
}
