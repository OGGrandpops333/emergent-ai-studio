import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Project } from '../types/Project';

interface Props {
  project: Project;
  onPress: (project: Project) => void;
}

const STATUS_COLORS: Record<Project['status'], string> = {
  archived: '#F59E0B',
  completed: '#10B981',
};

const STATUS_LABELS: Record<Project['status'], string> = {
  archived: 'Archived',
  completed: 'Completed',
};

/**
 * Displays a single project card with a status badge and tags.
 */
export default function ProjectItem({ project, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(project)}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={`${project.name}, ${STATUS_LABELS[project.status]}`}
    >
      <View style={styles.header}>
        <Text style={styles.name} numberOfLines={1}>
          {project.name}
        </Text>
        <View
          style={[
            styles.badge,
            { backgroundColor: STATUS_COLORS[project.status] },
          ]}
        >
          <Text style={styles.badgeText}>{STATUS_LABELS[project.status]}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {project.description}
      </Text>

      {project.tags.length > 0 && (
        <View style={styles.tags}>
          {project.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.date}>
        Updated {new Date(project.updatedAt).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginRight: 8,
  },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 10,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
