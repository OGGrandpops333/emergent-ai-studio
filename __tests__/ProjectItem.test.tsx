import React, { act } from 'react';
import renderer from 'react-test-renderer';
import ProjectItem from '../src/components/ProjectItem';
import { Project } from '../src/types/Project';

const archivedProject: Project = {
  id: '1',
  name: 'Sentiment Analyzer',
  description: 'Classifies reviews as positive, negative, or neutral.',
  status: 'archived',
  tags: ['NLP', 'sentiment'],
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-15T00:00:00.000Z',
};

const completedProject: Project = {
  id: '2',
  name: 'Image Pipeline',
  description: 'CNN for object detection.',
  status: 'completed',
  tags: ['CNN', 'vision'],
  createdAt: '2025-02-01T00:00:00.000Z',
  updatedAt: '2025-02-10T00:00:00.000Z',
};

describe('ProjectItem', () => {
  it('renders without crashing', async () => {
    let tree: renderer.ReactTestRenderer;
    await act(async () => {
      tree = renderer.create(<ProjectItem project={archivedProject} onPress={() => {}} />);
    });
    expect(tree!.toJSON()).not.toBeNull();
  });

  it('displays the project name', async () => {
    let tree: renderer.ReactTestRenderer;
    await act(async () => {
      tree = renderer.create(<ProjectItem project={archivedProject} onPress={() => {}} />);
    });
    const json = JSON.stringify(tree!.toJSON());
    expect(json).toContain('Sentiment Analyzer');
  });

  it('displays the archived status badge', async () => {
    let tree: renderer.ReactTestRenderer;
    await act(async () => {
      tree = renderer.create(<ProjectItem project={archivedProject} onPress={() => {}} />);
    });
    const json = JSON.stringify(tree!.toJSON());
    expect(json).toContain('Archived');
  });

  it('displays the completed status badge', async () => {
    let tree: renderer.ReactTestRenderer;
    await act(async () => {
      tree = renderer.create(<ProjectItem project={completedProject} onPress={() => {}} />);
    });
    const json = JSON.stringify(tree!.toJSON());
    expect(json).toContain('Completed');
  });

  it('renders tags', async () => {
    let tree: renderer.ReactTestRenderer;
    await act(async () => {
      tree = renderer.create(<ProjectItem project={archivedProject} onPress={() => {}} />);
    });
    const json = JSON.stringify(tree!.toJSON());
    expect(json).toContain('NLP');
    expect(json).toContain('sentiment');
  });

  it('calls onPress when tapped', async () => {
    const onPress = jest.fn();
    let tree: renderer.ReactTestRenderer;
    await act(async () => {
      tree = renderer.create(<ProjectItem project={archivedProject} onPress={onPress} />);
    });
    const touchable = tree!.root.findByType(require('react-native').TouchableOpacity);
    await act(async () => {
      touchable.props.onPress();
    });
    expect(onPress).toHaveBeenCalledWith(archivedProject);
  });
});
