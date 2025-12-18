import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import { authRoute } from "./modules/auth/auth.routes";
import { projectRoutes } from "./modules/projects/project.routes";
import { sprintRoutes } from "./modules/sprints/sprint.routes";
import { taskRoutes } from "./modules/tasks/task.routes";

const app = express()
const PORT = process.env.PORT || 5000;

//connectDB
connectDB()

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://project-pilot-puce.vercel.app",
     
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req:Request, res: Response) => {
  res.send('Project pilot server is running')
})

//CRUD
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/sprint", sprintRoutes);
app.use("/api/v1/tasks", taskRoutes);




app.listen(PORT, () => {
  console.log(`Project pilot server is running on port ${PORT}`)
})
