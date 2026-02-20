# App Structure

```
emergent-ai-studio/
├── App.tsx                          # Root component — mounts OldProjectsScreen
├── index.ts                         # Expo entry point
├── app.json                         # Expo configuration
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
│
├── assets/                          # Static assets (icons, splash screen)
│
├── src/
│   ├── types/
│   │   └── Project.ts               # Project and ProjectStatus types
│   │
│   ├── services/
│   │   └── ProjectStorageService.ts # AsyncStorage CRUD + search
│   │
│   ├── data/
│   │   └── sampleProjects.ts        # Six sample AI projects for first launch
│   │
│   ├── components/
│   │   └── ProjectItem.tsx          # Card component: name, badge, description, tags
│   │
│   └── screens/
│       └── OldProjectsScreen.tsx    # Main screen: search bar, filter chips, FlatList
│
└── __tests__/
    ├── ProjectStorageService.test.ts # Unit tests for storage service (13 tests)
    └── ProjectItem.test.tsx          # Component tests for ProjectItem (6 tests)
```

## Data Flow

```
AsyncStorage (device)
      │
      ▼
ProjectStorageService   ← getAll / create / update / remove / search / replaceAll
      │
      ▼
OldProjectsScreen       ← loads data, applies search + filter state
      │
      ▼
FlatList → ProjectItem  ← renders each card
```

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| AsyncStorage for persistence | Cross-platform (iOS, Android, Web); no backend required |
| Search + filter in-memory | Data set is small; avoids extra async calls on every keystroke |
| Sample data seeded once | Ensures a non-empty screen on first launch without a network request |
| Unique IDs via `timestamp-random` | Simple, collision-resistant, no external library needed |
| TypeScript strict mode | Catches type errors at compile time; all files fully typed |
