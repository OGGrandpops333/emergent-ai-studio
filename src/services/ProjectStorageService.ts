import AsyncStorage from '@react-native-async-storage/async-storage';
import { Project, ProjectStatus } from '../types/Project';

const STORAGE_KEY = '@emergent_ai_studio_projects';

/**
 * Generates a unique ID using the current timestamp and a random suffix.
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Service for persisting and retrieving projects using AsyncStorage.
 */
export const ProjectStorageService = {
  /**
   * Retrieves all stored projects, sorted by most recently updated first.
   */
  async getAll(): Promise<Project[]> {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const projects: Project[] = JSON.parse(raw);
    return projects.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  },

  /**
   * Saves a new project and returns it.
   */
  async create(
    data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Project> {
    const existing = await this.getAll();
    const now = new Date().toISOString();
    const project: Project = {
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, project]));
    return project;
  },

  /**
   * Updates an existing project's fields and returns the updated project.
   * Returns null if no project with the given id is found.
   */
  async update(
    id: string,
    updates: Partial<Omit<Project, 'id' | 'createdAt'>>
  ): Promise<Project | null> {
    const existing = await this.getAll();
    const index = existing.findIndex((p) => p.id === id);
    if (index === -1) return null;
    const updated: Project = {
      ...existing[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    existing[index] = updated;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    return updated;
  },

  /**
   * Deletes a project by id.
   */
  async remove(id: string): Promise<void> {
    const existing = await this.getAll();
    const filtered = existing.filter((p) => p.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  /**
   * Returns projects whose name, description, or tags contain the query string
   * (case-insensitive), optionally filtered to a specific status.
   */
  async search(query: string, status?: ProjectStatus): Promise<Project[]> {
    const all = await this.getAll();
    const lower = query.toLowerCase();
    return all.filter((p) => {
      const matchesStatus = !status || p.status === status;
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.tags.some((tag) => tag.toLowerCase().includes(lower));
      return matchesStatus && matchesQuery;
    });
  },

  /**
   * Replaces all stored projects (used to seed sample data).
   */
  async replaceAll(projects: Project[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  },
};
