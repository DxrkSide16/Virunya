// Возврат при обновлении
if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    window.location.href = 'index.html'; 
}

let openedCount = 0;
const totalBoxes = 8; // У нас 8 коробок

function openBox(element) {
    if (!element.classList.contains('open')) {
        element.classList.add('open');
        openedCount++;
        
        // Проверяем, все ли открыты
        if (openedCount === totalBoxes) {
            finishGallery();
        }
    }
}

function finishGallery() {
    const title = document.getElementById('gallery-title');
    
    setTimeout(() => {
        // 1. Меняем заголовок
        title.style.opacity = '0';
        setTimeout(() => {
            title.innerText = "Умнічкааа ❤️";
            title.style.opacity = '1';
            title.style.transform = "scale(1.2)";
        }, 500);

        // 2. Делаем большой финальный взрыв в центре
        createFinalExplosion();

        // 3. Переход на следующую страницу через 3 секунды
        setTimeout(() => {
            window.location.href = 'final.html'; // Назови так свою следующую страницу
        }, 3000);
    }, 1000);
}

function createFinalExplosion() {
    const amount = 100;
    const colors = ['#ff4d6d', '#ff758f', '#ff85a2', '#ffffff', '#ffd1dc'];
    const originX = window.innerWidth / 2;
    const originY = window.innerHeight / 2;

    for (let i = 0; i < amount; i++) {
        const p = document.createElement('div');
        p.className = 'boom-particle';
        const moveX = (Math.random() - 0.5) * 800;
        const moveY = (Math.random() - 0.5) * 800;
        p.style.setProperty('--x', `${moveX}px`);
        p.style.setProperty('--y', `${moveY}px`);
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = originX + 'px';
        p.style.top = originY + 'px';
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 2500);
    }
}

// Разброс коробок при загрузке
window.onload = function() {
    const boxes = document.querySelectorAll('.gift-box');
    const positions = []; 
    const minDistance = 250; 

    boxes.forEach(box => {
        let x, y, collision;
        let attempts = 0;

        do {
            collision = false;
            x = Math.random() * (window.innerWidth - 300) + 50;
            y = Math.random() * (window.innerHeight - 450) + 200;

            for (let pos of positions) {
                const dist = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
                if (dist < minDistance) {
                    collision = true;
                    break;
                }
            }
            attempts++;
        } while (collision && attempts < 150);

        positions.push({x, y});
        const randomRotate = Math.floor(Math.random() * 40) - 20;
        box.style.left = x + 'px';
        box.style.top = y + 'px';
        box.style.transform = `rotate(${randomRotate}deg)`;
    });

};
