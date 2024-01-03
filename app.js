const express = require('express');
const app = express();
const path = require('path')
const port = 5000;

//ROUTES
const indexRouter = require('./routes/index')
const employerRouter = require('./routes/employers')
const studentRouter = require('./routes/students')
const messageRouter = require('./routes/message')
const profileRouter = require('./routes/profile')

app.use("/", indexRouter);
app.use("/employers", employerRouter);
app.use("/students", studentRouter);
app.use("/message", messageRouter);
app.use("/profile", profileRouter)

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


//START THE SERVER  
app.listen(port, () => {
    console.log(`the server is listening at http://localhost: ${port}`)
})
