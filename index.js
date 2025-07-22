const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/user");
const app = express();
const Teacher = require("./models/teacher.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Connect Mongo
mongoose.connect("mongodb://127.0.0.1:27017/hometutorapp")
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

//Landing Page
app.get("/landing",(req,res) =>{
    res.render("users/landing.ejs");
});

// app.post("/login", (req, res) => {
//   const { username, password, role } = req.body;

//   if (role === "student") {
//     // check credentials in student DB
//     res.send("Student login logic here");
//   } else if (role === "tutor") {
//     // check credentials in tutor DB
//     res.render("teacherdashboard.ejs");
//   } else {
//     res.status(400).send("Invalid role selected.");
//   }
// });

app.post("/login", async (req, res) => {
  const { username, password, role } = req.body;

  const user = await User.findOne({ username, password });
  if (!user) return res.send("Invalid credentials");

  // Optional: check if role matches DB record
  if (user.role !== role) {
    return res.send("Role does not match the user data");
  }

  // Redirect based on role
  if (role === "Student") {
    res.redirect("/dashboard/student");
  } else if (role === "Tutor") {
    res.redirect("/dashboard/teacher");
  } else {
    res.status(400).send("Invalid role selected.");
  }
});

// GET login
app.get("/login", (req, res) => {
  res.render("users/login");
});

// POST login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.send("Invalid credentials");

  if (user.role === "student") {
    res.redirect("/dashboard/student");
  } else if (user.role === "tutor") {
    res.redirect("/dashboard/teacher");
  }
});

app.get("/register", async(req,res) =>{
    res.render("users/register.ejs");
});

//Register Student
app.post("/register", async (req, res) => {
  const { fullname, email, password, role, subject } = req.body;
  // Validate & save to DB
  console.log("New Registration:", req.body);
  res.send("Registration successful!");
});


// Student Dashboard Route
app.get('/dashboard/student', async (req, res) => {
  try {
    const tutors = await Teacher.find();
    res.render('users/studentdashboard.ejs', {  tutors });
  } catch (err) {
    console.error('Error fetching teachers:', err);
    res.status(500).send('Server Error');
  }
});

//Teacher Dashboard Route
app.get('/dashboard/teacher', (req, res) => {
  res.render('users/teacherdashboard.ejs', {
    teacherName: 'Mr. Smith',
    upcomingClasses: 3,
    totalStudents: 28,
    pendingAssignments: 5,
    unreadMessages: 2
  });
});

//assign homework
app.get('/assign-homework', (req, res) => {
  res.render('users/assignhw.ejs', {
    subjects: ['Mathematics', 'Science', 'English', 'Social Studies'],
    classes: ['Grade 10 - A', 'Grade 9 - B', 'Grade 8 - C'],
    selectedSubject: '',
    selectedClass: '',
    title: '',
    dueDate: '',
    instructions: ''
  });
});

//Manage Classes
app.get('/manage-classes', (req, res) => {
  const classes = [
    { id: 1, name: 'Math - Grade 10', subject: 'Algebra', studentCount: 23 },
    { id: 2, name: 'Science - Grade 8', subject: 'Biology', studentCount: 18 },
    { id: 3, name: 'English - Grade 7', subject: 'Literature', studentCount: 20 },
    { id: 4, name: 'History - Grade 9', subject: 'World History', studentCount: 15 },
    { id: 5, name: 'Computer - Grade 11', subject: 'Python Programming', studentCount: 28 },
    { id: 6, name: 'Physics - Grade 12', subject: 'Mechanics', studentCount: 19 }
  ];
  
  res.render('users/manageclass.ejs', { classes });
});

//Smart session
app.get('/start-session', (req, res) => {
  const classes = [
    { id: 1, name: 'Math - Grade 10', subject: 'Algebra', students: 23 },
    { id: 2, name: 'Science - Grade 8', subject: 'Biology', students: 18 },
    { id: 3, name: 'English - Grade 7', subject: 'Literature', students: 20 },
    { id: 4, name: 'History - Grade 9', subject: 'World History', students: 15 },
    { id: 5, name: 'Computer - Grade 11', subject: 'Python Programming', students: 28 },
    { id: 6, name: 'Physics - Grade 12', subject: 'Mechanics', students: 19 }
  ];

  res.render('users/smartboard.ejs', { classes });
});

//student d
app.get('/student', (req, res) => {
  res.render('users/studentd.ejs', {
    studentName: 'Rahul'
  });
});

//tutor details
app.get('/tuitions/nearby', async (req, res) => {
  try {
    const teachers = await Teacher.find({});
    res.render('users/tutor.ejs', { teachers });
  } catch (err) {
    res.status(500).send("Error loading dashboard");
  }
});

//remainders
app.get('/inbox', (req, res) => {
  const inboxMessages = [
    { sender: 'Student A', content: 'Can we reschedule our session?' },
    { sender: 'Student B', content: 'Assignment query regarding Chapter 5.' }
  ];
  res.render('users/remainder.ejs', { inboxMessages });
});

//announcements

app.get('/announcement', (req, res) => {
  res.render('users/announcement.ejs'); // Render the form
});

app.post('/post-announcement', (req, res) => {
  const { title, content } = req.body;
  // Save the announcement (e.g., to a database)
  console.log('New Announcement:', title, content);
  res.redirect('users/announcement.ejs'); // Redirect or render a confirmation page
});

//Student Progress
app.get('/student-progress', (req, res) => {
  const reports = [
    { grade: 'Grade 10', subject: 'Mathematics', score: 85, attendance: 96, feedback: 'Excellent understanding of concepts.' },
    { grade: 'Grade 9', subject: 'Science', score: 78, attendance: 92, feedback: 'Needs more participation in lab activities.' },
    { grade: 'Grade 8', subject: 'English', score: 91, attendance: 98, feedback: 'Strong reading and writing skills.' }
  ];
  res.render('users/progress.ejs', { reports });
});

//Anlytics
app.get('/analytics', (req, res) => {
  const dashboardData = [
    { title: 'Overall Class Average', value: '82%' },
    { title: 'Top Performing Subject', value: 'Mathematics - 92%' },
    { title: 'Lowest Performing Subject', value: 'History - 67%' },
    { title: 'Attendance Average', value: '94%' }
  ];
  res.render('users/analytics.ejs', { dashboardData });
});


// Dummy dashboard routes
app.get("/dashboard/student", (req, res) => {
  res.render("users/studentdashboard.ejs");
});
app.get("/dashboard/teacher", (req, res) => {
  res.send("Welcome");
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
