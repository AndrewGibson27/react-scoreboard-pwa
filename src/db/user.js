import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  isAdmin: Boolean,
});

const User = mongoose.model('User', userSchema);

export default User;
