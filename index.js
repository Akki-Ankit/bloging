const express = require("express");
const app = express();
const { dbConnect } = require("./config/dataConnection");
const { userRouter } = require("./router/usersRoute");
const { postrouter } = require("./router/blogRouter");
const cors = require('cors');


const PORT = 5001; //  port number for the server

app.use(cors({
  origin: 'http://localhost:4200', // or '*' to allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// connection to the database
dbConnect();

// routes for user-related API endpoints
app.use("/api/v1/Users", userRouter);

// routes for blog-related API endpoints
app.use("/api/v1/Blog", postrouter);

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.log("Not Connected to Port");
  }
  console.log(`Listening on Port: ${PORT}`);
});
