if (document.querySelector(".portfolio-our-work__items")) {
  //находим кнопки
  const portfolioTabsBtns = document.querySelectorAll(".our-work-item");
  //находим список li
  const portfolioTabsItems = document.querySelectorAll(
    ".portfolio-our-work__items",
  );
  //находим элементы с data классами
  const portfolioTabsItem = document.querySelectorAll(".portfolio-list__item");
  //находим кнопуку loade more
  const loadeMore = document.querySelector(".our-work__reload");

  //добавляем класс по умолчанию элементу(кнопке что бы она была выделена)
  document
    .querySelector(".default-active")
    .classList.add("our-work-item--active");

  let defaultLimit = 9;
  let currentLimit = 9; //начальное количество
  let numberCurrent = 9;

  // Создаем два медиа-запроса
  const mediaQuery768 = window.matchMedia("(max-width: 768px)");
  const mediaQuery520 = window.matchMedia("(max-width: 520px)");

  function handleWidthChange() {
    // Проверяем сначала самый маленький экран
    if (mediaQuery520.matches) {
      // Ширина экрана 520px или меньше
      console.log("Ширина экрана 520px или меньше!");
      currentLimit = 1;
      numberCurrent = currentLimit;
      defaultLimit = currentLimit;
    }
    // Затем проверяем экраны от 521px до 768px
    else if (mediaQuery768.matches) {
      // Ширина экрана от 521px до 768px
      console.log("Ширина экрана от 521px до 768px!");
      currentLimit = 2;
      numberCurrent = currentLimit;
      defaultLimit = currentLimit;
    }
    // Все остальные экраны (больше 768px)
    else {
      currentLimit = 9;
      numberCurrent = 3;
      defaultLimit = currentLimit;
    }

    // Вызываем обновление видимости с новым значением currentLimit
    updateVisibility(currentLimit);

    // Также проверяем, нужно ли показать/скрыть кнопку "load more"
    if (currentLimit >= portfolioTabsItems.length) {
      loadeMore.style.display = "none";
    } else {
      loadeMore.style.display = "flex";
    }
  }

  // Проверяем сразу
  handleWidthChange();

  // Слушаем изменения на обоих медиа-запросах
  mediaQuery768.addEventListener("change", handleWidthChange);
  mediaQuery520.addEventListener("change", handleWidthChange);

  //функция перебираем эелемнты ,если их больше 9 то остальным добавляем класс hidden
  function updateVisibility(limit = 9) {
    portfolioTabsItems.forEach((item, index) => {
      if (index < limit) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  }

  //обработка кнопки показать еще
  loadeMore.addEventListener("click", () => {
    currentLimit += numberCurrent; //добавляем лимит отображения
    updateVisibility(currentLimit);
    // console.log(currentLimit);
    //если достигли конца списка ,можно скрыть кнопку
    if (currentLimit >= portfolioTabsItems.length) {
      loadeMore.style.display = "none";
    } else {
      loadeMore.style.display = "flex";
    }
  });

  portfolioTabsBtns.forEach((button) => {
    button.addEventListener("click", () => {
      //проверяем при нажатии на кнопку есть ли у нее класс
      if (!button.classList.contains("our-work-item--active")) {
      }
      //проверяем все кнопки и при нажатии удаляем у всех классы
      portfolioTabsBtns.forEach((btn) =>
        btn.classList.remove("our-work-item--active"),
      );
      //при нажатии устанавливаем класс текщей кнопке
      button.classList.add("our-work-item--active");

      //получаем значение текущего дата класса кнопки
      const path = button.dataset.path;
      //если класс all то показываем все элементы (картинкой)
      if (path == "all") {
        currentLimit = defaultLimit;
        loadeMore.style.display = "none";
        portfolioTabsItem.forEach((img) =>
          //устанавливаем класс родителю элемента(контейнеру картинки)
          img.parentNode.classList.add("portfolio-our-work__items--visible"),
        );
        //показываем стандартное значение = 9
        updateVisibility(currentLimit);
        portfolioTabsItems.forEach((item) => {
          //если есть элементы(кртинки) с классом hidden
          if (item.classList.contains("hidden")) {
            //показывать кнопку
            loadeMore.style.display = "flex";
          }
        });
        return;
      }
      portfolioTabsItem.forEach((img) => {
        //сравниваем data target с эелементом path (картинкой)
        if (img.dataset.target === path) {
          //устанавливаем класс родителю элемента(контейнеру картинки)
          img.parentNode.classList.add("portfolio-our-work__items--visible");
        } else {
          //удаляем класс у родителя элемента(контейнера картинки)
          img.parentNode.classList.remove("portfolio-our-work__items--visible");
        }
      });
    });
  });
}
