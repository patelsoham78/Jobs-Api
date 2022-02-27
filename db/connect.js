const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
    }).then( () => console.log('DB successfully connected'));
};

module.exports = connectDB;