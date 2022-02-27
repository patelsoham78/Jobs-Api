const Jobs = require('./../models/jobsModel');
const {StatusCodes} = require('http-status-codes');

const getAllJobs = async ( req,res) => {
    const jobs = await Jobs.find({createdBy: req.user.userId}).sort('createdAt');

    res.status(StatusCodes.OK).json({
        status: 'success',
        results: jobs.length,
        jobs
    });
};

const getJob = async ( req,res) => {
    const userId = req.user.userId;
    const id = req.params.id;

    const job = await Jobs.findOne({
        _id: id,
        createdBy:userId
    });

    res.status(StatusCodes.OK).json({
        job
    });
};

const createJob = async ( req,res) => {
    //console.log(req.user);
    req.body.createdBy = req.user.userId;
    const job = await Jobs.create(req.body);
    res.status(StatusCodes.CREATED).json({
        job
    });
};

const updateJob = async ( req,res) => {
    res.send('Update Job');
};

const deleteJob = async ( req,res) => {
    res.send('Delete Job');
};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}