import axios from "axios";
import { ROOT_API } from "../constants/url";
import { _getLatestUsers } from "./actions";

const userRoutePrefix = ROOT_API + "/users";

export function getLatestUsers(maxEntries) {
  let url = userRoutePrefix + "/";
  return axios
    .post(
      url,
      {
        maxUsers: maxEntries
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getLatestUsers ', response.data);
      return _getLatestUsers(response.data);
    })
    .catch(error => {
      throw error;
    });
}
