//  слайдер с адаптацие под разрешения
const bodyStyle = window.getComputedStyle(document.body);
const gap = parseInt(bodyStyle.getPropertyValue("--grid-gap"));
const portSlider = document.querySelector(".portfolio-section__items");

const portfolioSlider = new Swiper(portSlider, {
  slidesPerView: 3,
  spaceBetween: gap,
  loop: true,
  breakpoints: {
    // когда ширина окна >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: gap,
    },
    // когда ширина окна >= 640px
    521: {
      slidesPerView: 2,
      spaceBetween: gap,
    },
    // когда ширина окна >= 640px
    768: {
      slidesPerView: 2,
      spaceBetween: gap,
    },
    // когда ширина окна >= 640px
    769: {
      slidesPerView: 3,
      spaceBetween: gap,
    },
    // когда ширина окна >= 1024px
    1024: {
      slidesPerView: 3,
      spaceBetween: gap,
    },
  },
  navigation: {
    nextEl: ".portfolio-section__prev",
    prevEl: ".portfolio-section__next",
  },
});
/* ------------------------------------------------------------слайдер для блока portfolio-section */

// const bodyStyle = window.getComputedStyle(document.body);
// const gap = parseInt(bodyStyle.getPropertyValue("--grid-gap"));
// const portSlider = document.querySelector(".portfolio-section__items");

// const portfolioSlider = new Swiper(portSlider, {
//   // Optional parameters
//   slidesPerView: 3,
//   spaceBetween: gap,
//   loop: true,
//   on: {
//     init: function () {},
//   },
//   // Navigation arrows
//   navigation: {
//     nextEl: ".portfolio-section__prev",
//     prevEl: ".portfolio-section__next",
//   },
// });
/* ------------------------------------------------------------слайдер для блока testimonials */
const bodyStyle2 = window.getComputedStyle(document.body);
const gap2 = parseInt(bodyStyle.getPropertyValue("--grid-gap"));
const testimonSlider = document.querySelector(".testimonials__items");

const testimonialsSlider = new Swiper(testimonSlider, {
  // Optional parameters
  slidesPerView: 1,
  spaceBetween: gap,
  loop: true,
  on: {
    init: function () {},
  },
  // Navigation arrows
  navigation: {
    nextEl: ".testimonials-btn__prev",
    prevEl: ".testimonials-btn__next",
  },
});
/* ------------------------------------------------------------слайдер для thumbs gallery */
const workImages = document.querySelector(".work-images-slider");
const workImagesNav = document.querySelector(".work-images-nav");

if (workImages) {
  const workSlider = new Swiper(workImagesNav, {
    spaceBetween: 20,
    slidesPerView: 10,
    freeMode: true,
    watchSlidesProgress: true,
  });
  const workSliderNav = new Swiper(workImages, {
    spaceBetween: 20,
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: ".work-btn__next",
      prevEl: ".work-btn__prev",
    },
    thumbs: {
      swiper: workSlider,
    },
  });
}

/* ------------------------------------------------------------слайдер history ABOUS-US*/
const historySlider = document.querySelector(".mySlider-history");
if (historySlider) {
  let swiper = new Swiper(historySlider, {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 1,
    navigation: {
      nextEl: ".our-history__next",
      prevEl: ".our-history__prev",
    },
  });
  //проверка слайдера на перелистывание
  swiper.on("slideChange", () => {
    //перебираем все элементы(кнопки)
    historyBtns.forEach((e) => {
      //удаляем у всех классы
      e.classList.remove("history-nav__btn__active");
    });
    //ищем элемент с классом и дата классом и добавляем ему еще один класс
    document
      .querySelector(`.history-nav__btn[data-index="${swiper.realIndex}"]`)
      .classList.add("history-nav__btn__active");
  });

  //ищем все кнопки
  const historyBtns = document.querySelectorAll(".history-nav__btn");
  //перебираем кнопки
  historyBtns.forEach((e, i) => {
    //добавляем всем элементам дата класс с интексом
    e.setAttribute("data-index", i);
    //на все элементы устанавливаем слушатель нжатий
    e.addEventListener("click", (e) => {
      //получаем индекс каждого элемента(кнопки)
      const index = e.currentTarget.dataset.index;
      //перебираем все элементы и убаляем класс
      historyBtns.forEach((e) => {
        e.classList.remove("history-nav__btn__active");
      });
      //текущему нажатом элементу добавляем класс
      e.currentTarget.classList.add("history-nav__btn__active");
      //передаем индек элемента(кнопки) в слайдер
      swiper.slideTo(index);
    });
  });
}

// --------------------------------hero-slider--------------------------------------------------
const heroSlider = new Swiper(".hero-slider", {
  // Optional parameters
  slidesPerView: 1,
  loop: true,
  // Navigation arrows
  navigation: {
    nextEl: ".hero-slide-btn__prev",
    prevEl: ".hero-slide-btn__next",
  },
  pagination: {
    el: ".hero-pagination",
    type: "bullets",
    clickable: true,
  },
});
