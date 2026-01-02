const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const questionText = document.getElementById('question-text');
let isVeryQuestion = false;

// ФУНКЦИЯ УБЕГАНИЯ
function moveButton() {
    const x = Math.random() * (window.innerWidth - btnNo.offsetWidth - 40) + 20;
    const y = Math.random() * (window.innerHeight - btnNo.offsetHeight - 40) + 20;
    
    btnNo.style.position = 'fixed';
    btnNo.style.left = x + 'px';
    btnNo.style.top = y + 'px';
}

btnNo.addEventListener('mouseover', () => {
    if (!isVeryQuestion) moveButton();
});

// ОБРАБОТКА КНОПКИ ДА
btnYes.addEventListener('click', (e) => {
    if (!isVeryQuestion) {
        // Переходим к "Очінь?"
        isVeryQuestion = true;
        questionText.innerText = "Очінь?";
        
        // Возвращаем кнопку "Нєт" на место и меняем текст
        btnNo.innerText = "Да";
        btnNo.style.position = 'relative';
        btnNo.style.left = '0';
        btnNo.style.top = '0';
    } else {
        // Если уже фаза "Очінь?" — финал
        finalStep(e);
    }
});

// ОБРАБОТКА ВТОРОЙ КНОПКИ (бывшее Нєт)
btnNo.addEventListener('click', (e) => {
    if (isVeryQuestion) {
        finalStep(e);
    } else {
        moveButton(); // На всякий случай, если кликнули пока убегала
    }
});

function finalStep(e) {
    questionText.innerText = "Спасібааа ❤️";
    btnYes.style.display = 'none';
    btnNo.style.display = 'none';

    const x = e ? e.clientX : window.innerWidth / 2;
    const y = e ? e.clientY : window.innerHeight / 2;
    
    runMagicExplosion(x, y);

    setTimeout(() => {
        window.location.href = 'gallery.html';
    }, 1600);
}

function runMagicExplosion(originX, originY) {
    const amount = 60;
    const colors = ['#ff4d6d', '#ff758f', '#ff85a2', '#ffffff'];
    for (let i = 0; i < amount; i++) {
        const p = document.createElement('div');
        p.className = 'boom-particle';
        const moveX = (Math.random() - 0.5) * 600;
        const moveY = (Math.random() - 0.5) * 600;
        p.style.setProperty('--x', `${moveX}px`);
        p.style.setProperty('--y', `${moveY}px`);
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = `${originX}px`;
        p.style.top = `${originY}px`;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 2500);
    }
}