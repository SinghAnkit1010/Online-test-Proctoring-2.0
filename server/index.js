import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
// import studentRouter from "./routes/studentRoutes.js";
// import institutionRouter from "./routes/institutionRoutes.js";
// import testRouter from "./routes/testRoutes.js";


//dotenv config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app=express();

//midleware
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/user", userRouter);
// app.use("/api/v1/student", studentRouter);
// app.use("/api/v1/institution", institutionRouter);
// app.use("/api/v1/test", testRouter);



//listen port
const port=process.env.PORT || 4000

// deployment config
// import path from "path"
// let __dirname = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }



app.listen(port, ()=>{
    console.log(`Server Running in ${process.env.NODE_MODE} Mode on port ${port}`.bgCyan.white);
});