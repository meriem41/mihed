# 🎂 Happy Birthday Mihed — Interactive Birthday Card

A magical, animated birthday card website built with React + Vite + Tailwind CSS + Framer Motion.

## Features
- ✨ Cinematic animated intro with particle stars
- 💌 Animated birthday letter with typewriter effect  
- 🎈 Floating balloons & confetti celebration
- 🖼️ Interactive memory gallery slider
- 🎵 Ambient music player (Web Audio API)
- 🎆 Fireworks surprise section
- 📱 Fully responsive mobile-friendly design

## Running Locally
```bash
npm install
npm run dev
```

## Deploy to GitHub Pages
1. Push to GitHub
2. Go to Settings → Pages → Source: GitHub Actions
3. The workflow in `.github/workflows/deploy.yml` handles the rest!

## Customization
- Edit `src/components/BirthdayLetter.jsx` → `LETTER_PARAGRAPHS` for the letter text
- Edit `src/components/PhotoGallery.jsx` → `MEMORIES` array for gallery cards
- Update the name "Mihed" across components as needed
