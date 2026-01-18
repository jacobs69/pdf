import { create } from 'zustand';

export const useProjectStore = create((set, get) => ({
  projects: [],

  // Placeholder - your senior will implement backend integration
  addProject: (projectData) => {
    // Data collection only - no storage
  },

  updateProject: (projectId, updates) => {
    // Data collection only - no storage
  },

  getProject: (projectId) => {
    return null;
  },

  getAllProjects: () => {
    return [];
  },

  deleteProject: (projectId) => {
    // Placeholder
  },

  clearProjects: () => {
    // Placeholder
  },
}));
