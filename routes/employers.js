const express = require('express');
const router = express.Router();
const employerControll = require('../controllers/employerControll')

//employer service first page
router.get('/', employerControll.index);

//job posting page
router.get('/post', employerControll.post);

//posted jobs page
router.get('/posted', employerControll.posted);

module.exports = router;
