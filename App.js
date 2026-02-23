import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Speech from 'expo-speech';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

// ─────────────────────────────────────────────
// ⚠️  Set your OpenAI API key in .env or here
//     NEVER commit a real key to source control
// ─────────────────────────────────────────────
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY || '';

const SYSTEM_PROMPT =
  'You are Nova, a helpful and friendly AI voice assistant. ' +
  'Keep responses concise and conversational — under 3 sentences unless the user asks for more detail.';

export default function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('Press & hold to talk');
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const recordingRef = useRef(null);

  // ── Start recording ───────────────────────────────────────────
  const startRecording = async () => {
    if (!OPENAI_API_KEY) {
      Alert.alert(
        'API Key Missing',
        'Please set your OpenAI API key in the EXPO_PUBLIC_OPENAI_API_KEY environment variable.',
      );
      return;
    }

    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      recordingRef.current = recording;
      setIsRecording(true);
      setStatusText('Listening…');
    } catch (err) {
      console.error('Failed to start recording:', err);
      setStatusText('Could not access microphone — check permissions');
    }
  };

  // ── Stop recording and run the AI pipeline ───────────────────
  const stopRecording = async () => {
    if (!recordingRef.current) return;

    setIsRecording(false);
    setIsProcessing(true);
    setStatusText('Thinking…');

    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      recordingRef.current = null;

      // 1. Transcribe with Whisper
      const userText = await transcribeAudio(uri);
      setTranscript(userText);
      setStatusText('Responding…');

      // 2. Get GPT response
      const aiText = await getChatResponse(userText);
      setResponse(aiText);

      // 3. Speak the response
      await speakResponse(aiText);
      setStatusText('Press & hold to talk');
    } catch (err) {
      console.error('Pipeline error:', err);
      setStatusText(`Error: ${err?.message || 'request failed'} — try again`);
    } finally {
      setIsProcessing(false);
    }
  };

  // ── Whisper STT ───────────────────────────────────────────────
  const transcribeAudio = async (uri) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'audio/m4a',
      name: 'recording.m4a',
    });
    formData.append('model', 'whisper-1');

    const res = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      formData,
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res.data.text || '';
  };

  // ── GPT Chat ──────────────────────────────────────────────────
  const getChatResponse = async (userMessage) => {
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return res.data.choices?.[0]?.message?.content?.trim() || "Sorry, I received an empty response from the AI. Please try again.";
  };

  // ── Text-to-speech ────────────────────────────────────────────
  const speakResponse = (text) =>
    new Promise((resolve) => {
      Speech.speak(text, {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.95,
        onDone: resolve,
        onError: resolve,
      });
    });

  // ── UI ────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>⚡ NovaVoice AI</Text>
        <Text style={styles.subtitle}>Your AI voice assistant</Text>
      </View>

      {/* Conversation display */}
      <ScrollView style={styles.conversationBox} contentContainerStyle={styles.conversationContent}>
        {transcript ? (
          <View style={styles.bubble}>
            <Text style={styles.bubbleLabel}>You</Text>
            <Text style={styles.bubbleText}>{transcript}</Text>
          </View>
        ) : null}
        {response ? (
          <View style={[styles.bubble, styles.aiBubble]}>
            <Text style={[styles.bubbleLabel, styles.aiLabel]}>Nova</Text>
            <Text style={styles.bubbleText}>{response}</Text>
          </View>
        ) : null}
        {!transcript && !response ? (
          <Text style={styles.placeholder}>Your conversation will appear here…</Text>
        ) : null}
      </ScrollView>

      {/* Status + button */}
      <View style={styles.controlArea}>
        <Text style={styles.statusText}>{statusText}</Text>

        <TouchableOpacity
          style={[
            styles.talkButton,
            isRecording && styles.talkButtonActive,
            isProcessing && styles.talkButtonProcessing,
          ]}
          onPressIn={startRecording}
          onPressOut={stopRecording}
          disabled={isProcessing}
          activeOpacity={0.8}
        >
          {isProcessing ? (
            <ActivityIndicator color="#fff" size="large" />
          ) : (
            <Text style={styles.talkButtonIcon}>{isRecording ? '🔴' : '🎙️'}</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.hint}>
          {isRecording ? 'Release to send' : 'Hold to speak'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#a78bfa',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  conversationBox: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  conversationContent: {
    paddingVertical: 8,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  placeholder: {
    color: '#374151',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  },
  bubble: {
    backgroundColor: '#1e1b4b',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },
  aiBubble: {
    backgroundColor: '#312e81',
    alignSelf: 'flex-end',
  },
  bubbleLabel: {
    fontSize: 11,
    color: '#a5b4fc',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  aiLabel: {
    color: '#c4b5fd',
  },
  bubbleText: {
    color: '#e5e7eb',
    fontSize: 15,
    lineHeight: 22,
  },
  controlArea: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 10,
  },
  statusText: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 20,
  },
  talkButton: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#4c1d95',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  talkButtonActive: {
    backgroundColor: '#dc2626',
    shadowColor: '#ef4444',
  },
  talkButtonProcessing: {
    backgroundColor: '#1e40af',
    shadowColor: '#3b82f6',
  },
  talkButtonIcon: {
    fontSize: 40,
  },
  hint: {
    color: '#4b5563',
    fontSize: 12,
    marginTop: 12,
  },
});
