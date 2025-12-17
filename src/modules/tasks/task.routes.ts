import { Router } from "express";
import auth from "../../middleware/auth";
import { taskController } from "./task.controller";

const router = Router();

// Create Task
router.post("/",auth("admin", "manager"),taskController.createTask);
router.get("/:projectId",auth(),taskController.getTasksByProject);
router.patch("/:id/status",auth(),taskController.updateTaskStatus);
router.delete("/:id",auth("admin", "manager"),taskController.deleteTask);

export const taskRoutes = router;
