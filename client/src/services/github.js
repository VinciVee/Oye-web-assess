import axios from 'axios';
import config from '../config'; //imports our config data


export function getGitHubRestfulData() {
	return axios.get(
    config.baseURL + `/users/${config.username}/repos`, 
    config.options
  );
}