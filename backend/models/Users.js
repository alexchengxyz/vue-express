import mongoose from 'mongoose';

const { Schema, model } = mongoose;

/**
 * username: 帳號
 * name: 後台暱稱
 * created_at: 建立時間
 * enable: 是否啟用
 */
const UsersSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  name: {
    type: String,
    maxlength: 50,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  enable: {
    type: Boolean,
    default: true,
  },
});

export default model('users', UsersSchema);
