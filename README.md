<div align="center">
  <img src="public/next.svg" alt="Next.js" width="120" />
  <br/>
  <h1>🧠 BisaMENSA</h1>
  <p><strong>The Future of Cognitive Training — An Interactive, Mensa-Level Logical Reasoning Platform</strong></p>

  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

  <p><i>Imagine Treehouse meets Duolingo, engineered for high-stakes intelligence testing and continuous cognitive improvement.</i></p>
</div>

---

<br/>
<p align="center">
  <img src="assets/screenshots/preview.png" alt="BisaMENSA Landing Page Preview" width="850" style="border-radius: 12px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);" />
</p>
<br/>

## 🚀 The Vision

In a world increasingly driven by automation and AI, **fluid intelligence** and **logical reasoning** are the ultimate differentiators. **BisaMENSA** is a production-ready, highly scalable web application designed to democratize high-level cognitive training.

We aren't just building a quiz app; we are building an intelligent coaching platform. Whether users are preparing for rigorous employment assessments (like civil service or top-tier tech interviews), or simply pushing their cognitive limits to qualify for Mensa, BisaMENSA provides the structured path to get them there.

## 💥 The Problem

The current landscape of IQ and cognitive testing is broken:
1. **Gatekept & Expensive:** Professional, valid psychological assessments are costly and inaccessible for regular training.
2. **Zero Feedback Loop:** Traditional tests only provide a final score. Users never learn *why* they failed a spatial reasoning matrix or a deductive logic puzzle.
3. **Low-Quality Alternatives:** Free mobile apps are riddled with ads, offer inflated "fake" IQ scores to drive virality, and lack academic validity.

## 💡 The Solution

BisaMENSA disrupts this by offering **Structured Learning with Step-by-Step Reasoning**.

Instead of a black-box assessment, every question in BisaMENSA acts as a micro-lesson. We combine academically grounded question logic (inspired by CFIT, Raven's Progressive Matrices, and IST) with a modern, gamified user experience.

## ✨ Key Features

* 📚 **Structured Learning Roadmaps:** Progress from *Fundamental IQ Training* to *Advanced Mensa Preparation* in curated modules.
* 🎮 **Deep Gamification Engine:** Built-in XP systems, level progressions, 🔥 Daily Streaks, and 🏆 Global Leaderboards to drive massive user retention.
* 💡 **Algorithmic Step-by-Step Feedback:** The core value prop. Users understand their logical fallacies and learn the correct heuristic approach instantly.
* 📊 **Granular Cognitive Analytics:** Real-time dashboards tracking user proficiency across specific dimensions (Deductive Logic, Number Patterns, Spatial Reasoning).
* ⏱️ **High-Stakes Simulation Mode:** A pressure-tested 30-minute exam mode that mimics real-world assessment environments, providing instant, estimated IQ baselines.
* 🤖 **AI Question Generator API:** Future-proof endpoint architecture ready to integrate with LLMs for infinite, dynamic question generation.

---

## 🛠️ Tech Stack & Architecture

BisaMENSA is built on a modern, high-performance stack optimized for scale, developer experience, and rapid iteration.

* **Frontend:** Next.js (App Router), React 19, Tailwind CSS v4.
* **Backend & Auth:** Supabase (PostgreSQL), Supabase Auth.
* **Language:** Strictly typed TypeScript.
* **Database Design:** Highly relational schema (`users`, `roadmaps`, `modules`, `lessons`, `questions`, `user_progress`, `user_answers`).

---

## 💻 Quick Start Guide

Get BisaMENSA running locally in minutes.

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/bisamensa.git
cd bisamensa
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
```

### 4. Database Initialization
1. Navigate to your Supabase SQL Editor.
2. Execute the queries found in `schema.sql` to generate the relational tables.
3. Run the database seed script to populate roadmaps, lessons, and sample questions:
```bash
npm run seed
```

### 5. Launch Development Server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000). Register a new account, dive into the modules, and experience the future of cognitive training.

---

## 🤝 Contributing & Community

We believe open-source accelerates innovation. Whether you want to contribute complex 3x3 matrix questions, optimize the UI, or integrate new AI generation models, PRs are highly encouraged!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
  <p>Built with ❤️ for cognitive enhancement everywhere.</p>
</div>
