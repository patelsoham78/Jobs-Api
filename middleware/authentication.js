const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');

const auth = async (req,res,next) => {
    //check header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(400).json({
            status: 'fail',
            message: 'Not logged in'
        });
    };
    const token = authHeader.split(' ')[1];
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        
        //const freshUser = await User.findById(payload.id).select('-password');
        req.user = {userId: payload.userId,name: payload.name};
        //req.user = freshUser;
        next();
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            message: 'Not logged in'
        });
    }
};

module.exports = auth;