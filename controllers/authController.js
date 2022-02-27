const User = require('./../models/userModel');
const {StatusCodes} = require('http-status-codes');
//const {BadRequestError} = require('./../errors/bad-request');

const register = async ( req,res) => {
    const newUser = await User.create({...req.body});

    const token = newUser.createJWT();
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            userID: newUser._id,
            token
        }
    });
};

const login = async ( req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        res.status(401).json({
            status: 'fail',
            message: 'Please provide a email and password'
        });
    }

    const currentUser = await User.findOne({email});
    if(!currentUser || !(await currentUser.comparePassword(password))){
        res.status(401).json({
            status: 'fail',
            message: 'Please provide correct email and password'
        });
    }

    const token = currentUser.createJWT();
    res.status(StatusCodes.OK).json({
        status: 'success',
        user: {
            name: currentUser.name
        },
        token
    });
};

module.exports = {
    register,
    login
}