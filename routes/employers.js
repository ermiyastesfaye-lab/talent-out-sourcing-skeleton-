const express = require('express');
const router = express.Router();
const employerControll = require('../controllers/employerControll')

//employer service first page
router.get('/', employerControll.index);

//job posting page
router.get('/post', employerControll.post);

//posted jobs page
router.get('/posted', employerControll.posted);

//create employer - we dont need this, i just created this for us to create dummy employer inorder to test our functionalities 
router.get('/create', employerControll.createEmployer)

module.exports = router;
