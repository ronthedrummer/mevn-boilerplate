import User from '../../models/user.model';
import { StringUtil } from '../../utils/string-utils';

/**
 * Fetches all users from the database.
 * Returns either an array of users or an error message
 *
 * @param   {Object}  req  Express request object
 * @param   {Object}  res  Express response object
 *
 * @return  {Object}      Express response with http code & data
 */
export function index(req, res) {
  User.find({}, (error, users) => {
    if (error) {
      return res.status(400).json();
    }
    return res.status(200).json(users);
  });
}

/**
 * Creates a new user in the database
 *
 * @param   {Object}  req  Express request object with user object in the body
 * @param   {Object}  res  Express response object for sending back response
 *
 * @return  {Object}       Express response object with either the newly created user or an error
 */
export function create(req, res) {
  const validation = validate(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message });
  }

  // create a new instance of the 'User' mongoose object with the provided data
  // expecting an object with the user properties inside
  const user = new User(req.body);

  // save the user object to the database
  user.save((error, user) => {
    if (error) {
      if (error.code === 11000) {
        // code 11000 means that there's already an entry in the database with the unique field value
        // in this case, there's already a user with that emaail address
        return res.status(403).json({ error: 'the email address is already in use' });
      }
      // response for all other errors
      return res.status(500).json({ error: 'some error occured trying to save the user' });
    }
    // let's change the password before returning the user object so we don't show somone's hashed password in the front-end
    user.password = '****';
    return res.status(200).json(user);
  });
}

// add more methods here: one, update, remove, etc.

/**
 * Validates a request object to ensure the expected properties are present and valid
 *
 * @param   {Object}  body  Express request body, object with properties
 *
 * @return  {Object}        Object with isValid & message
 */
function validate(body) {
  let errors = '';
  if (StringUtil.isEmpty(body.first_name)) {
    errors += 'first name is required.';
  }
  if (StringUtil.isEmpty(body.last_name)) {
    errors += 'last name is required.';
  }
  if (StringUtil.isEmpty(body.email)) {
    errors += 'email is required.';
  }
  if (StringUtil.isEmpty(body.password)) {
    errors += 'password is required.';
  }

  return {
    isValid: StringUtil.isEmpty(errors),
    message: errors
  };
}
