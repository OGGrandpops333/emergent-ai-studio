import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CAPABILITIES = [
  {
    category: 'Conversational AI',
    items: [
      { icon: '💬', name: 'Natural Language Chat', detail: 'Ask anything in plain English' },
      { icon: '🧩', name: 'Context Awareness', detail: 'Remembers the conversation history' },
      { icon: '🎯', name: 'Task Completion', detail: 'Helps you accomplish real tasks' },
    ],
  },
  {
    category: 'Content Creation',
    items: [
      { icon: '✍️', name: 'Writing Assistant', detail: 'Draft emails, essays, and stories' },
      { icon: '📋', name: 'Summarization', detail: 'Condense long text into key points' },
      { icon: '🎨', name: 'Image Generation', detail: 'Create visuals from text prompts' },
    ],
  },
  {
    category: 'Knowledge & Research',
    items: [
      { icon: '🔍', name: 'Smart Search', detail: 'Semantic search across your data' },
      { icon: '🌐', name: 'Translation', detail: 'Translate between dozens of languages' },
      { icon: '📚', name: 'Knowledge Base', detail: 'AI-powered personal knowledge system' },
    ],
  },
  {
    category: 'Productivity',
    items: [
      { icon: '📊', name: 'Data Analysis', detail: 'Extract insights from structured data' },
      { icon: '🗂️', name: 'Organization', detail: 'Sort, tag, and manage your content' },
      { icon: '⚡', name: 'Automation', detail: 'Automate repetitive tasks with AI' },
    ],
  },
];

export default function FeaturesScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Capabilities</Text>
        <Text style={styles.subheading}>
          Everything Emergent AI Studio can do for you.
        </Text>

        {CAPABILITIES.map((section) => (
          <View key={section.category} style={styles.section}>
            <Text style={styles.categoryTitle}>{section.category}</Text>
            {section.items.map((item) => (
              <View key={item.name} style={styles.row}>
                <Text style={styles.rowIcon}>{item.icon}</Text>
                <View style={styles.rowInfo}>
                  <Text style={styles.rowName}>{item.name}</Text>
                  <Text style={styles.rowDetail}>{item.detail}</Text>
                </View>
              </View>
            ))}
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
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 15,
    color: '#a0a0c0',
    marginBottom: 28,
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6c63ff',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12122a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  rowIcon: {
    fontSize: 26,
    marginRight: 14,
  },
  rowInfo: {
    flex: 1,
  },
  rowName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 3,
  },
  rowDetail: {
    fontSize: 13,
    color: '#a0a0c0',
  },
});
