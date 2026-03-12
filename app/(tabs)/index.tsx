import { useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import Colors from '@/constants/Colors';

type FeatureCardProps = {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  description: string;
  onPress: () => void;
  color: string;
};

function FeatureCard({ icon, title, description, onPress, color }: FeatureCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: isDark ? '#1a1d27' : '#f8f9fa' }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.cardIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <Text style={[styles.cardTitle, { color: isDark ? '#ffffff' : '#0f1117' }]}>{title}</Text>
      <Text style={[styles.cardDescription, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const features: FeatureCardProps[] = [
    {
      icon: 'chatbubbles-outline',
      title: 'AI Chat',
      description: 'Converse with AI models using natural language',
      onPress: () => router.push('/chat'),
      color: '#6366f1',
    },
    {
      icon: 'flask-outline',
      title: 'Experiments',
      description: 'Run and track AI experiments and evaluations',
      onPress: () => router.push('/experiments'),
      color: '#10b981',
    },
    {
      icon: 'analytics-outline',
      title: 'Insights',
      description: 'Visualize model behavior and emergent properties',
      onPress: () => router.push('/models'),
      color: '#f59e0b',
    },
    {
      icon: 'construct-outline',
      title: 'Fine-Tuning',
      description: 'Customize models with your own datasets',
      onPress: () => router.push('/models'),
      color: '#ec4899',
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? '#0f1117' : '#ffffff' }]}
      contentContainerStyle={styles.content}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Ionicons name="sparkles" size={40} color="#6366f1" />
        </View>
        <Text style={[styles.heroTitle, { color: isDark ? '#ffffff' : '#0f1117' }]}>
          Emergent AI Studio
        </Text>
        <Text style={[styles.heroSubtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
          Build, experiment, and discover emergent AI behaviors
        </Text>
      </View>

      <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#0f1117' }]}>
        Quick Start
      </Text>

      <View style={styles.grid}>
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.startButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
        onPress={() => router.push('/chat')}
        activeOpacity={0.8}
      >
        <Ionicons name="play" size={20} color="#ffffff" />
        <Text style={styles.startButtonText}>Start New Session</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#6366f120',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  card: {
    width: '47%',
    borderRadius: 16,
    padding: 16,
  },
  cardIcon: {
    width: 52,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
