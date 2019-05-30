import store from '../store';
import axios from 'axios';
import * as auth from '../services/auth.service';

/**
 * Instance of Axios module
 * Automatically passes Token in Auth headers for every request
 *
 * @return  {Object}  Axios instance
 */
export function http() {
  return axios.create({
    baseURL: store.state.apiUrl,
    headers: {
      Authorization: auth.getToken()
    }
  });
}
