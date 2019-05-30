import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: { type: String, index: { unique: true } },
    password: String
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);
userSchema.set('timestamps', true);
userSchema.virtual('full_name').get(function() {
  return `${this.first_name} ${this.last_name}`;
});
userSchema.statics.passwordMatches = function(password, hash) {
  return bcrypt.compareSync(password, hash);
};
userSchema.pre('save', function(next) {
  this.email = this.email.toLowerCase();
  const unsafePassword = this.password;
  this.password = bcrypt.hashSync(unsafePassword);
  next();
});

export default mongoose.model('user', userSchema);
