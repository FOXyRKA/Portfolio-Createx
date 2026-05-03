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

// 🔵 УНИФИЦИРОВАННАЯ ФУНКЦИЯ для получения координат (работает и с мышью, и с тачем)
function getClientCoordinates(e) {
    let clientX, clientY;
    
    if (e.touches) {
        // Это touch-событие
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        // Это mouse-событие
        clientX = e.clientX;
        clientY = e.clientY;
    }
    
    return { clientX, clientY };
}

// Начало перетаскивания (ОБНОВЛЕНО для поддержки touch)
function startDrag(e) {
    // Проверка разрешено ли перетаскивать элемент
    if (!canDrag(e.target)) {
        return; // Не перетаскиваем
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    isDragging = true;
    dragElement = draggable; // Используем draggable вместо this для консистентности
    
    // Определяем тип позиционирования
    const positionType = getPositionType(dragElement);
    isFixed = positionType === 'fixed';
    
    // Получаем координаты (универсально для мыши и тача)
    const { clientX, clientY } = getClientCoordinates(e);
    
    // Получаем текущие координаты элемента
    const rect = dragElement.getBoundingClientRect();
    
    if (isFixed) {
        // Для fixed элементов координаты относительно viewport
        offsetX = clientX - rect.left;
        offsetY = clientY - rect.top;
    } else {
        // Для absolute элементов учитываем скролл страницы
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        offsetX = clientX + scrollX - rect.left;
        offsetY = clientY + scrollY - rect.top;
    }
    
    // Класс для визуальной обратной связи
    dragElement.classList.add('draggable');
}

// Перемещение (ОБНОВЛЕНО для поддержки touch)
function onDrag(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    // Получаем координаты (универсально для мыши и тача)
    const { clientX, clientY } = getClientCoordinates(e);
    
    let x, y;
    const elementWidth = dragElement.offsetWidth;
    const elementHeight = dragElement.offsetHeight;
    
    if (isFixed) {
        // Для fixed: координаты относительно viewport
        x = clientX - offsetX;
        y = clientY - offsetY;
        
        // Ограничиваем перемещение в пределах окна
        const clamped = clampToScreen(x, y, elementWidth, elementHeight, true);
        x = clamped.x;
        y = clamped.y;
    } else {
        // Для absolute: учитываем скролл
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        x = clientX + scrollX - offsetX;
        y = clientY + scrollY - offsetY;
        
        // Ограничиваем перемещение в пределах видимой области с учетом скролла
        const clamped = clampToScreen(x, y, elementWidth, elementHeight, false);
        x = clamped.x;
        y = clamped.y;
    }
    
    // Применяем новую позицию
    dragElement.style.left = x + 'px';
    dragElement.style.top = y + 'px';
}

// Завершение перетаскивания
function endDrag() {
    if (isDragging) {
        isDragging = false;
        if (dragElement) {
            dragElement.classList.remove('draggable');
        }
        dragElement = null;
        isFixed = false;
    }
}

// 🖱️ MOUSE-СОБЫТИЯ (для мыши)
draggable.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', onDrag);
document.addEventListener('mouseup', endDrag);
document.addEventListener('mouseleave', endDrag);

// 📱 TOUCH-СОБЫТИЯ (для сенсорных экранов)
draggable.addEventListener('touchstart', startDrag, { passive: false });
document.addEventListener('touchmove', onDrag, { passive: false });
document.addEventListener('touchend', endDrag);
document.addEventListener('touchcancel', endDrag);

// Функция для ограничения координат в пределах экрана (ОСТАЁТСЯ БЕЗ ИЗМЕНЕНИЙ)
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