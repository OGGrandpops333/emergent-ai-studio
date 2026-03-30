# Emergent AI Studio

An AI studio application built with React Native and Expo that lets you explore, experiment with, and interact with large language models.

## Features

- **AI Chat** – Conversational interface to interact with AI models using natural language
- **Model Selection** – Browse and select from a variety of AI models (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3.1 70B, Mistral Large)
- **Settings** – Configure API keys, default model, temperature, streaming, theme, and privacy options
- **Dark/Light Mode** – Automatic theme that follows the system preference

## Tech Stack

- [Expo](https://expo.dev) (SDK 51) with [Expo Router](https://expo.github.io/router) for file-based navigation
- [React Native](https://reactnative.dev) 0.74
- [TypeScript](https://www.typescriptlang.org) with strict mode
- [@expo/vector-icons](https://icons.expo.fyi) (Ionicons)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18 or later
- [npm](https://www.npmjs.com) or [Yarn](https://yarnpkg.com)
- [Expo Go](https://expo.dev/go) app on your iOS or Android device (for development)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

After starting, scan the QR code with **Expo Go** (Android) or the Camera app (iOS) to open the app on your device.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the Expo development server |
| `npm run android` | Open on an Android device/emulator |
| `npm run ios` | Open on an iOS simulator |
| `npm run web` | Open in the browser |
| `npm test` | Run tests with Jest |
| `npm run lint` | Lint the codebase with Expo's ESLint config |

## Project Structure

```
emergent-ai-studio/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx     # Bottom tab navigator
│   │   ├── index.tsx       # Home / Studio screen
│   │   ├── models.tsx      # Model selection screen
│   │   └── settings.tsx    # Settings screen
│   ├── _layout.tsx         # Root layout with theme provider
│   ├── chat.tsx            # AI chat screen
│   └── +not-found.tsx      # 404 screen
├── assets/                 # Images and fonts
├── constants/
│   └── Colors.ts           # Theme color definitions
├── app.json                # Expo configuration
├── babel.config.js
├── package.json
└── tsconfig.json
```

## Configuration

To connect a real AI backend, add your API keys in the **Settings** screen under **AI Configuration → API Keys**.

The app currently runs in demo mode with simulated responses when no API key is configured.
