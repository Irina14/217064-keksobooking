'use strict';

(function () {
  var TypeHousing = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace'
  };

  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var RoomNumber = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    HUNDRED: '100'
  };

  var CheckTime = {
    MIDDAY: '12:00',
    ONE_OCLOCK: '13:00',
    TWO_OCLOCK: '14:00'
  };

  var adFormElement = document.querySelector('.ad-form');
  var priceInputElement = adFormElement.querySelector('#price');
  var titleInputElement = adFormElement.querySelector('#title');
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
    Array.from(typeOptionElements).forEach(function (option) {
      if (option.selected) {
        if (option.value === TypeHousing.BUNGALO) {
          priceInputElement.min = MinPrice.BUNGALO;
          priceInputElement.placeholder = MinPrice.BUNGALO;
        }
        if (option.value === TypeHousing.FLAT) {
          priceInputElement.min = MinPrice.FLAT;
          priceInputElement.placeholder = MinPrice.FLAT;
        }
        if (option.value === TypeHousing.HOUSE) {
          priceInputElement.min = MinPrice.HOUSE;
          priceInputElement.placeholder = MinPrice.HOUSE;
        }
        if (option.value === TypeHousing.PALACE) {
          priceInputElement.min = MinPrice.PALACE;
          priceInputElement.placeholder = MinPrice.PALACE;
        }
      }
    });
  };

  var roomNumberChangeHandler = function () {
    Array.from(roomNumberOptionElements).forEach(function (option) {
      if (option.selected) {
        if (option.value === RoomNumber.ONE) {
          removeCapacityOptions();
          appendCapacityOption(2);
        }
        if (option.value === RoomNumber.TWO) {
          removeCapacityOptions();
          appendCapacityOption(1);
          appendCapacityOption(2);
        }
        if (option.value === RoomNumber.THREE) {
          removeCapacityOptions();
          appendCapacityOption(0);
          appendCapacityOption(1);
          appendCapacityOption(2);
        }
        if (option.value === RoomNumber.HUNDRED) {
          removeCapacityOptions();
          appendCapacityOption(3);
        }
      }
    });
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
          if (timeOptionsOne[i].value === CheckTime.MIDDAY) {
            timeOptionsTwo[0].selected = true;
          }
          if (timeOptionsOne[i].value === CheckTime.ONE_OCLOCK) {
            timeOptionsTwo[1].selected = true;
          }
          if (timeOptionsOne[i].value === CheckTime.TWO_OCLOCK) {
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
    document.addEventListener('keydown', documentEscKeyHandler);
    document.addEventListener('click', documentClickHandler);
    submitButtonElement.disabled = false;
  };

  var errorHandler = function (errorMessage) {
    mainElement.appendChild(window.renderMessage.renderErrorMessageForm(errorMessage));
    document.addEventListener('keydown', documentEscKeyHandler);
    document.addEventListener('click', documentClickHandler);
    submitButtonElement.disabled = false;
  };

  var adFormSubmitHandler = function (evt) {
    window.backend.upload(new FormData(adFormElement), successHandler, errorHandler);
    evt.preventDefault();
    submitButtonElement.disabled = true;
  };

  var submitButtonClickHandler = function () {
    if (!titleInputElement.validity.valid) {
      titleInputElement.classList.add('ad-form__error');
    }

    if (!priceInputElement.validity.valid) {
      priceInputElement.classList.add('ad-form__error');
    }
  };

  var titleInputHandler = function () {
    if (titleInputElement.validity.valid) {
      titleInputElement.classList.remove('ad-form__error');
    }
  };

  var priceInputHandler = function () {
    if (priceInputElement.validity.valid) {
      priceInputElement.classList.remove('ad-form__error');
    }
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
      window.map.disableElements(window.map.fieldsetElements, true);
      window.map.disableElements(window.map.filterElements, true);
      document.removeEventListener('keydown', documentEscKeyHandler);
      document.removeEventListener('click', documentClickHandler);
    }
  };

  var closeErrorMessage = function () {
    var errorElement = document.querySelector('.error');
    if (errorElement) {
      mainElement.removeChild(errorElement);
      document.removeEventListener('keydown', documentEscKeyHandler);
      document.removeEventListener('click', documentClickHandler);
    }
  };

  var resetButtonClickHandler = function (evt) {
    evt.preventDefault();
    successHandler();
  };

  adFormElement.addEventListener('submit', adFormSubmitHandler);
  submitButtonElement.addEventListener('click', submitButtonClickHandler);
  titleInputElement.addEventListener('input', titleInputHandler);
  priceInputElement.addEventListener('input', priceInputHandler);
  resetButtonElement.addEventListener('click', resetButtonClickHandler);
  typeSelectElement.addEventListener('change', typeSelectChangeHandler);
  roomNumberSelectElement.addEventListener('change', roomNumberChangeHandler);

  getCheckTime(timeinSelectElement, timeinOptionElements, timeoutOptionElements);
  getCheckTime(timeoutSelectElement, timeoutOptionElements, timeinOptionElements);

  var capacitySelectCopyElement = copyCapacitySelect();
  removeCapacityOptions();
  appendCapacityOption(2);

  window.form = {
    adFormElement: adFormElement,
    mainElement: mainElement,
    documentEscKeyHandler: documentEscKeyHandler,
    documentClickHandler: documentClickHandler
  };
})();
