const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  private_key: String,
  public_key: String,
  mnemonics: String,
  address: String,
  firends_list: Array,
});

module.exports = mongoose.model('User', userSchema);
