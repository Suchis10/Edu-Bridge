const mongoose = require('mongoose');
const Teacher = require("../models/teacher.js"); 
const teachers = [
  {
    name: "A Sharma",
    contact: 8999788989,
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    intro: "Experienced Mathematics tutor with a passion for teaching and student success.",
    language: "Hindi",
    rate: 450,
    experience: "6 years"
  },
  {
    name: "Ravi Patel",
    contact: 8999787689,
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    intro: "Experienced Science tutor with a passion for teaching and student success.",
    language: "English",
    rate: 600,
    experience: "8 years"
  },
  {
    name: "Neha Verma",
    contact: 8909786689,
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    intro: "Experienced English tutor with a passion for teaching and student success.",
    language: "Marathi",
    rate: 500,
    experience: "5 years"
  },
  {
    name: "Amit Singh",
    contact: 9999786689,
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    intro: "Experienced Physics tutor with a passion for teaching and student success.",
    language: "Gujarati",
    rate: 700,
    experience: "10 years"
  },
  {
    name: "Sneha Reddy",
    contact: 8939786689,
    image: "https://randomuser.me/api/portraits/women/13.jpg",
    intro: "Experienced Chemistry tutor with a passion for teaching and student success.",
    language: "Telugu",
    rate: 550,
    experience: "7 years"
  },
  {
    name: "Karan Mehra",
    contact: 8999706689,
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    intro: "Experienced Biology tutor with a passion for teaching and student success.",
    language: "Hindi",
    rate: 620,
    experience: "9 years"
  },
  {
    name: "Divya Joshi",
    contact: 8999786489,
    image: "https://randomuser.me/api/portraits/women/11.jpg",
    intro: "Experienced History tutor with a passion for teaching and student success.",
    language: "Kannada",
    rate: 480,
    experience: "4 years"
  },
  {
    name: "Arjun Kumar",
    contact: 8999786609,
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    intro: "Experienced Geography tutor with a passion for teaching and student success.",
    language: "Tamil",
    rate: 530,
    experience: "6 years"
  },
  {
    name: "Priya Bansal",
    contact: 8999786681,
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    intro: "Experienced Computer Science tutor with a passion for teaching and student success.",
    language: "English",
    rate: 750,
    experience: "12 years"
  },
  {
    name: "Vikas Chopra",
    contact: 8999786289,
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    intro: "Experienced Mathematics tutor with a passion for teaching and student success.",
    language: "Bengali",
    rate: 490,
    experience: "5 years"
  }
];

mongoose.connect("mongodb://127.0.0.1:27017/hometutorapp")
  .then(() => {
    console.log("Connected to DB");
    return Teacher.insertMany(teachers);
  })
  .then(() => {
    console.log("Teachers inserted");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error:", err);
  });