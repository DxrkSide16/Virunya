// МАССИВ ТВОИХ КАРТИНОК ДЛЯ АНИМАЦИИ
// Просто добавь пути к своим файлам сюда:
const objectImages = [
    'bow.png',       // Твой бантик
    'heart.png',     // Пример: если у тебя есть сердечко
    'star.png',      // Пример: если у тебя есть звездочка
    'flower.png',
    'vera.png'    // Пример: если у тебя есть цветочек
    // Добавь свои изображения здесь! Убедись, что они лежат в той же папке.
];

function initBackground() {
    const container = document.getElementById('bows-container');
    const count = 80; // Общее количество летающих объектов

    for (let i = 0; i < count; i++) {
        createObject(container, true);
    }
}

function createObject(container, fastStart = false) {
    const object = document.createElement('div');
    object.className = 'flying-object'; // Общий класс
    
    // Выбираем случайную картинку из массива
    const randomImage = objectImages[Math.floor(Math.random() * objectImages.length)];
    object.style.backgroundImage = `url('${randomImage}')`;

    const size = Math.random() * 50 + 25;
    const opacity = Math.random() * 0.4 + 0.15;
    const duration = Math.random() * 14 + 10;
    
    object.style.width = size + 'px';
    object.style.height = size + 'px';
    object.style.setProperty('--op', opacity);
    
    object.style.left = Math.random() * 100 + 'vw';
    object.style.top = Math.random() * 100 + 'vh';
    
    object.style.setProperty('--mx', (Math.random() - 0.5) * 1000 + 'px');
    object.style.setProperty('--my', (Math.random() - 0.5) * 1000 + 'px');
    object.style.setProperty('--rt', (Math.random() - 0.5) * 1400 + 'deg');
    object.style.setProperty('--sc', Math.random() * 1.5 + 0.5);

    object.style.animationDuration = duration + 's';
    
    if (fastStart) {
        object.style.animationDelay = -(Math.random() * duration) + 's';
    }

    container.appendChild(object);

    setTimeout(() => {
        object.remove();
        createObject(container);
    }, duration * 1000);
}

window.onload = initBackground;