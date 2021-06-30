'use strict'

const feedbackButton = document.querySelector('.button[href="#feedback"]');
const feedbackPopup = document.querySelector('.modal.feedback');

const mapButton = document.querySelector('.link[href="#map"]');
const mapPopup = document.querySelector('.modal.map');

const popupCloseButtons = document.querySelectorAll('.modal__close');

const specialSlider = document.querySelector('.slider');

const buyButtons = document.querySelectorAll('.product-card__buy');
const addedPopup = document.querySelector('.added-cart');

let isStorageSupport = true;
let storage = '';

try {
    storage = localStorage.getItem('name');
} catch (err) {
    isStorageSupport = false;
}

function closePopup(parentPopup) {
    parentPopup.classList.add('modal--close');
    setTimeout(function() {
        parentPopup.classList.remove('modal--show');
        parentPopup.classList.remove('modal--close');
        parentPopup.classList.remove('modal--error');
    }, 350);
}

popupCloseButtons.forEach(function(item) {
    item.addEventListener('click', function(evt) {
        evt.preventDefault();

        const parentPopup = evt.target.closest('.modal');
        closePopup(parentPopup);
    });
});

window.addEventListener('keydown', function(evt) {
    if (evt.key === "Esc" || evt.key === "Escape") {
        if (feedbackPopup && feedbackPopup.classList.contains('modal--show')) {
            closePopup(feedbackPopup);
        }

        if (mapPopup && mapPopup.classList.contains('modal--show')) {
            closePopup(mapPopup);
        }

        if (addedPopup && addedPopup.classList.contains('modal--show')) {
            closePopup(addedPopup);
        }
    }
});

if (feedbackPopup) {
    const feedbackForm = feedbackPopup.querySelector('.feedback__form');
    const feedbackName = feedbackForm.querySelector('[name="name"]');
    const feedbackEmail = feedbackForm.querySelector('[name="email"]');
    const feedbackText = feedbackForm.querySelector('[name="text"]');

    feedbackButton.addEventListener('click', function(evt) {
        evt.preventDefault();
        feedbackPopup.classList.add('modal--show');

        if (storage) {
            feedbackName.value = localStorage.getItem('name');
            feedbackEmail.value = localStorage.getItem('email');

            feedbackText.focus();
        } else {
            feedbackName.focus();
        }
    });

    feedbackForm.addEventListener('submit', function(evt) {
        evt.preventDefault();

        if (!feedbackName.value || !feedbackEmail.value) {
            feedbackPopup.classList.add('modal--error');
        } else if (isStorageSupport) {
            localStorage.setItem('name', feedbackName.value);
            localStorage.setItem('email', feedbackEmail.value);

            evt.target.submit();
        }
    });

    mapButton.addEventListener('click', function(evt) {
        evt.preventDefault();
        mapPopup.classList.add('modal--show');
    });
}

if (specialSlider) {
    const specialSliderPrev = specialSlider.querySelector('.slider__btn--prev');
    const specialSliderNext = specialSlider.querySelector('.slider__btn--next');

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
}

if (addedPopup) {
    buyButtons.forEach(function(item) {
        item.addEventListener('click', function(evt) {
            evt.preventDefault();

            addedPopup.classList.add('modal--show');
        });
    });
}
