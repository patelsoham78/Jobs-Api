const express = require('express');

const router = express.Router();

const jobsController = require('./../controllers/jobsController');

router.route('/')
    .get(jobsController.getAllJobs)
    .post(jobsController.createJob);

router.route('/:id')
    .get(jobsController.getJob)
    .delete(jobsController.deleteJob)
    .patch(jobsController.updateJob);

module.exports = router;