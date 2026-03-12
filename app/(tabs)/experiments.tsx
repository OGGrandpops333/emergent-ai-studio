import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';

type ExperimentStatus = 'idle' | 'running' | 'completed' | 'failed';

type Experiment = {
  id: string;
  name: string;
  description: string;
  model: string;
  status: ExperimentStatus;
  runs: number;
  lastRun?: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
};

const INITIAL_EXPERIMENTS: Experiment[] = [
  {
    id: '1',
    name: 'Chain-of-Thought Reasoning',
    description: 'Test how step-by-step prompting improves multi-step problem solving',
    model: 'GPT-4o',
    status: 'completed',
    runs: 24,
    lastRun: '2 hours ago',
    icon: 'git-branch-outline',
    color: '#6366f1',
  },
  {
    id: '2',
    name: 'Temperature Sensitivity',
    description: 'Measure output diversity across temperature values 0.0–2.0',
    model: 'Claude 3.5 Sonnet',
    status: 'completed',
    runs: 10,
    lastRun: 'Yesterday',
    icon: 'thermometer-outline',
    color: '#f59e0b',
  },
  {
    id: '3',
    name: 'Few-Shot Learning',
    description: 'Evaluate accuracy improvements with 1, 3, and 5 examples',
    model: 'Gemini 1.5 Pro',
    status: 'idle',
    runs: 0,
    icon: 'school-outline',
    color: '#10b981',
  },
  {
    id: '4',
    name: 'Prompt Injection Robustness',
    description: 'Assess model resilience against adversarial prompt injections',
    model: 'GPT-4o',
    status: 'idle',
    runs: 0,
    icon: 'shield-outline',
    color: '#ec4899',
  },
];

const STATUS_CONFIG: Record<ExperimentStatus, { label: string; color: string; icon: React.ComponentProps<typeof Ionicons>['name'] }> = {
  idle: { label: 'Ready', color: '#6b7280', icon: 'ellipse-outline' },
  running: { label: 'Running', color: '#3b82f6', icon: 'sync-outline' },
  completed: { label: 'Done', color: '#10b981', icon: 'checkmark-circle-outline' },
  failed: { label: 'Failed', color: '#ef4444', icon: 'close-circle-outline' },
};

type ExperimentCardProps = {
  experiment: Experiment;
  isDark: boolean;
  onRun: (id: string) => void;
};

function ExperimentCard({ experiment, isDark, onRun }: ExperimentCardProps) {
  const status = STATUS_CONFIG[experiment.status];
  const isRunning = experiment.status === 'running';

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: isDark ? '#1a1d27' : '#f8f9fa' },
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.cardIcon, { backgroundColor: experiment.color + '20' }]}>
          <Ionicons name={experiment.icon} size={22} color={experiment.color} />
        </View>
        <View style={styles.cardMeta}>
          <Text style={[styles.cardTitle, { color: isDark ? '#ffffff' : '#0f1117' }]}>
            {experiment.name}
          </Text>
          <Text style={[styles.cardModel, { color: experiment.color }]}>{experiment.model}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: status.color + '20' }]}>
          <Ionicons name={status.icon} size={12} color={status.color} />
          <Text style={[styles.statusLabel, { color: status.color }]}>{status.label}</Text>
        </View>
      </View>

      <Text style={[styles.cardDescription, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
        {experiment.description}
      </Text>

      <View style={styles.cardFooter}>
        <View style={styles.runsInfo}>
          <Ionicons name="bar-chart-outline" size={14} color={isDark ? '#6b7280' : '#9ca3af'} />
          <Text style={[styles.runsText, { color: isDark ? '#6b7280' : '#9ca3af' }]}>
            {experiment.runs} {experiment.runs === 1 ? 'run' : 'runs'}
            {experiment.lastRun ? `  •  Last: ${experiment.lastRun}` : ''}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.runButton,
            {
              backgroundColor: isRunning
                ? (isDark ? '#374151' : '#e5e7eb')
                : experiment.color,
            },
          ]}
          onPress={() => onRun(experiment.id)}
          disabled={isRunning}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isRunning ? 'pause' : 'play'}
            size={14}
            color={isRunning ? (isDark ? '#9ca3af' : '#6b7280') : '#ffffff'}
          />
          <Text
            style={[
              styles.runButtonText,
              { color: isRunning ? (isDark ? '#9ca3af' : '#6b7280') : '#ffffff' },
            ]}
          >
            {isRunning ? 'Running…' : 'Run'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function ExperimentsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [experiments, setExperiments] = useState<Experiment[]>(INITIAL_EXPERIMENTS);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const handleRun = (id: string) => {
    setExperiments((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, status: 'running' as ExperimentStatus } : exp
      )
    );

    // Simulate experiment completion
    const timer = setTimeout(() => {
      setExperiments((prev) =>
        prev.map((exp) =>
          exp.id === id
            ? {
                ...exp,
                status: 'completed' as ExperimentStatus,
                runs: exp.runs + 1,
                lastRun: 'Just now',
              }
            : exp
        )
      );
    }, 3000);

    timersRef.current.push(timer);
  };

  const completedCount = experiments.filter((e) => e.status === 'completed').length;
  const totalRuns = experiments.reduce((sum, e) => sum + e.runs, 0);

  return (
    <FlatList
      style={[styles.container, { backgroundColor: isDark ? '#0f1117' : '#ffffff' }]}
      contentContainerStyle={styles.content}
      data={experiments}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: isDark ? '#ffffff' : '#0f1117' }]}>
              Experiments
            </Text>
            <Text style={[styles.headerSubtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
              Design and run experiments to explore AI model behavior
            </Text>
          </View>

          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: isDark ? '#1a1d27' : '#f8f9fa' }]}>
              <Text style={[styles.statValue, { color: isDark ? '#ffffff' : '#0f1117' }]}>
                {experiments.length}
              </Text>
              <Text style={[styles.statLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                Experiments
              </Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: isDark ? '#1a1d27' : '#f8f9fa' }]}>
              <Text style={[styles.statValue, { color: isDark ? '#ffffff' : '#0f1117' }]}>
                {totalRuns}
              </Text>
              <Text style={[styles.statLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                Total Runs
              </Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: isDark ? '#1a1d27' : '#f8f9fa' }]}>
              <Text style={[styles.statValue, { color: '#10b981' }]}>{completedCount}</Text>
              <Text style={[styles.statLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                Completed
              </Text>
            </View>
          </View>

          <Text style={[styles.listTitle, { color: isDark ? '#ffffff' : '#0f1117' }]}>
            All Experiments
          </Text>
        </>
      }
      renderItem={({ item }) => (
        <ExperimentCard experiment={item} isDark={isDark} onRun={handleRun} />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={<View style={styles.footer} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    borderRadius: 16,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardMeta: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  cardModel: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  runsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  runsText: {
    fontSize: 12,
  },
  runButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  runButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  separator: {
    height: 12,
  },
  footer: {
    height: 24,
  },
});
