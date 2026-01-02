if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    window.location.href = 'index.html'; 
}

let openedCount = 0;
const totalBoxes = 8;

function openBox(element) {
    if (!element.classList.contains('open')) {
        element.classList.add('open');
        openedCount++;
        if (openedCount === totalBoxes) {
            finishGallery();
        }
    }
}

function finishGallery() {
    const title = document.getElementById('gallery-title');
    setTimeout(() => {
        title.style.opacity = '0';
        setTimeout(() => {
            title.innerText = "Умнічкааа ❤️";
            title.style.opacity = '1';
            title.style.transform = "scale(1.1)";
        }, 500);
        createFinalExplosion();
        setTimeout(() => {
            window.location.href = 'final.html';
        }, 3000);
    }, 1000);
}

function createFinalExplosion() {
    const amount = 60;
    const originX = window.innerWidth / 2;
    const originY = window.innerHeight / 2;
    for (let i = 0; i < amount; i++) {
        const p = document.createElement('div');
        p.className = 'boom-particle';
        p.style.setProperty('--x', (Math.random() - 0.5) * 500 + 'px');
        p.style.setProperty('--y', (Math.random() - 0.5) * 500 + 'px');
        p.style.background = ['#ff4d6d','#ff758f','#ffffff'][Math.floor(Math.random()*3)];
        p.style.left = originX + 'px';
        p.style.top = originY + 'px';
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 2500);
    }
}

window.onload = function() {
    const boxes = document.querySelectorAll('.gift-box');
    const positions = [];
    
    // АДАПТАЦИЯ ПАРАМЕТРОВ ПОД ЭКРАН
    const isMobile = window.innerWidth < 600;
    const boxSize = isMobile ? 130 : 220;
    const minDistance = isMobile ? 140 : 250; // Меньше расстояние для мобилок
    const topMargin = isMobile ? 100 : 180;  // Меньше отступ от заголовка

    boxes.forEach(box => {
        let x, y, collision;
        let attempts = 0;

        do {
            collision = false;
            // Генерируем координаты так, чтобы коробка не уходила за правый и нижний край
            x = Math.random() * (window.innerWidth - boxSize - 20) + 10;
            y = Math.random() * (window.innerHeight - boxSize - 100) + topMargin;

            for (let pos of positions) {
                const dist = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
                if (dist < minDistance) {
                    collision = true;
                    break;
                }
            }
            attempts++;
        } while (collision && attempts < 300);

        positions.push({x, y});
        box.style.left = x + 'px';
        box.style.top = y + 'px';
        box.style.transform = `rotate(${Math.floor(Math.random() * 30) - 15}deg)`;
    });
};
