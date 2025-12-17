import { Request, Response } from "express";
import { sprintService } from "./sprint.service";

// Create Sprint
const createSprint = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    const sprint = await sprintService.createSprint(projectId!, req.body);

    res.status(201).json({
      success: true,
      message: "Sprint created",
      data: sprint,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Sprints by Project
const getSprintsByProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    const sprints = await sprintService.getSprintsByProject(projectId!);

    res.json({
      success: true,
      data: sprints,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Sprint
const deleteSprint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await sprintService.deleteSprint(id!);

    res.json({
      success: true,
      message: "Sprint deleted",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sprintController = {
  createSprint,
  getSprintsByProject,
  deleteSprint,
};
