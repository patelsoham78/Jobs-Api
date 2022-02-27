const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'User name is required'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true,'User email is required'],
        validate: [validator.isEmail, 'Please enter a valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Password is required'],
        minlength: 6
    }
});

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);

    next();
});

//instace method for creating token
userSchema.methods.createJWT = function(){
    return jwt.sign({ userId:this._id, name:this.name },process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_LIFETIME
    });
};

//instance method for comapring hashed password
userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
};

const User = mongoose.model('User',userSchema);
module.exports = User;