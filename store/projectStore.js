import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'liyantis_projects';

export const useProjectStore = create((set, get) => ({
  projects: [],
  isLoading: true,

  // Initialize store from AsyncStorage
  initializeStore: async () => {
    try {
      const storedProjects = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedProjects) {
        set({ projects: JSON.parse(storedProjects), isLoading: false });
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

  // Add a new project
  addProject: (projectData) => {
    set((state) => {
      const newProjects = [...state.projects, {
        ...projectData,
        _id: `project_${Date.now()}`,
        createdAt: new Date().toISOString(),
      }];
      get().saveToStorage(newProjects);
      return { projects: newProjects };
    });
  },

  // Update project
  updateProject: (projectId, updates) => {
    set((state) => {
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
    return state.projects.find((p) => p._id === projectId);
  },

  // Get all projects
  getAllProjects: () => {
    return get().projects;
  },

  // Delete project
  deleteProject: (projectId) => {
    set((state) => {
      const newProjects = state.projects.filter((p) => p._id !== projectId);
      get().saveToStorage(newProjects);
      return { projects: newProjects };
    });
  },

  // Clear all projects
  clearProjects: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      set({ projects: [] });
    } catch (error) {
      console.error('Error clearing projects:', error);
    }
  },
}));
