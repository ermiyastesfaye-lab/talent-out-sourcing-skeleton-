const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const employerRouter = require('./routes/employers');
const studentRouter = require('./routes/students');
const messageRouter = require('./routes/message');
const profileRouter = require('./routes/profile');
const employerAuthRouter = require('./routes/employerAuthRoute');
const studentAuthRouter = require('./routes/studentAuthRoute');
const { requireEmpAuth } = require('./middleware/employerAuthMiddleware');
const { requireStudAuth } = require('./middleware/studentAuthMiddleware');
const cookieParser = require('cookie-parser');
const { sendEmail } = require('./routes/sendEmail');

const port = 5000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//ROUTES
app.use("/", indexRouter);
app.use("/employers", requireEmpAuth, employerRouter);
app.use("/students", requireStudAuth, studentRouter);
app.use("/employer-auth", employerAuthRouter);
app.use("/student-auth", studentAuthRouter);
app.use("/message", messageRouter);
app.use("/profile", profileRouter);

// View engine setup - for displaying the dynamic front end content
app.set("views", path.join(__dirname, "view"));
app.set("view engine", "pug");

// Set up mongoose connection
mongoose.set("strictQuery", false);

const mongoDB = "mongodb://localhost:27017/jobportal";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log('connected to MongoDb');
}

// Example route to handle hiring
app.post('/hire-candidate', (req, res) => {
  const candidateEmail = req.body.email;

  // Your logic to hire the candidate

  // Send email
  // sendEmail(candidateEmail, 'Hired', 'Congratulations! You have been hired.');

  // Send response to the client
  res.send('Candidate hired successfully!');
});

// Example route to handle rejection
app.post('/reject-candidate', (req, res) => {
  const candidateEmail = req.body.email;

   // Send email
   sendEmail(candidateEmail, 'Rejected', 'We regret to inform you that you have been rejected.');

   // Send response to the client
   res.send('Candidate rejected successfully!');

  // Your logic to reject the candidate
  app.post('/store-hired-candidate', async (req, res) => {
    const { fullName } = req.body;
  
    try {
      const newHiredCandidate = new HiredCandidate({ name: fullName });
      await newHiredCandidate.save();
  
      res.send('Candidate stored in the HiredCandidate model.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error storing candidate.');
    }
  });

app.get('/rejected-candidates', (req, res) => {
  const rejectedCandidates = candidates.filter((c) => c.status === 'Rejected');
  res.render('rejected', { rejectedCandidates });
});

 
});

//START THE SERVER
app.listen(port, () => {
  console.log(`the server is listening at http://localhost:${port}`);
});
