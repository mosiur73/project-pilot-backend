import { Router } from "express";
import auth from "../../middleware/auth";
import { projectController } from "./project.controller";



const router = Router();

router.post("/",auth("admin"), projectController.createProject);
router.get("/", auth(), projectController.getProjects);
router.get("/:id", auth(), projectController.getProject);
router.put("/:id", auth("admin"), projectController.updateProject);
router.delete("/:id", auth("admin"), projectController.deleteProject);

export const projectRoutes = router;
