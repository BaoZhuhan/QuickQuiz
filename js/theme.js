import { STATE, els } from './state.js';

export function initTheme() {
    applyTheme(STATE.theme);
    if (els.themeSelect) {
        els.themeSelect.value = STATE.theme;
        els.themeSelect.addEventListener('change', (e) => {
            const newTheme = e.target.value;
            STATE.theme = newTheme;
            localStorage.setItem('quiz-theme', newTheme);
            applyTheme(newTheme);
        });
    }
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}
