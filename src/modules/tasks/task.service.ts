import { Task } from "./task.model";

const createTask = async (payload: any) => {
  return await Task.create(payload);
};

const getTasksByProject = async (projectId: string) => {
  return await Task.find({ project: projectId })
    .populate("assignedTo", "name email")
    .populate("sprint", "title")
    .sort({ createdAt: 1 });
};

const updateTaskStatus = async (taskId: string, status: string) => {
  return await Task.findByIdAndUpdate(
    taskId,
    { status },
    { new: true }
  );
};

const deleteTask = async (taskId: string) => {
  return await Task.findByIdAndDelete(taskId);
};

export const taskService = {
  createTask,
  getTasksByProject,
  updateTaskStatus,
  deleteTask,
};
