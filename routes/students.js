const express = require('express');
const studentControll = require('../controllers/studentControll')
const router = express.Router();
const path = require('path');
let applied = require("../models/applyModel") 

router.get('/', studentControll.posted);
router.get('/hired', studentControll.hired);
router.get('/rejected', studentControll.rejected);


router.get('/apply', (req, res) => {
    const filePath = path.join(__dirname, '..', 'test', 'apply.html');
    res.sendFile(filePath);
})


router.post('/submit', async (req, res) => {
    try{
        let newApply = new applied({
            JobName: req.body.jobName,
            FullName: req.body.fullName,
            email: req.body.email,
            Age: req.body.age,
            GPA: req.body.gpa,
            Date: req.body.date
        })
        await newApply.save()
        res.send('Form submitted successfully')
        let candidates = await applied.find()
        console.log(candidates)
        }catch(e){
          console.log(e.message)
    }
})


//create student - we dont need this, i just created this for us to create dummy student inorder to test our functionalities 
router.get("/create", studentControll.create)
module.exports = router;
