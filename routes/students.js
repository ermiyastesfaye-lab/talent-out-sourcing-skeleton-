const express = require('express');
const studentControll = require('../controllers/studentControll')
const router = express.Router();

router.get('/', (req, res) => {
    res.send('students page');
});


//create student - we dont need this, i just created this for us to create dummy student inorder to test our functionalities 
router.get("/create", studentControll.create)
module.exports = router;
