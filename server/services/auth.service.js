import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token to be saved in local storage
 *
 * @param   {Object}  user  User object
 *
 * @return  {String}        JWT token
 */
export function generateJWT(user) {
  const tokenData = { email: user.email, id: user._id, role: user.role };
  return jwt.sign({ user: tokenData }, process.env.TOKEN_SECRET);
}

/**
 * Auth middleware to check if a user is logged in
 *
 * @param   {Object}  req   Express request
 * @param   {Object}  res   Express response
 * @param   {Function}  next  Express next function that sends the user to where they were headed
 *
 * @return  {Object}        Express response with error or next()
 */
export function requireLogin(req, res, next) {
  const token = decodeToken(req);
  if (!token) {
    return res.status(401).json({ message: 'you must be logged in' });
  } else {
    next();
  }
}

/**
 * Decodes JWT token to get current user's data for use in authorization and database operations
 *
 * @param   {Object}  req  Express request
 *
 * @return  {Object}       User id & email, or 'null' if the token is not valid
 */
export function decodeToken(req) {
  const token = req.headers.authorization || req.headers['authoriation'];
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * Decodes the token and returns the user's first name
 *
 * @param   {Object}  req  Express request object
 *
 * @return  {String}       User's first name, if in token data
 */
export function getUserName(req) {
  const token = decodeToken(req);
  if (!token) {
    return null;
  }
  return token.user.first_name;
}

/**
 * Decodes token and returns user's id
 *
 * @param   {Object}  req  Express request object
 *
 * @return  {String}       User id
 */
export function getUserId(req) {
  const token = decodeToken(req);
  if (!token) {
    return null;
  }
  return token.user.id;
}

/**
 * Rouer middleware to only proceed if the user is an admin
 *
 * @param   {Object}  req   Express request object
 * @param   {Object}  res   Express response object
 * @param   {Function}  next  Express next method
 *
 * @return  {Object}        Express next response or null
 */
export function isAdmin(req, res, next) {
  const token = decodeToken(req);
  if (!token) {
    return null;
  }
  return token.user.role === 'admin' ? next() : null;
}
