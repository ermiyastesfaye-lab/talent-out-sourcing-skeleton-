const asyncHandler = require("express-async-handler");

//employer service first page
exports.index = asyncHandler
(async (req,res,next) => {
    res.send('employer page')
})

//view job posting page
exports.post = asyncHandler(
    async (req,res,next) => {
        res.send('job posting page')
    }
)

//view posted page
exports.posted = asyncHandler(
    async (req,res,next) => {
        res.send('posted page')
    }
)