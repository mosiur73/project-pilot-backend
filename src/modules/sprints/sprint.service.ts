import { Sprint } from "./sprint.model";

const createSprint = async (projectId: string, payload: any) => {
  return await Sprint.create({
    ...payload,
    project: projectId,
  });
};

const getSprintsByProject = async (projectId: string) => {
  return await Sprint.find({ project: projectId }).sort({ createdAt: 1 });
};

const deleteSprint = async (sprintId: string) => {
  return await Sprint.findByIdAndDelete(sprintId);
};

export const sprintService = {
  createSprint,
  getSprintsByProject,
  deleteSprint,
};
