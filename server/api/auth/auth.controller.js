import { StringUtil } from '../../utils/string-utils';
import User from '../../models/user.model';
import { generateJWT } from '../../services/auth.service';

export function index(req, res) {
  const validation = validateIndex(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message });
  }

  User.findOne({ email: req.body.email.toLowerCase() }, (error, user) => {
    if (error) {
      return res.status(400).json({ error: 'error fetching user from DB' });
    }
    if (!user) {
      return res.status(416).json({ error: 'invalid login or user does not exist' });
    }

    const passwordMatches = User.passwordMatches(req.body.password, user.password);
    if (!passwordMatches) {
      return res.status(403).json({ error: 'invalid login' });
    }
    user.password = 'hidden';
    const token = generateJWT(user);
    return res.status(200).json({ user: user, token: token });
  });
}

function validateIndex(body) {
  let errors = '';
  if (StringUtil.isEmpty(body.email)) {
    errors += 'username is required.';
  }
  if (StringUtil.isEmpty(body.password)) {
    errors += 'password is required.';
  }

  return {
    isValid: StringUtil.isEmpty(errors),
    message: errors
  };
}
