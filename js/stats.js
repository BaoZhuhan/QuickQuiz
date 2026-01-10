import { STATE, els } from './state.js';

export function showStats() {
    els.questionCard.style.display = 'none';
    els.statsCard.style.display = 'block';

    const total = STATE.questions.length;
    const correctCount = STATE.results.filter(r => r.correct).length;
    const acc = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    els.accuracy.textContent = `${acc}%`;
    els.scoreCount.textContent = `${correctCount} / ${total} (得分: ${STATE.score})`;

    renderWrongList();
}

function renderWrongList() {
    els.wrongList.innerHTML = '';
    const wrongs = STATE.results.filter(r => !r.correct);
    
    if (wrongs.length === 0) {
        els.wrongList.innerHTML = '<p style="text-align:center; color:var(--success);">完美！没有错题。</p>';
        return;
    }

    wrongs.forEach(res => {
        const q = STATE.questions.find(q => q.id === res.questionId);
        const item = document.createElement('div');
        item.className = 'wrong-item';
        item.innerHTML = `
            <div class="wrong-text">${q.text}</div>
            <div class="wrong-answer">正确答案: ${q.answer.join(', ')} | 你的回答: ${res.userAnswer.join(', ') || '无'}</div>
        `;
        els.wrongList.appendChild(item);
    });
}
