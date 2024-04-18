import './styles.css';

// SLIDER

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const svgLeft = document.querySelector('.slider__svg--left');
const svgRight = document.querySelector('.slider__svg--right');
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const slidesNumber = slides.length;

const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};

createDots();

const activateCurrentDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

activateCurrentDot(0);

const activateButton = function () {
  if (currentSlide !== slidesNumber - 1) {
    svgRight.classList.add('slider__svg--active');
  }
  if (currentSlide !== 0) {
    svgLeft.classList.add('slider__svg--active');
  }
};

activateButton();

const disableButton = function () {
  if (currentSlide === slidesNumber - 1) {
    svgRight.classList.remove('slider__svg--active');
  }
  if (currentSlide === 0) {
    svgLeft.classList.remove('slider__svg--active');
  }
};

disableButton();

const moveToSlide = function (slide) {
  slides.forEach(
    (s, index) => (s.style.transform = `translateX(${(index - slide) * 121}%)`)
  );
};

moveToSlide(0);

const nextSlide = function () {
  if (currentSlide === slidesNumber - 1) {
    // currentSlide = 0;
  } else {
    currentSlide++;
  }
  activateButton();
  disableButton();
  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
};

const previousSlide = function () {
  if (currentSlide === 0) {
    // currentSlide = slidesNumber - 1;
  } else {
    currentSlide--;
  }
  activateButton();
  disableButton();
  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
};

btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') previousSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
    activateCurrentDot(slide);
  }
});
