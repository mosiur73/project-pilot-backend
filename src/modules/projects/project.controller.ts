import { Request, Response } from "express";
import { projectService } from "./project.service";

const createProject = async (req: Request, res: Response) => {
  
  try {
    
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "User not authenticated" 
      });
    }
     const result = await projectService.createProject(userId, req.body);
      return res.status(201).json({ 
      success: true, 
      message: "Project created", 
      data: result 
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};


// Get all Projects for user
const getProjects = async (req: Request, res: Response) => {
  try {
    const filter = req.query || {};
    const result = await projectService.getProjects(req.user?.id, filter);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single project
const getProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    if (!projectId) throw new Error("Project ID is required");

    const result = await projectService.getProjectById(projectId, req.user?.id);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// Update project
const updateProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    if (!projectId) throw new Error("Project ID is required");
    const result = await projectService.updateProject(projectId, req.user?.id, req.body);
    res.json({ success: true, message: "Project updated", data: result });
  } catch (error: any) {
    res.status(403).json({ success: false, message: error.message });
  }
};

// Delete project
const deleteProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    if (!projectId) 
      throw new Error("Project ID is required");
    const result = await projectService.deleteProject(projectId, req.user?.id);
    res.json({
       success: true, 
       message: "Project deleted",
      //  data: result 
      });
  } catch (error: any) {
    res.status(403).json({ 
      success: false, 
      message: error.message });
  }
};

export const projectController = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};
