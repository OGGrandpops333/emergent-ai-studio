import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DEMO_RESPONSES = {
  default: "I'm Emergent AI, your intelligent assistant! I can help you with writing, answering questions, brainstorming ideas, summarizing content, and much more. What would you like to explore today?",
  hello: "Hello! 👋 Great to meet you! I'm here to help. You can ask me anything — from creative writing to technical questions.",
  help: "Here's what I can do:\n\n• 💬 Answer questions on any topic\n• 📝 Write and edit content\n• 🌐 Translate languages\n• 📊 Analyze and summarize text\n• 🧠 Brainstorm ideas\n• 💡 Explain complex concepts\n\nJust type your request!",
  features: "The Emergent AI Studio includes:\n\n✨ AI Chat — conversational assistant\n🎨 Image Generation — text-to-image\n📝 Summarization — condense documents\n🔍 Smart Search — semantic queries\n🌐 Translation — multi-language\n🧠 Knowledge Base — personal AI memory",
};

function getResponse(text) {
  const lower = text.toLowerCase().trim();
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return DEMO_RESPONSES.hello;
  }
  if (lower.includes('help') || lower.includes('what can you do') || lower.includes('what can u do')) {
    return DEMO_RESPONSES.help;
  }
  if (lower.includes('feature') || lower.includes('capabilit')) {
    return DEMO_RESPONSES.features;
  }
  return DEMO_RESPONSES.default;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    {
      id: '0',
      role: 'assistant',
      text: "Hi! I'm Emergent AI. Ask me anything — type \"help\" to see what I can do.",
    },
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { id: Date.now().toString(), role: 'user', text: trimmed };
    const aiMsg = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: getResponse(trimmed),
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  }

  function renderMessage({ item }) {
    const isUser = item.role === 'user';
    return (
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
        {!isUser && <Text style={styles.aiLabel}>AI</Text>}
        <Text style={[styles.bubbleText, isUser ? styles.userText : styles.aiText]}>
          {item.text}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Message Emergent AI..."
            placeholderTextColor="#666680"
            onSubmitEditing={sendMessage}
            returnKeyType="send"
            multiline
            accessibilityLabel="Chat input"
          />
          <TouchableOpacity
            style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!input.trim()}
            accessibilityRole="button"
            accessibilityLabel="Send message"
          >
            <Text style={styles.sendIcon}>↑</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  messageList: {
    padding: 16,
    paddingBottom: 8,
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  userBubble: {
    backgroundColor: '#6c63ff',
    alignSelf: 'flex-end',
  },
  aiBubble: {
    backgroundColor: '#12122a',
    alignSelf: 'flex-start',
  },
  aiLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6c63ff',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userText: {
    color: '#ffffff',
  },
  aiText: {
    color: '#e0e0f0',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#1e1e38',
    backgroundColor: '#0a0a1a',
  },
  input: {
    flex: 1,
    backgroundColor: '#12122a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#ffffff',
    maxHeight: 120,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6c63ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#333355',
  },
  sendIcon: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
