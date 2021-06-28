'use strict'

const feedbackButton = document.querySelector('.button[href="#feedback"]');
const feedbackPopup = document.querySelector('.modal.feedback');

const mapButton = document.querySelector('.link[href="#map"]');
const mapPopup = document.querySelector('.modal.map');

const popupCloseButtons = document.querySelectorAll('.modal__close');

const specialSlider = document.querySelector('.slider');
const specialSliderPrev = specialSlider.querySelector('.slider__btn--prev');
const specialSliderNext = specialSlider.querySelector('.slider__btn--next');

function closePopup(parentPopup) {
    parentPopup.classList.add('modal--close');
    setTimeout(function() {
        parentPopup.classList.remove('modal--show');
        parentPopup.classList.remove('modal--close');
    }, 350);
}

feedbackButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    feedbackPopup.classList.add('modal--show');
});

mapButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    mapPopup.classList.add('modal--show');
});

popupCloseButtons.forEach(function(item) {
    item.addEventListener('click', function(evt) {
        evt.preventDefault();

        const parentPopup = evt.target.closest('.modal');
        closePopup(parentPopup);
    });
});

window.addEventListener('keydown', function(evt) {
    if (evt.key === "Esc" || evt.key === "Escape") {
        if (feedbackPopup.classList.contains('modal--show')) {
            closePopup(feedbackPopup);
        }

        if (mapPopup.classList.contains('modal--show')) {
            closePopup(mapPopup);
        }
    }
});

specialSliderPrev.addEventListener('click', function(evt) {
    evt.preventDefault();

    const parentSlider = evt.target.closest('.slider');
    const currentBullet = parentSlider.querySelector('.slider__bullet-radio:checked');

    let prevBullet = currentBullet.previousElementSibling;

    currentBullet.checked = false;
    if (!prevBullet || !prevBullet.classList.contains('slider__bullet-radio')) {
        prevBullet = parentSlider.querySelector('.slider__bullet-radio:last-of-type');
    }
    prevBullet.checked = true;
});

specialSliderNext.addEventListener('click', function(evt) {
    evt.preventDefault();

    const parentSlider = evt.target.closest('.slider');
    const currentBullet = parentSlider.querySelector('.slider__bullet-radio:checked');

    let nextBullet = currentBullet.nextElementSibling;

    currentBullet.checked = false;
    if (!nextBullet || !nextBullet.classList.contains('slider__bullet-radio')) {
        nextBullet = parentSlider.querySelector('.slider__bullet-radio:first-of-type');
    }
    nextBullet.checked = true;
});
