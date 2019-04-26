var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: {
        type: String, 
        unique: true,
        required: 'username is required',
        trim: true},
    email: {
        type: String, 
        index: true},
    password: {
        type: String,
        validate: [
            function(password) {
                return password && password.length >= 6;
            }, 'Password must be at least 6 characters']},
    salt: {
        type: String},
    provider: {
        type:String,
        required: 'Provider is required'},
    provideerId: String,
    providerData: {},
    created: {
        type: Date,
        default: Date.now}
});

userSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = new Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

userSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
}

userSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
}

mongoose.model('User', userSchema);