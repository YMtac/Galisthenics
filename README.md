[Galisthenics-README.md](https://github.com/user-attachments/files/34324742/Galisthenics-README.md)
# Galisthenics

**A guided home workout app: pick a plan, press start, and follow along.**

Galisthenics is a mobile-first training app. Choose a workout plan, preview the session, then let the built-in trainer take over: an exercise video plays for each move, a timer counts down work and rest intervals, a voice counts you in, and a beep tells you when to switch. No equipment and no thinking needed during the workout.

I built it for a friend who teaches fitness classes.
<img width="336" height="725" alt="image" src="https://github.com/user-attachments/assets/7f5722fd-fe7d-4bff-95c3-fa4c79741777" />
<img width="335" height="726" alt="image" src="https://github.com/user-attachments/assets/001d529f-4b26-493a-bc23-d97d88ed5a18" />
<img width="335" height="726" alt="image" src="https://github.com/user-attachments/assets/b435fa39-689d-47ed-a4c2-439a261b0278" />
<img width="334" height="729" alt="image" src="https://github.com/user-attachments/assets/3367d901-e7bb-4415-84df-6f15de84c91e" />
<img width="335" height="730" alt="image" src="https://github.com/user-attachments/assets/4b6e0b29-9f14-4339-997f-7b157f728610" />


---

## Features

### Training mode
- **Exercise videos** for every move, which pause automatically during rest
- **Interval timer** for work and rest phases (e.g. 30 s on, 30 s off)
- **Voice countdown** using the browser's built-in speech synthesis
- **Beep signals** generated with the Web Audio API, no audio files
- **"Up next" splash** before each exercise and at the start of every new round
- Form cues for each exercise (*"Press your lower back flat to the floor"*)
- Progress dots for every exercise in every round
- Pause and resume at any time
- Completion screen at the end of a session

### Plans
- **Plan** tab: today's session for your active plan, with total sets and duration
- **Explore** tab: browse plans and filter by Beginner, Intermediate, Strength, Cardio or Hypertrophy
- Included plans: Abs + Cardio (Beginner), PPL Hypertrophy, 5/3/1, StrongLifts 5×5, HIIT Fat Burner, Greyskull LP and more

### Profile
- Workout history and calendar (layout ready)
- Sign-in screen (layout ready)

### Layout
- Bottom navigation on phones, sidebar on desktop

---

## Tech stack

| Layer | Technology |
|---|---|
| Monorepo | pnpm workspaces, TypeScript 5.9, Node.js 24 |
| Frontend | React, Vite, Tailwind CSS, framer-motion, shadcn/ui (Radix) |
| Browser APIs | Web Speech API (voice), Web Audio API (beeps), HTML5 video |
| Backend | Express 5 (health check only for now) |
| API contract | OpenAPI + Orval, Zod |
| Database | PostgreSQL + Drizzle ORM (set up, not used yet) |
| Hosting | Replit |

## Project structure

```
Galisthenics/
├── artifacts/
│   ├── forge-app/              # React frontend
│   │   ├── public/videos/      # exercise videos
│   │   └── src/
│   │       ├── pages/          # Plan, Explore, Profile
│   │       ├── overlays/       # Preview, Training, Complete
│   │       ├── components/     # BottomNav, SideNav
│   │       └── data/           # plans, exercises, history
│   └── api-server/             # Express API
└── lib/                        # API spec, generated clients, DB schema
```

Plans and exercises live in `src/data/` as typed arrays. Adding an exercise means adding one object with its video, timing and form cues.

## Getting started

To run it yourself (Node.js 24 and pnpm):

```bash
pnpm install
pnpm --filter @workspace/forge-app run dev
```

> `pnpm-workspace.yaml` removes native binaries for every platform except linux-x64 (Replit). On macOS or Windows, remove those `overrides` entries first.

## Roadmap

- [x] Abs + Cardio beginner plan with videos, timer and voice
- [ ] Exercise data for the other plans
- [ ] Save completed sessions to the database and show them in history
- [ ] Real accounts and sign-in
- [ ] Custom plans

## License

MIT

---

Made by Luo · University of Bayreuth
