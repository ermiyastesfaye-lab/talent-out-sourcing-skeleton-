const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel")
let Jobs = require("../models/jobModel")
let Hired = require("../models/hiredModel")
let Rejected = require("../models/rejectedModel")


exports.posted = asyncHandler(
    async (req,res,next) => {
      try{
        let jobs = await Jobs.find()
        res.render('studentposted', { jobs });
        //console.log(jobs) 
      }catch(e){
        console.log(e.message)
      }
    }
)
exports.hired = asyncHandler(
  async (req,res,next) => {
    try{
      let hired = await Hired.find()
      res.render('hired', { hired });
      //console.log(jobs) 
    }catch(e){
      console.log(e.message)
    }
  }
)
exports.rejected = asyncHandler(
  async (req,res,next) => {
    try{
      let rejected = await Rejected.find()
      res.render('rejected', { rejected });
      //console.log(jobs) 
    }catch(e){
      console.log(e.message)
    }
  }
)


//create student - we dont need this, i just created this for us to create dummy student inorder to test our functionalities 
exports.create = asyncHandler(async (req,res,next) => {
    try{
        const newStudent = Student.create({
            first_name: "abenezer",
            family_name: "tileye",
        })
        res.status(201).json({ message: 'Student created successfully', student: newStudent });
    }
    catch (error) {
        console.error('Error creating employer:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

})
