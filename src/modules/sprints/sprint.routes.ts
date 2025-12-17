import { Router } from "express";
import auth from "../../middleware/auth";
import { sprintController } from "./sprint.controller";

const router = Router();

// Create Sprint (Admin / Manager)
router.post("/:projectId",auth("admin", "manager"),sprintController.createSprint);
router.get("/:projectId",auth(),sprintController.getSprintsByProject);
router.delete("/:id",auth("admin", "manager"),sprintController.deleteSprint);

export const sprintRoutes = router;
