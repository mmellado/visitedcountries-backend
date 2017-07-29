import mongoose from 'mongoose';

let Schema = mongoose.Schema;

const UserSchema = new Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  countries: {
    type: Array,
  },
  created: {
    type: Date,
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
  }
});

export default mongoose.model('User', UserSchema);
