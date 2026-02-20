# Features

## Find Old Projects

Browse, search, and manage all of your archived and completed AI projects.

### Search

Type in the search bar to filter projects in real time. The search matches:

- Project **name**
- Project **description**
- Any of the project's **tags**

The match is case-insensitive, so "NLP" and "nlp" both find the same results.

### Status Filter

Tap a filter chip to narrow the list:

| Chip      | Shows                        |
|-----------|------------------------------|
| All       | Every archived or completed project |
| Archived  | Only archived projects       |
| Completed | Only completed projects      |

### Project Cards

Each card shows:

- **Name** — truncated to one line to keep the list compact.
- **Status badge** — amber for Archived, green for Completed.
- **Description** — up to two lines.
- **Tags** — shown as blue chips below the description.
- **Last updated date** — shown in the local device locale.

Tap a card to see the full project details in an alert dialog.

### Pull-to-Refresh

Swipe down on the list to reload projects from local storage.

### Sample Data

On first launch the app seeds six example AI projects so the screen always has content to explore. The sample projects cover a range of domains: NLP, computer vision, recommender systems, anomaly detection, chatbots, and demand forecasting.

### Persistent Storage

Projects are stored with `@react-native-async-storage/async-storage` and survive app restarts on both iOS and Android. On web the same API falls back to `localStorage`.
