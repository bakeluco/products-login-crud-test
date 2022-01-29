const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    lastLogin: { type: Date },
    role: { type: String, trim: true, required: true },
    active: { type: Boolean, required: true },
    firstName: { type: String, trim: true, required: true },
    lasName: { type: String, trim: true, required: true },
    birthday: { type: Date, required: true },
})

module.exports = mongoose.model('User', userSchema);