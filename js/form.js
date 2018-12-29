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

  var valueRoomToValueCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var adFormElement = document.querySelector('.ad-form');
  var priceInputElement = adFormElement.querySelector('#price');
  var titleInputElement = adFormElement.querySelector('#title');
  var typeSelectElement = adFormElement.querySelector('#type');
  var typeOptionElements = typeSelectElement.options;
  var timeinSelectElement = adFormElement.querySelector('#timein');
  var timeoutSelectElement = adFormElement.querySelector('#timeout');
  var roomNumberSelectElement = adFormElement.querySelector('#room_number');
  var roomNumberOptionElements = roomNumberSelectElement.options;
  var capacitySelectElement = adFormElement.querySelector('#capacity');
  var capacityOptionElements = capacitySelectElement.options;
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

  var capacitySelectCopyElement = capacitySelectElement.cloneNode(true);

  Array.from(capacityOptionElements).forEach(function (capacityOption) {
    if (!capacityOption.selected) {
      capacitySelectElement.removeChild(capacityOption);
    }
  });

  var roomNumberChangeHandler = function () {
    Array.from(roomNumberOptionElements).forEach(function (roomOption) {
      if (roomOption.selected) {
        capacitySelectElement.innerHTML = '';
        var valueCapacity = valueRoomToValueCapacity[roomOption.value];
        valueCapacity.forEach(function (value) {
          Array.from(capacitySelectCopyElement.options).forEach(function (capacityOption) {
            if (capacityOption.value === value) {
              var capacityOptionCopyElement = capacityOption.cloneNode(true);
              capacitySelectElement.appendChild(capacityOptionCopyElement);
            }
          });
        });
      }
    });
  };

  var timeinChangeHandler = function () {
    var index = timeinSelectElement.selectedIndex;
    timeoutSelectElement.selectedIndex = index;
  };

  var timeoutChangeHandler = function () {
    var index = timeoutSelectElement.selectedIndex;
    timeinSelectElement.selectedIndex = index;
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
  timeinSelectElement.addEventListener('change', timeinChangeHandler);
  timeoutSelectElement.addEventListener('change', timeoutChangeHandler);

  window.form = {
    adFormElement: adFormElement,
    mainElement: mainElement,
    documentEscKeyHandler: documentEscKeyHandler,
    documentClickHandler: documentClickHandler,
    TypeHousing: TypeHousing
  };
})();
