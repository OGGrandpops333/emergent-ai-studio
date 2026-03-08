import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

type Model = {
  id: string;
  name: string;
  provider: string;
  description: string;
  tags: string[];
  icon: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
};

const MODELS: Model[] = [
  {
    id: '1',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description: 'Most capable multimodal model with vision and reasoning',
    tags: ['Chat', 'Vision', 'Code'],
    icon: 'sparkles-outline',
    color: '#10a37f',
  },
  {
    id: '2',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    description: 'Fast, capable model for complex reasoning and writing',
    tags: ['Chat', 'Analysis', 'Code'],
    icon: 'planet-outline',
    color: '#d97706',
  },
  {
    id: '3',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    description: 'Long-context model with 1M token window',
    tags: ['Chat', 'Vision', 'Long Context'],
    icon: 'diamond-outline',
    color: '#4285f4',
  },
  {
    id: '4',
    name: 'Llama 3.1 70B',
    provider: 'Meta',
    description: 'Open-source instruction-tuned model',
    tags: ['Open Source', 'Chat', 'Code'],
    icon: 'layers-outline',
    color: '#0467df',
  },
  {
    id: '5',
    name: 'Mistral Large',
    provider: 'Mistral AI',
    description: 'European frontier model for multilingual tasks',
    tags: ['Chat', 'Multilingual', 'Code'],
    icon: 'flash-outline',
    color: '#ff7000',
  },
];

type ModelCardProps = {
  model: Model;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

function ModelCard({ model, isSelected, onSelect }: ModelCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <TouchableOpacity
      style={[
        styles.modelCard,
        { backgroundColor: isDark ? '#1a1d27' : '#f8f9fa' },
        isSelected && { borderColor: model.color, borderWidth: 2 },
      ]}
      onPress={() => onSelect(model.id)}
      activeOpacity={0.8}
    >
      <View style={styles.modelCardHeader}>
        <View style={[styles.modelIcon, { backgroundColor: model.color + '20' }]}>
          <Ionicons name={model.icon} size={24} color={model.color} />
        </View>
        <View style={styles.modelInfo}>
          <Text style={[styles.modelName, { color: isDark ? '#ffffff' : '#0f1117' }]}>
            {model.name}
          </Text>
          <Text style={[styles.modelProvider, { color: model.color }]}>{model.provider}</Text>
        </View>
        {isSelected && (
          <View style={[styles.selectedBadge, { backgroundColor: model.color }]}>
            <Ionicons name="checkmark" size={14} color="#ffffff" />
          </View>
        )}
      </View>
      <Text style={[styles.modelDescription, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
        {model.description}
      </Text>
      <View style={styles.tags}>
        {model.tags.map((tag) => (
          <View key={tag} style={[styles.tag, { backgroundColor: model.color + '15' }]}>
            <Text style={[styles.tagText, { color: model.color }]}>{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

export default function ModelsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedModel, setSelectedModel] = useState<string>('1');

  return (
    <FlatList
      style={[styles.container, { backgroundColor: isDark ? '#0f1117' : '#ffffff' }]}
      contentContainerStyle={styles.content}
      data={MODELS}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: isDark ? '#ffffff' : '#0f1117' }]}>
            Available Models
          </Text>
          <Text style={[styles.headerSubtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
            Select a model to use in your AI sessions
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <ModelCard
          model={item}
          isSelected={selectedModel === item.id}
          onSelect={setSelectedModel}
        />
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
  modelCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  modelCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modelIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  modelInfo: {
    flex: 1,
  },
  modelName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  modelProvider: {
    fontSize: 13,
    fontWeight: '500',
  },
  selectedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  separator: {
    height: 12,
  },
  footer: {
    height: 24,
  },
});
