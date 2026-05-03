if (document.querySelector(".facts__item")) {
  // Функция анимации прогресса (ваша, немного доработанная)
  function progressAnimation_1(element) {
    const circle = document.querySelector(`.progress_${element}`);
    const percentageProgress = document.querySelector(
      `.facts-element__cercle-${element}`,
    ).dataset.value;
    const fullPercent = document.querySelector(
      `.facts-element__cercle-${element}`,
    ).dataset.full;
    const textContent = document.querySelector(`.value_persent_${element}`);

    const radius = circle.getAttribute("r");
    const circleLength = 2 * Math.PI * radius;

    // Устанавливаем параметры для анимации
    circle.setAttribute("stroke-dasharray", circleLength);

    // Функция обновления прогресса
    const updateProgress = (percent) => {
      // Ограничиваем процент от 0 до итогового значения
      const currentPercent = Math.min(percent, percentageProgress);

      // Обновляем цифру
      textContent.textContent = Math.floor(currentPercent);

      // Обновляем круг
      const offset =
        circleLength - (circleLength * currentPercent) / fullPercent;
      circle.setAttribute("stroke-dashoffset", offset);
    };

    // Возвращаем функцию для внешнего использования
    return updateProgress;
  }

  // Функция для плавной анимации
  function animateValue(element, start, end, duration, callback) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = start + progress * (end - start);
      callback(currentValue);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Наблюдатель за скроллом
  document.addEventListener("DOMContentLoaded", function () {
    // Создаем массив функций для каждого элемента
    const animations = [
      progressAnimation_1("1"),
      progressAnimation_1("2"),
      progressAnimation_1("3"),
      progressAnimation_1("4"),
    ];

    // Получаем конечные значения для каждого элемента
    const endValues = [
      document.querySelector(".facts-element__cercle-1").dataset.value,
      document.querySelector(".facts-element__cercle-2").dataset.value,
      document.querySelector(".facts-element__cercle-3").dataset.value,
      document.querySelector(".facts-element__cercle-4").dataset.value,
    ];

    // Создаем наблюдатель за пересечением
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Находим индекс элемента
            const elementIndex =
              parseInt(entry.target.className.match(/\d+/)[0]) - 1;

            // Анимируем от 0 до конечного значения
            animateValue(
              entry.target,
              0,
              endValues[elementIndex],
              3000, // Длительность анимации 2 секунды
              (value) => animations[elementIndex](value),
            );

            // Отключаем наблюдение после анимации
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3, // Когда элемент виден на 30%
        rootMargin: "0px",
      },
    );

    // Наблюдаем за каждым элементом
    for (let i = 1; i <= 4; i++) {
      const element = document.querySelector(`.facts-element__cercle-${i}`);
      if (element) {
        observer.observe(element);
      }
    }
  });
}

//управление бургер меню
if (document.querySelector(".burger-menu")) {
  const burgerBtn = document.querySelector(".burger-menu");
  const nav = document.querySelector(".nav__list-burger");

  burgerBtn.addEventListener("click", () => {
    burgerBtn.classList.toggle("__active");
    nav.classList.toggle("open");
  });
}

// --------------------------------------------------------------------------------------VIDEO

if (document.querySelector(".video-block")) {
  const videoBlock = document.querySelector(".video-block");
  const video = videoBlock.querySelector("video");
  const playBtn = document.querySelector(".video-block__play");
  playBtn.addEventListener("click", () => {
    videoBlock.classList.add("video-block--playted");
    video.play();
    video.controls = true;
    playBtn.classList.add("video-block__play--playted");
  });
  video.onplay = function () {
    // console.log("Play");
  };
  video.onpause = function () {};
}

// ------------------------------------------------------------------------------------------------ GO TO TOP
// Показываем кнопку только когда страница прокручена вниз
window.addEventListener("scroll", function () {
  const button = document.querySelector(".btn__goToTop");
  if (window.pageYOffset > 1000) {
    button.classList.add("btn__goToTop--active");
  } else {
    button.classList.remove("btn__goToTop--active");
  }
});

// ------------------------------------------------------------------------------------------------ my contacts
if (document.querySelector(".close_mycontacts")) {
  const closeBtnMyContacts = document.querySelector(".close_mycontacts");
  const myContactsBlock = document.querySelector(".my-contacts");
  myContactsBlock.classList.add("_active");
  closeBtnMyContacts.textContent = "X";

  closeBtnMyContacts.addEventListener("click", () => {
    myContactsBlock.classList.toggle("_active");
    if (myContactsBlock.classList.contains("_active")) {
      closeBtnMyContacts.textContent = "X";
    } else {
      closeBtnMyContacts.textContent = "V";
    }
  });
}
