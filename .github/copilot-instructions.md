# Copilot Instructions for Emergent AI Studio

## Project Overview

Emergent AI Studio is a **React Native / Expo** mobile application that lets users chat with AI models, browse available models, and configure settings. It is a cross-platform app (iOS, Android, and web) built with the Expo Router file-based navigation system.

## Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (`expo` ~51)
- **Navigation**: [Expo Router](https://expo.github.io/router/) v3 (file-based, similar to Next.js)
- **Language**: TypeScript (strict mode enabled)
- **Icons**: `@expo/vector-icons` — specifically `Ionicons`
- **Styling**: React Native `StyleSheet` (no CSS, no Tailwind)
- **Testing**: Jest with `jest-expo` preset
- **Linting**: `expo lint` (ESLint under the hood)

## Project Structure

```
emergent-ai-studio/
├── app/                     # All screens (Expo Router file-based routes)
│   ├── (tabs)/              # Bottom-tab navigator group
│   │   ├── _layout.tsx      # Tab navigator configuration
│   │   ├── index.tsx        # Home / Studio screen
│   │   ├── models.tsx       # Model browser screen
│   │   └── settings.tsx     # Settings screen
│   ├── _layout.tsx          # Root layout
│   ├── chat.tsx             # Chat screen (modal/stack route)
│   └── +not-found.tsx       # 404 screen
├── assets/                  # Images, fonts, and other static assets
├── constants/
│   └── Colors.ts            # Light/dark theme color tokens
├── babel.config.js
├── package.json
└── tsconfig.json
```

## Coding Conventions

- **TypeScript**: All files use `.tsx` or `.ts`. Strict mode is on — avoid `any`.
- **Components**: Functional components only, using React hooks. Define prop types with `type` (not `interface`).
- **Styling**: Use `StyleSheet.create` at the bottom of each file. Do **not** use inline style objects for repeated styles.
- **Color scheme**: Always respect light/dark mode using `useColorScheme()`. Use values from `constants/Colors.ts` for brand colors; use inline hex literals (matching existing patterns) for one-off background/text colors.
- **Icons**: Use `Ionicons` from `@expo/vector-icons`. Prefer the `*-outline` variant for inactive states and the filled variant for active/selected states.
- **Navigation**: Use `useRouter()` from `expo-router` for programmatic navigation. Prefer `router.push()` for navigating to screens.
- **Imports**: Use the `@/` path alias (maps to the repo root) for non-relative imports.
- **No external state management library**: Local `useState` / `useRef` / `useContext` is preferred. Do not introduce Redux, Zustand, or similar without discussion.

## Running the App

```bash
npm install          # Install dependencies
npm start            # Start Expo dev server (Expo Go / web)
npm run android      # Run on Android emulator
npm run ios          # Run on iOS simulator
npm run web          # Run in browser
```

## Linting and Testing

```bash
npm run lint         # Run ESLint via expo lint
npm test             # Run Jest tests (non-watch mode)
```

## Key Patterns to Follow

1. **Screen components** are default exports at the bottom of their file.
2. **Sub-components** (e.g., `FeatureCard`, `ModelCard`, `ChatBubble`) are defined in the same file as the screen that uses them, above the screen component.
3. **Static data** (e.g., `MODELS`, `DEMO_RESPONSES`) is declared as `const` at module scope, above the components.
4. **Theming**: The primary brand color is `#6366f1` (indigo). Dark backgrounds use `#0f1117`; card backgrounds use `#1a1d27` (dark) or `#f8f9fa` (light).
5. **Avoid adding new dependencies** unless strictly necessary — prefer the packages already in `package.json`.
