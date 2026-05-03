let isDragging = false;
let dragElement = null;
let offsetX, offsetY;
let isFixed = false; // Флаг для определения типа позиционирования

// Получаем блок для перетаскивания
const draggable = document.getElementById('draggable');

// Проверка, можно ли перетаскивать элемент
function canDrag(element) {
    // Вводим сюда те элементы которые нам нужно оставлять активными
    const noDragSelectors = ['button', 'input', 'span', '.my-contacts'];
    // Проверяем элемент можно ли перетаскивать
    return !noDragSelectors.some(selector =>
        element.closest(selector) ||
        element.tagName.toLowerCase() === selector
    );
}

// Функция для определения типа позиционирования
function getPositionType(element) {
    const computedStyle = window.getComputedStyle(element);
    return computedStyle.position;
}

// Начало перетаскивания
draggable.addEventListener('mousedown', function(e) {
    // Проверка разрешено ли перетаскивать элемент
    if (!canDrag(e.target)) {
        return; // Не перетаскиваем
    }
    e.preventDefault();
    e.stopPropagation();
    
    isDragging = true;
    dragElement = this;
    
    // Определяем тип позиционирования
    const positionType = getPositionType(this);
    isFixed = positionType === 'fixed';
    
    // Получаем текущие координаты элемента
    const rect = this.getBoundingClientRect();
    
    if (isFixed) {
        // Для fixed элементов координаты относительно viewport
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    } else {
        // Для absolute элементов учитываем скролл страницы
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        offsetX = e.clientX + scrollX - rect.left;
        offsetY = e.clientY + scrollY - rect.top;
    }
    
    // Класс для визуальной обратной связи
    this.classList.add('draggable');

});

// Функция для ограничения координат в пределах экрана
function clampToScreen(x, y, elementWidth, elementHeight, isFixedElement) {
    let minX, maxX, minY, maxY;
    
    if (isFixedElement) {
        // Для fixed: ограничиваем в пределах viewport
        minX = 0;
        maxX = window.innerWidth - elementWidth;
        minY = 0;
        maxY = window.innerHeight - elementHeight;
    } else {
        // Для absolute: учитываем скролл и ограничиваем в пределах документа
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        minX = scrollX;
        maxX = scrollX + window.innerWidth - elementWidth;
        minY = scrollY;
        maxY = scrollY + window.innerHeight - elementHeight;
    }
    
    // Ограничиваем значения
    x = Math.max(minX, Math.min(x, maxX));
    y = Math.max(minY, Math.min(y, maxY));
    
    return { x, y };
}

// Перемещение
document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    let x, y;
    const elementWidth = dragElement.offsetWidth;
    const elementHeight = dragElement.offsetHeight;
    
    if (isFixed) {
        // Для fixed: координаты относительно viewport
        x = e.clientX - offsetX;
        y = e.clientY - offsetY;
        
        // Ограничиваем перемещение в пределах окна
        const clamped = clampToScreen(x, y, elementWidth, elementHeight, true);
        x = clamped.x;
        y = clamped.y;
    } else {
        // Для absolute: учитываем скролл
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        x = e.clientX + scrollX - offsetX;
        y = e.clientY + scrollY - offsetY;
        
        // Ограничиваем перемещение в пределах видимой области с учетом скролла
        const clamped = clampToScreen(x, y, elementWidth, elementHeight, false);
        x = clamped.x;
        y = clamped.y;
    }
    
    // Применяем новую позицию
    dragElement.style.left = x + 'px';
    dragElement.style.top = y + 'px';

    
});

// Завершение перетаскивания
document.addEventListener('mouseup', function() {
    if (isDragging) {
        isDragging = false;
        dragElement.classList.remove('draggable');
        dragElement = null;
        isFixed = false;
    }
});

// Обработка события mouseleave (если мышь ушла за пределы окна)
document.addEventListener('mouseleave', function() {
    if (isDragging) {
        isDragging = false;
        dragElement.classList.remove('draggable');
        dragElement = null;
        isFixed = false;
        
    }
});
