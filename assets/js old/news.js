if (document.querySelector(".categories-nav__item")) {
  const btns = document.querySelectorAll(".categories-nav__btn");

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!btn.classList.contains("btn__active")) {
        btns.forEach((b) => {
          b.classList.remove("btn__active");
        });
        btn.classList.add("btn__active");
      }
    });
  });
}
