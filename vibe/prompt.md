You are the engineer of record. Build and maintain a minimal, reliable quiz SPA. Less is more: include only what improves reliability, usability, and data integrity.

## Scope
- Pure front-end (HTML/CSS/JS). Entry: `index.html`; styles in `css/`; scripts in `js/`; data in `data/`.
- Run via a static server (e.g., `python3 -m http.server 8000`). No build tools or dependencies.

## Must-have features
- Load multiple question-set files listed in `data/index.json` (array or `{ files: [] }`). Fallback to `questions.json` if manifest missing.
- Supported question types: `tf`, `single`, `multiple`. Shape: `{ id, type, text, options:[{ key, text }], answer:[keys], score }`.
- Normalize incoming data to `STATE.sets = [{ id, name, questions }]` from any of: array-of-questions, `{ sets: [...] }`, or `{ id/name, questions }`.
- Set selection + “全部题目集（混做）”；random-next toggle；auto-advance on correct (short delay) and manual next on wrong；score tracking；reset；end-session stats with accuracy/counts and错题列表。
- Guardrails: if no sets/questions, show“当前题目集为空”；invalid or missing files fail gracefully with console warning and UI message.

## Essential UX
- Clean, Apple-like visuals: glass cards, soft shadows, rounded corners, readable contrast. Sections: header, status bar, question card, actions, feedback, stats card, footer。
- Responsive header: collapsible menu on mobile; overlay prevents bleed-through; body scroll locks when menu open; close on overlay click or resize above mobile。
- Accessibility: clear labels, `aria-label` on controls, visible focus states; keyboard can submit and move next.

## Theming
- Theme tokens in `css/theme.css` including `--bg`, `--bg-accent`, `--card`, `--text`, `--muted`, `--primary`, `--primary-contrast`, `--danger`, `--border`, `--shadow-soft`, `--blur`, `--surface-strong`, and feedback colors。
- Provide themes: light, dark, pastel-mint, pastel-peach, pastel-lavender. Persist selection (localStorage). Use `--surface-strong` for menu background to avoid content bleed.

## State & logic (JS)
- `state.js`: `STATE` (sets, questions, order, index, score, answered/attempted/results, theme, selectedSetId, randomNext) and `els` cache。
- `theme.js`: load/persist theme, apply `data-theme`, populate theme select。
- `quiz.js`: fetch manifest, load all files, normalize sets; build set select with mixed option; apply selection (reset score/order/index, render current); render options (radio/checkbox) and enable submit on selection; answer checking compares sorted arrays; scoring only once per correct question; auto-advance on correct with 700ms delay; random-next support.
- `stats.js`: compute accuracy/counts; render wrong-list with question text and correct answer; show/hide stats; back returns to quiz。
- `app.js`: wire events (submit, next, random toggle, reset, end, back, theme change, menu toggle/overlay, resize-close); boot = init theme → load questions → bind events。

## Data safety
- Validate on load: missing options/answers or answers not in options should log warnings; skip malformed questions rather than breaking the app.
- Show which file failed if fetch/parse errors occur; continue with remaining files.

## Delivery checklist
- Files live under the prescribed folders; ASCII only; minimal comments for non-obvious logic.
- Works in modern browsers without extra installs. Keep bundle-free and fast.
