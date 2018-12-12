'use strict';

(function () {
  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  var adFormElement = document.querySelector('.ad-form');
  var priceInputElement = adFormElement.querySelector('#price');
  var typeSelectElement = adFormElement.querySelector('#type');
  var typeOptionElements = typeSelectElement.options;
  var timeinSelectElement = adFormElement.querySelector('#timein');
  var timeinOptionElements = timeinSelectElement.options;
  var timeoutSelectElement = adFormElement.querySelector('#timeout');
  var timeoutOptionElements = timeoutSelectElement.options;
  var roomNumberSelectElement = adFormElement.querySelector('#room_number');
  var roomNumberOptionElements = roomNumberSelectElement.options;
  var capacitySelectElement = adFormElement.querySelector('#capacity');
  var resetButtonElement = adFormElement.querySelector('.ad-form__reset');
  var submitButtonElement = adFormElement.querySelector('.ad-form__submit');
  var mainElement = document.querySelector('main');


  var typeSelectChangeHandler = function () {
    for (var i = 0; i < typeOptionElements.length; i++) {
      var typeOption = typeOptionElements[i];
      if (typeOption.selected) {
        if (typeOption.value === 'bungalo') {
          priceInputElement.min = MIN_PRICE_BUNGALO;
          priceInputElement.placeholder = MIN_PRICE_BUNGALO;
        }
        if (typeOption.value === 'flat') {
          priceInputElement.min = MIN_PRICE_FLAT;
          priceInputElement.placeholder = MIN_PRICE_FLAT;
        }
        if (typeOption.value === 'house') {
          priceInputElement.min = MIN_PRICE_HOUSE;
          priceInputElement.placeholder = MIN_PRICE_HOUSE;
        }
        if (typeOption.value === 'palace') {
          priceInputElement.min = MIN_PRICE_PALACE;
          priceInputElement.placeholder = MIN_PRICE_PALACE;
        }
      }
    }
  };

  var roomNumberChangeHandler = function () {
    for (var i = 0; i < roomNumberOptionElements.length; i++) {
      if (roomNumberOptionElements[i].selected) {
        if (roomNumberOptionElements[i].value === '1') {
          removeCapacityOptions();
          appendCapacityOption(2);
        }
        if (roomNumberOptionElements[i].value === '2') {
          removeCapacityOptions();
          appendCapacityOption(1);
          appendCapacityOption(2);
        }
        if (roomNumberOptionElements[i].value === '3') {
          removeCapacityOptions();
          appendCapacityOption(0);
          appendCapacityOption(1);
          appendCapacityOption(2);
        }
        if (roomNumberOptionElements[i].value === '100') {
          removeCapacityOptions();
          appendCapacityOption(3);
        }
      }
    }
  };

  var copyCapacitySelect = function () {
    return capacitySelectElement.cloneNode(true);
  };

  var removeCapacityOptions = function () {
    capacitySelectElement.innerHTML = '';
  };

  var appendCapacityOption = function (i) {
    var capacityOptionCopyElement = capacitySelectCopyElement[i].cloneNode(true);
    capacitySelectElement.appendChild(capacityOptionCopyElement);
  };

  var getCheckTime = function (timeSelect, timeOptionsOne, timeOptionsTwo) {
    timeSelect.addEventListener('change', function () {
      for (var i = 0; i < timeOptionsOne.length; i++) {
        if (timeOptionsOne[i].selected) {
          if (timeOptionsOne[i].value === '12:00') {
            timeOptionsTwo[0].selected = true;
          }
          if (timeOptionsOne[i].value === '13:00') {
            timeOptionsTwo[1].selected = true;
          }
          if (timeOptionsOne[i].value === '14:00') {
            timeOptionsTwo[2].selected = true;
          }
        }
      }
    });
  };

  var successHandler = function () {
    adFormElement.reset();
    window.map.setInactiveState();
    typeSelectChangeHandler();
    mainElement.appendChild(window.renderMessage.renderSuccessMessageForm());
    submitButtonElement.disabled = false;
  };

  var errorHandler = function (errorMessage) {
    mainElement.appendChild(window.renderMessage.renderErrorMessageForm(errorMessage));
    submitButtonElement.disabled = false;
  };

  var adFormSubmitHandler = function (evt) {
    window.backend.upload(new FormData(adFormElement), successHandler, errorHandler);
    evt.preventDefault();
    submitButtonElement.disabled = true;
  };

  var documentEscKeyHandler = function (evt) {
    window.util.isEscEvent(evt, closeSuccessMessage);
    window.util.isEscEvent(evt, closeErrorMessage);
  };

  var documentClickHandler = function () {
    closeSuccessMessage();
    closeErrorMessage();
  };

  var closeSuccessMessage = function () {
    var successElement = document.querySelector('.success');
    if (successElement) {
      mainElement.removeChild(successElement);
    }
  };

  var closeErrorMessage = function () {
    var errorElement = document.querySelector('.error');
    if (errorElement) {
      mainElement.removeChild(errorElement);
    }
  };

  var resetButtonClickHandler = function (evt) {
    evt.preventDefault();
    successHandler();
  };

  adFormElement.addEventListener('submit', adFormSubmitHandler);
  resetButtonElement.addEventListener('click', resetButtonClickHandler);
  document.addEventListener('keydown', documentEscKeyHandler);
  document.addEventListener('click', documentClickHandler);
  typeSelectElement.addEventListener('change', typeSelectChangeHandler);
  roomNumberSelectElement.addEventListener('change', roomNumberChangeHandler);

  getCheckTime(timeinSelectElement, timeinOptionElements, timeoutOptionElements);
  getCheckTime(timeoutSelectElement, timeoutOptionElements, timeinOptionElements);

  var capacitySelectCopyElement = copyCapacitySelect();
  removeCapacityOptions();
  appendCapacityOption(2);

  window.form = {
    adFormElement: adFormElement,
    mainElement: mainElement
  };
})();
