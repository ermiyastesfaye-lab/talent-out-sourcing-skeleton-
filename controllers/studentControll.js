const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel")

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
