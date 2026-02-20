import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProjectStorageService } from '../src/services/ProjectStorageService';
import { Project } from '../src/types/Project';

const mockProject: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> = {
  name: 'Test Project',
  description: 'A test AI project',
  status: 'archived',
  tags: ['test', 'ai'],
};

describe('ProjectStorageService', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('returns an empty array when storage is empty', async () => {
    const projects = await ProjectStorageService.getAll();
    expect(projects).toEqual([]);
  });

  it('creates a project with id, createdAt, and updatedAt', async () => {
    const project = await ProjectStorageService.create(mockProject);
    expect(project.id).toBeDefined();
    expect(project.createdAt).toBeDefined();
    expect(project.updatedAt).toBeDefined();
    expect(project.name).toBe('Test Project');
    expect(project.status).toBe('archived');
    expect(project.tags).toEqual(['test', 'ai']);
  });

  it('retrieves created projects from storage', async () => {
    await ProjectStorageService.create(mockProject);
    const projects = await ProjectStorageService.getAll();
    expect(projects).toHaveLength(1);
    expect(projects[0].name).toBe('Test Project');
  });

  it('sorts projects by updatedAt descending', async () => {
    const p1 = await ProjectStorageService.create({ ...mockProject, name: 'First' });
    const p2 = await ProjectStorageService.create({ ...mockProject, name: 'Second' });
    // Manually set updatedAt so First is newer
    const allRaw = await AsyncStorage.getItem('@emergent_ai_studio_projects');
    const parsed: Project[] = JSON.parse(allRaw!);
    parsed.forEach((p) => {
      if (p.id === p1.id) p.updatedAt = new Date(2025, 1, 2).toISOString();
      if (p.id === p2.id) p.updatedAt = new Date(2025, 1, 1).toISOString();
    });
    await AsyncStorage.setItem('@emergent_ai_studio_projects', JSON.stringify(parsed));
    const sorted = await ProjectStorageService.getAll();
    expect(sorted[0].name).toBe('First');
    expect(sorted[1].name).toBe('Second');
  });

  it('updates a project', async () => {
    const project = await ProjectStorageService.create(mockProject);
    const updated = await ProjectStorageService.update(project.id, { name: 'Updated Name' });
    expect(updated).not.toBeNull();
    expect(updated!.name).toBe('Updated Name');
    expect(updated!.status).toBe('archived');
  });

  it('returns null when updating a non-existent project', async () => {
    const result = await ProjectStorageService.update('nonexistent-id', { name: 'X' });
    expect(result).toBeNull();
  });

  it('removes a project', async () => {
    const project = await ProjectStorageService.create(mockProject);
    await ProjectStorageService.remove(project.id);
    const projects = await ProjectStorageService.getAll();
    expect(projects).toHaveLength(0);
  });

  it('searches by name', async () => {
    await ProjectStorageService.create({ ...mockProject, name: 'Sentiment Analyzer' });
    await ProjectStorageService.create({ ...mockProject, name: 'Image Pipeline' });
    const results = await ProjectStorageService.search('sentiment');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Sentiment Analyzer');
  });

  it('searches by description', async () => {
    await ProjectStorageService.create({
      ...mockProject,
      description: 'Uses NLP techniques',
    });
    await ProjectStorageService.create({
      ...mockProject,
      description: 'Uses CNN for vision',
    });
    const results = await ProjectStorageService.search('nlp');
    expect(results).toHaveLength(1);
    expect(results[0].description).toContain('NLP');
  });

  it('searches by tag', async () => {
    await ProjectStorageService.create({ ...mockProject, tags: ['nlp', 'bert'] });
    await ProjectStorageService.create({ ...mockProject, tags: ['cnn', 'vision'] });
    const results = await ProjectStorageService.search('bert');
    expect(results).toHaveLength(1);
  });

  it('filters by status', async () => {
    await ProjectStorageService.create({ ...mockProject, status: 'archived' });
    await ProjectStorageService.create({ ...mockProject, status: 'completed' });
    const archived = await ProjectStorageService.search('', 'archived');
    expect(archived).toHaveLength(1);
    expect(archived[0].status).toBe('archived');
    const completed = await ProjectStorageService.search('', 'completed');
    expect(completed).toHaveLength(1);
    expect(completed[0].status).toBe('completed');
  });

  it('returns all projects when query and status are empty', async () => {
    await ProjectStorageService.create({ ...mockProject, status: 'archived' });
    await ProjectStorageService.create({ ...mockProject, status: 'completed' });
    const results = await ProjectStorageService.search('');
    expect(results).toHaveLength(2);
  });

  it('replaceAll overwrites storage', async () => {
    await ProjectStorageService.create(mockProject);
    const replacement: Project[] = [
      {
        id: 'abc-123',
        name: 'Replaced',
        description: 'New',
        status: 'completed',
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    await ProjectStorageService.replaceAll(replacement);
    const projects = await ProjectStorageService.getAll();
    expect(projects).toHaveLength(1);
    expect(projects[0].name).toBe('Replaced');
  });
});
