import { http } from './http.service';

/**
 *
 * Hand full of methods you can use from Vue files to make calls to the api
 *
 */

/**
 * Gets all users, if you have admin access
 *
 * @return  {Object}  Express response with users array, or error. Includes http status
 */
export function getAllUsers() {
  return http().get('/user');
}

/**
 * Gets a specific user by ID
 *
 * @param   {String}  id  User ID
 *
 * @return  {Object}      Express response object with user data, or error
 */
export function getUserById(id) {
  return http().get(`/user/${id}`);
}

/**
 * Creates a new user, if they don't already exist
 *
 * @param   {Object}  user  User object
 *
 * @return  {Object}        Express response with new user object, or error
 */
export function createUser(user) {
  return http().post('/user', user);
}

/**
 * removes user by id
 *
 * @param   {String}  id  user id
 *
 * @return  {Object}      Express response
 */
export function removeUser(id) {
  return http().delete(`/user/${id}`);
}

/**
 * updates a user
 *
 * @param   {Object}  user  User object with new data
 *
 * @return  {Object}        Express response
 */
export function updateUser(user) {
  http().put('/user', user);
}
