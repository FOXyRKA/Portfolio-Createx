const burgerBtn = document.querySelector(".burger-menu");
const nav = document.querySelector(".nav__list-burger");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle( "__active" );
  nav.classList.toggle( 'open' );
});
