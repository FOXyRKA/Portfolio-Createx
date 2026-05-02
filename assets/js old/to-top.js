

// Показываем кнопку только когда страница прокручена вниз
window.addEventListener('scroll', function() {
  const button = document.querySelector('.btn__goToTop');
  if (window.pageYOffset > 1000) {
    button.classList.add( 'btn__goToTop--active' );
  } else {
    button.classList.remove( 'btn__goToTop--active' );
  }
});