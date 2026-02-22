import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FEATURES = [
  {
    icon: '💬',
    title: 'AI Chat',
    description: 'Have natural conversations with a powerful AI assistant.',
  },
  {
    icon: '🎨',
    title: 'Image Generation',
    description: 'Create stunning images from text descriptions using AI.',
  },
  {
    icon: '📝',
    title: 'Text Summarization',
    description: 'Quickly summarize long documents, articles, and notes.',
  },
  {
    icon: '🔍',
    title: 'Smart Search',
    description: 'Search your content intelligently with semantic understanding.',
  },
  {
    icon: '🌐',
    title: 'Translation',
    description: 'Translate text between dozens of languages instantly.',
  },
  {
    icon: '🧠',
    title: 'Knowledge Base',
    description: 'Build and query a personal AI-powered knowledge base.',
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroIcon}>✨</Text>
          <Text style={styles.heroTitle}>Emergent AI Studio</Text>
          <Text style={styles.heroSubtitle}>
            Your all-in-one platform for AI-powered creativity and productivity.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('Chat')}
          accessibilityRole="button"
          accessibilityLabel="Start chatting with AI"
        >
          <Text style={styles.ctaText}>Start Chatting →</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>What can I do?</Text>

        {FEATURES.map((feature) => (
          <View key={feature.title} style={styles.featureCard}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  hero: {
    alignItems: 'center',
    marginVertical: 32,
  },
  heroIcon: {
    fontSize: 56,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#a0a0c0',
    textAlign: 'center',
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: '#6c63ff',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 36,
  },
  ctaText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#12122a',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  featureIcon: {
    fontSize: 32,
    marginRight: 14,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#a0a0c0',
    lineHeight: 20,
  },
});
