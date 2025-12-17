const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
username: String,
role: { type: String, default: 'manager' },
password: String // plain for demo — ideally hashed
});
module.exports = mongoose.model('User', UserSchema);