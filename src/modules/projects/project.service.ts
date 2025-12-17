import { Project } from "./project.model";


// Create Project
const createProject = async (userId: string, payload: any) => {
  return await Project.create({ ...payload,
    createdBy: userId,
    members: [userId], 
  });
};

// Get all projects for a user (with optional filter)
const getProjects = async (userId: string, filter?: any) => {
  return await Project.find({ members: userId, ...filter }).populate(
    "members",
    "name email"
  );
};

// Get single project by ID
const getProjectById = async (projectId: string, userId: string) => {
  const project = await Project.findOne({ _id: projectId, members: userId }).populate(
    "members",
    "name email"
  );
  if (!project) throw new Error("Project not found or access denied");
  return project;
};

// Update project
const updateProject = async (projectId: string, userId: string, payload: any) => {
  const project = await Project.findOneAndUpdate(
    { _id: projectId, createdBy: userId },
    payload,
    { new: true }
  );
  if (!project) throw new Error("Project not found or not authorized");
  return project;
};

// Delete project
const deleteProject = async (projectId: string, userId: string) => {
  const project = await Project.findOneAndDelete({ _id: projectId, createdBy: userId });
  if (!project) throw new Error("Project not found or not authorized");
  return project;
};

export const projectService = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
