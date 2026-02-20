import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ProjectItem from '../components/ProjectItem';
import { SAMPLE_PROJECTS } from '../data/sampleProjects';
import { ProjectStorageService } from '../services/ProjectStorageService';
import { Project, ProjectStatus } from '../types/Project';

type FilterOption = 'all' | ProjectStatus;

const FILTER_OPTIONS: { label: string; value: FilterOption }[] = [
  { label: 'All', value: 'all' },
  { label: 'Archived', value: 'archived' },
  { label: 'Completed', value: 'completed' },
];

/**
 * Main screen for browsing, searching, and managing old AI projects.
 */
export default function OldProjectsScreen() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterOption>('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Keep a ref to the current query/filter so callbacks always use fresh values.
  const queryRef = useRef(query);
  const filterRef = useRef(filter);
  queryRef.current = query;
  filterRef.current = filter;

  const loadProjects = useCallback(async () => {
    const currentQuery = queryRef.current;
    const currentFilter = filterRef.current;
    const status = currentFilter === 'all' ? undefined : currentFilter;
    const results = await ProjectStorageService.search(currentQuery, status);
    setProjects(results);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function initialize() {
      setLoading(true);
      try {
        const existing = await ProjectStorageService.getAll();
        if (existing.length === 0) {
          // Seed sample data on first launch
          const now = new Date();
          const seeded: Project[] = SAMPLE_PROJECTS.map((p, i) => ({
            ...p,
            id: `${Date.now() - i * 1000}-${Math.random().toString(36).substring(2, 9)}`,
            createdAt: new Date(now.getTime() - (i + 1) * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(now.getTime() - i * 12 * 60 * 60 * 1000).toISOString(),
          }));
          await ProjectStorageService.replaceAll(seeded);
        }
        if (!cancelled) await loadProjects();
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    initialize();
    return () => {
      cancelled = true;
    };
  }, [loadProjects]);

  // Re-filter whenever query or filter changes (after initial load completes).
  useEffect(() => {
    if (!loading) {
      loadProjects();
    }
  }, [query, filter, loading, loadProjects]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadProjects();
    } finally {
      setRefreshing(false);
    }
  }, [loadProjects]);

  const handleProjectPress = useCallback((project: Project) => {
    Alert.alert(
      project.name,
      `${project.description}\n\nStatus: ${project.status}\nTags: ${project.tags.join(', ')}\nCreated: ${new Date(project.createdAt).toLocaleDateString()}\nUpdated: ${new Date(project.updatedAt).toLocaleDateString()}`,
      [{ text: 'Close' }]
    );
  }, []);

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🔍</Text>
        <Text style={styles.emptyTitle}>No projects found</Text>
        <Text style={styles.emptySubtitle}>
          {query ? 'Try adjusting your search or filter.' : 'Pull down to refresh.'}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Old Projects</Text>
        <Text style={styles.subtitle}>Browse your archived and completed AI work</Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, description, or tag…"
          placeholderTextColor="#9CA3AF"
          value={query}
          onChangeText={setQuery}
          clearButtonMode="while-editing"
          autoCorrect={false}
          accessibilityLabel="Search projects"
        />
      </View>

      {/* Filter chips */}
      <View style={styles.filters}>
        {FILTER_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            style={[styles.chip, filter === opt.value && styles.chipActive]}
            onPress={() => setFilter(opt.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: filter === opt.value }}
          >
            <Text style={[styles.chipText, filter === opt.value && styles.chipTextActive]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Project count */}
      {!loading && (
        <Text style={styles.countText}>
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </Text>
      )}

      {/* Content */}
      {loading ? (
        <ActivityIndicator size="large" color="#3B82F6" style={styles.loader} />
      ) : (
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProjectItem project={item} onPress={handleProjectPress} />
          )}
          ListEmptyComponent={renderEmpty}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#3B82F6"
            />
          }
          contentContainerStyle={projects.length === 0 ? styles.emptyList : styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
    paddingVertical: 12,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 8,
  },
  chip: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
    backgroundColor: '#E5E7EB',
  },
  chipActive: {
    backgroundColor: '#3B82F6',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  countText: {
    fontSize: 13,
    color: '#9CA3AF',
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  loader: {
    marginTop: 60,
  },
  list: {
    paddingBottom: 24,
  },
  emptyList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
