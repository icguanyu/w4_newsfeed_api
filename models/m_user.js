const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '請輸入您的名字']
    },
    email: {
      type: String,
      required: [true, '請輸入您的 Email'],
      unique: true,
      lowercase: true,
      select: false
    },
    photo: String,
  },
  {
    collection: 'user'
  }
);

const User = mongoose.model('user', userSchema);

module.exports = User;

// User Schema 來自第四周講義