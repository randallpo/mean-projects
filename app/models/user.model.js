var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: {
        type: String, 
        unique: true,
        trim: true},
    email: {
        type: String, 
        index: true},
    password: String,
    created: {
        type: Date,
        default: Date.now}
});
mongoose.model('User', userSchema);