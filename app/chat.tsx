import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef } from 'react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      "Hello! I'm your Emergent AI assistant. I can help you explore AI concepts, run experiments, analyze models, and much more. What would you like to explore today?",
    timestamp: new Date(),
  },
];

const DEMO_RESPONSES: Record<string, string> = {
  default:
    "That's an interesting question! In this demo version of Emergent AI Studio, I'm showcasing the chat interface. Connect your API key in Settings to enable full AI responses.",
  hello:
    "Hello! I'm glad you're exploring Emergent AI Studio. This platform helps you discover emergent behaviors in large language models. Try asking about neural networks, AI safety, or emergent capabilities!",
  help: "I can help you with:\n\n• **Chat with AI models** - Converse naturally\n• **Run experiments** - Test hypotheses about model behavior\n• **Analyze outputs** - Understand emergent properties\n• **Fine-tune models** - Adapt models to your use case\n\nWhat would you like to start with?",
  ai: "Artificial Intelligence is a rapidly evolving field. Emergent behaviors in large language models—capabilities that weren't explicitly trained—are one of the most fascinating areas of modern AI research.",
};

function getDemoResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('hello') || lower.includes('hi')) return DEMO_RESPONSES.hello;
  if (lower.includes('help')) return DEMO_RESPONSES.help;
  if (lower.includes('ai') || lower.includes('artificial intelligence')) return DEMO_RESPONSES.ai;
  return DEMO_RESPONSES.default;
}

type ChatBubbleProps = {
  message: Message;
  isDark: boolean;
};

function ChatBubble({ message, isDark }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.bubbleWrapper, isUser ? styles.userWrapper : styles.assistantWrapper]}>
      {!isUser && (
        <View style={styles.avatar}>
          <Ionicons name="sparkles" size={16} color="#6366f1" />
        </View>
      )}
      <View
        style={[
          styles.bubble,
          isUser
            ? styles.userBubble
            : [styles.assistantBubble, { backgroundColor: isDark ? '#1a1d27' : '#f3f4f6' }],
        ]}
      >
        <Text
          style={[
            styles.bubbleText,
            isUser
              ? styles.userText
              : [styles.assistantText, { color: isDark ? '#e5e7eb' : '#1f2937' }],
          ]}
        >
          {message.content}
        </Text>
        <Text style={[styles.timestamp, { color: isUser ? 'rgba(255,255,255,0.6)' : isDark ? '#6b7280' : '#9ca3af' }]}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    const text = inputText.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getDemoResponse(text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: isDark ? '#0f1117' : '#ffffff' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatBubble message={item} isDark={isDark} />}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        ListFooterComponent={
          isTyping ? (
            <View style={[styles.bubbleWrapper, styles.assistantWrapper]}>
              <View style={styles.avatar}>
                <Ionicons name="sparkles" size={16} color="#6366f1" />
              </View>
              <View style={[styles.bubble, styles.assistantBubble, { backgroundColor: isDark ? '#1a1d27' : '#f3f4f6' }]}>
                <Text style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Thinking…</Text>
              </View>
            </View>
          ) : null
        }
      />

      <View
        style={[
          styles.inputContainer,
          { backgroundColor: isDark ? '#0f1117' : '#ffffff', borderTopColor: isDark ? '#1f2937' : '#e5e7eb' },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? '#1a1d27' : '#f3f4f6',
              color: isDark ? '#ffffff' : '#0f1117',
            },
          ]}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Message the AI..."
          placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
          multiline
          maxLength={2000}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: inputText.trim() ? '#6366f1' : (isDark ? '#374151' : '#e5e7eb') }]}
          onPress={sendMessage}
          disabled={!inputText.trim()}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-up" size={20} color={inputText.trim() ? '#ffffff' : (isDark ? '#6b7280' : '#9ca3af')} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageList: {
    padding: 16,
    paddingBottom: 8,
  },
  bubbleWrapper: {
    flexDirection: 'row',
    marginBottom: 12,
    maxWidth: '85%',
  },
  userWrapper: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  assistantWrapper: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366f120',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 2,
    flexShrink: 0,
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: '100%',
  },
  userBubble: {
    backgroundColor: '#6366f1',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userText: {
    color: '#ffffff',
  },
  assistantText: {},
  timestamp: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
  },
  input: {
    flex: 1,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 120,
    lineHeight: 20,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
