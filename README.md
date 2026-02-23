# ⚡ NovaVoice AI

A voice-first AI assistant built with React Native and Expo.  
Press and hold the mic button → speak → Nova listens, thinks, and talks back.

---

## 🚀 Quick Start

### 1. Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/): `npm install -g expo-cli`
- [Expo Go](https://expo.dev/go) app on your iPhone / Android phone
- An [OpenAI API key](https://platform.openai.com/api-keys)

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your API key

```bash
cp .env.example .env
```

Open `.env` and replace `your_openai_api_key_here` with your actual OpenAI key:

```
EXPO_PUBLIC_OPENAI_API_KEY=sk-...
```

> ⚠️ Never commit your `.env` file. It is already in `.gitignore`.

### 4. Run the app

```bash
npm start
```

Open **Expo Go** on your phone and scan the QR code shown in the terminal.

---

## 🎙️ How It Works

```
[Hold button] → Record audio
      ↓
[OpenAI Whisper] → Transcribe speech to text
      ↓
[OpenAI GPT-4o-mini] → Generate AI response
      ↓
[expo-speech TTS] → Speak the response aloud
```

**Victory condition:** Press the button, say something, and hear Nova respond.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native + Expo SDK 50 |
| Speech-to-Text | OpenAI Whisper (`whisper-1`) |
| AI Response | OpenAI Chat (`gpt-4o-mini`) |
| Text-to-Speech | `expo-speech` |
| Audio recording | `expo-av` |
| HTTP client | `axios` |

---

## 📁 Project Structure

```
novavoice-ai/
├── App.js          # Main app — voice button + AI pipeline
├── app.json        # Expo configuration
├── package.json    # Dependencies
├── babel.config.js # Babel config for Expo
├── .env.example    # API key template (copy to .env)
└── .gitignore
```

---

## ⚠️ Founder Discipline Rule

If something breaks:
1. Stop
2. Note the exact error message
3. Debug step-by-step — don't randomly change code

---

## 📈 30-Day Goal

Stay consistent for 30 days → ship a real product.

**Measure progress by:** Does NovaVoice respond when you talk? ✅
