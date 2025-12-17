import { Request, Response } from "express";
import { taskService } from "./task.service";

// Create Task
const createTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.createTask(req.body);

    res.status(201).json({
      success: true,
      message: "Task created",
      data: task,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Tasks by Project
const getTasksByProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    const tasks = await taskService.getTasksByProject(projectId!);

    res.json({
      success: true,
      data: tasks,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Task Status
const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await taskService.updateTaskStatus(id!, status);

    res.json({
      success: true,
      message: "Task status updated",
      data: task,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Task
const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await taskService.deleteTask(id!);

    res.json({
      success: true,
      message: "Task deleted",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const taskController = {
  createTask,
  getTasksByProject,
  updateTaskStatus,
  deleteTask,
};
