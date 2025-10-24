const express = require('express');
const dotenv = require("dotenv");
const userRoute = require('./route/userRoute.js');
const studentRoute = require('./route/studentRoute.js');
const teacherRoute = require('./route/teacherRoute.js');
const classRoute = require('./route/classRoute.js');
const connectDB = require('./config/database.js');
const { notFound, globalError } = require('./middleware/globalErrorHandler.js');
const createDefaultAdmin = require('./seedAdmin.js');
const cors = require("cors");
// const sendGmail = require('./util/sendGmail.js');

// ! create express app
// sendGmail("kalabala53626@gmail.com", "1234567")
const app = express();

// ! load the evironmental variable
dotenv.config();

// ! database connection
connectDB().then(() => {
  createDefaultAdmin();  // yaha call hoga
});

// ! setup the middleware
app.use(express.json());
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));


//? setup router
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/students", studentRoute);
app.use("/api/v1/teachers", teacherRoute);
app.use("/api/v1/classes", classRoute);

//? No page found middleware
app.use(notFound);
//? Global error handler middleware
app.use(globalError);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`School Management System on port http://localhost:${port}`)
})