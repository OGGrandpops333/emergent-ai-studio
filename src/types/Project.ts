/**
 * Represents the status of a project.
 */
export type ProjectStatus = 'archived' | 'completed';

/**
 * Represents an AI project stored in the application.
 */
export interface Project {
  /** Unique identifier for the project */
  id: string;
  /** Display name of the project */
  name: string;
  /** Brief description of what the project does */
  description: string;
  /** Current status of the project */
  status: ProjectStatus;
  /** Tags used for categorization and search */
  tags: string[];
  /** ISO timestamp when the project was created */
  createdAt: string;
  /** ISO timestamp when the project was last updated */
  updatedAt: string;
}
