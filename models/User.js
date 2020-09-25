const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
  },
  payto: {
    type:Boolean,
  },
  paired: {
    type: [Object],

  },
  paring: {
    type: Boolean,

  },
  invested: {
    type: Number,
  },
  withdraw: {
    type: Number,
  },
  amount: { 
    type: Number,
  },
  invite: {
    type: Number,
  },
  investNumber: {
    type: Number,
  },
  blocked: {
    type: Boolean,

  },
  btn: {
    type: Boolean,
  },
  proof: {
    type: [Object],

  },
  registerProof: {
    type: [Object],

  },
  blockProof: {
    type: [Object],

  },
  detail: {
    type: [Object],

  },

  date: {
    type: Date,
    default: Date.now 
  },

});

const User = mongoose.model('User', UserSchema);

module.exports = User;
