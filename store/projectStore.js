import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'liyantis_projects';
const TEMP_PROJECT_KEY = 'liyantis_temp_project';

export const useProjectStore = create((set, get) => ({
  projects: [],
  tempProject: null,
  isLoading: true,

  // Initialize store from AsyncStorage
  initializeStore: async () => {
    try {
      const storedProjects = await AsyncStorage.getItem(STORAGE_KEY);
      const tempProject = await AsyncStorage.getItem(TEMP_PROJECT_KEY);
      if (storedProjects) {
        set({ projects: JSON.parse(storedProjects), isLoading: false });
      }
      if (tempProject) {
        set({ tempProject: JSON.parse(tempProject) });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error loading projects from storage:', error);
      set({ isLoading: false });
    }
  },

  // Save projects to AsyncStorage
  saveToStorage: async (projects) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving projects to storage:', error);
    }
  },

  // Save temporary project (incomplete)
  saveTempProject: async (projectData) => {
    try {
      await AsyncStorage.setItem(TEMP_PROJECT_KEY, JSON.stringify(projectData));
      set({ tempProject: projectData });
    } catch (error) {
      console.error('Error saving temp project:', error);
    }
  },

  // Add a new project (temporary - not yet saved to main list)
  addProject: (projectData) => {
    const tempProject = {
      ...projectData,
      _id: `project_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    get().saveTempProject(tempProject);
    set({ tempProject });
  },

  // Complete and save project (move from temp to main)
  completeProject: (projectId) => {
    set((state) => {
      if (state.tempProject && state.tempProject._id === projectId) {
        const newProjects = [...state.projects, state.tempProject];
        get().saveToStorage(newProjects);
        // Clear temp project
        AsyncStorage.removeItem(TEMP_PROJECT_KEY);
        return { projects: newProjects, tempProject: null };
      }
      return state;
    });
  },

  // Update project (updates temp project if incomplete, or main project if complete)
  updateProject: (projectId, updates) => {
    set((state) => {
      // Check if it's a temp project
      if (state.tempProject && state.tempProject._id === projectId) {
        const updatedTemp = { ...state.tempProject, ...updates };
        get().saveTempProject(updatedTemp);
        return { tempProject: updatedTemp };
      }
      
      // Otherwise update main projects
      const newProjects = state.projects.map((p) =>
        p._id === projectId ? { ...p, ...updates } : p
      );
      get().saveToStorage(newProjects);
      return { projects: newProjects };
    });
  },

  // Get project by ID
  getProject: (projectId) => {
    const state = get();
    // Check temp project first
    if (state.tempProject && state.tempProject._id === projectId) {
      return state.tempProject;
    }
    return state.projects.find((p) => p._id === projectId);
  },

  // Get all projects (only completed ones)
  getAllProjects: () => {
    return get().projects;
  },

  // Delete project
  deleteProject: (projectId) => {
    set((state) => {
      // Check if it's temp project
      if (state.tempProject && state.tempProject._id === projectId) {
        AsyncStorage.removeItem(TEMP_PROJECT_KEY);
        return { tempProject: null };
      }
      
      // Otherwise delete from main projects
      const newProjects = state.projects.filter((p) => p._id !== projectId);
      get().saveToStorage(newProjects);
      return { projects: newProjects };
    });
  },

  // Clear all projects
  clearProjects: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      await AsyncStorage.removeItem(TEMP_PROJECT_KEY);
      set({ projects: [], tempProject: null });
    } catch (error) {
      console.error('Error clearing projects:', error);
    }
  },
}));
