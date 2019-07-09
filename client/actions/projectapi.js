import axios from "axios";
import { ROOT_API } from "../constants/url";
import { _getLatestProjects } from "./actions";

const projectRoutePrefix = ROOT_API + "/projects";

export function getLatestProjects(maxEntries) {
  let url = projectRoutePrefix + "/";
  return axios
    .post(
      url,
      {
        maxProjects: maxEntries
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getLatestProjects ', response.data);
      return _getLatestProjects(response.data);
    })
    .catch(error => {
      throw error;
    });
}
