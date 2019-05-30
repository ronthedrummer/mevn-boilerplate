import store from '../store';
import { http } from './http.service';
import jwt from 'jsonwebtoken';

/**
 * Checks if a user is logged in
 *
 * @return  {Boolean}
 */
export function isLoggedIn() {
  const token = decodeToken();
  if (!token) {
    return false;
  }
  return token != null;
}

/**
 * Checks if a user is an admin
 *
 * @return  {Boolean}
 */
export function isAdmin() {
  const token = decodeToken();
  if (!token) {
    return false;
  }
  return token.user.role === 'admin';
}

/**
 * Calls auth api endpoint to log a user in
 *
 * @param   {Object}  user  User object with email and password
 *
 * @return  {Object}        Express response object
 */
export function login(user) {
  return http()
    .post('/auth', user)
    .then(res => {
      if (res) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setToken(res.data.token);
      }
      return res;
    });
}

/**
 * Logs a user out by clearing localstorage and calling the authenticate method
 *
 * @function
 * @return
 */
export function logout() {
  localStorage.clear();
  store.dispatch('authenticate');
}

/**
 * Sets the token to localstorage
 *
 * @param   {String}  token  JWT token string
 *
 * @return
 */
function setToken(token) {
  localStorage.setItem('token', JSON.stringify(token));
  store.dispatch('authenticate');
}

/**
 * Decodes JWT token to have access to user properties
 *
 * @return  {Object}  Returns the user data provided in original token creation
 */
function decodeToken() {
  const token = getToken();
  if (!token) {
    return null;
  }
  return jwt.decode(token);
}

/**
 * Gets the token from localstorage
 *
 * @return  {String}  JWT token
 */
export function getToken() {
  return JSON.parse(localStorage.getItem('token'));
}

/**
 * Gets the user's email
 *
 * @return  {String}  User's email address from JWT token
 */
export function getUsername() {
  //return JSON.parse(localStorage.getItem('user_email'));
  const token = decodeToken();
  if (!token) {
    return null;
  }
  return token.user.email;
}

/**
 * Get User's ID
 *
 * @return  {String}  User Id from JWT token
 */
export function getUserId() {
  //return JSON.parse(localStorage.getItem('user_id'));
  const token = decodeToken();
  if (!token) {
    return null;
  }
  return token.user.id;
}

/**
 * Register a new user via api endpoint
 *
 * @param   {Object}  user  User object
 *
 * @return  {Object}        Express response with newly created user data
 */
export function registerUser(user) {
  return http()
    .post('/register', user)
    .then(res => {
      console.log(res);
    });
}
