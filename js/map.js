'use strict';

(function () {
  var PIN_MAIN_RADIUS = 31;
  var PIN_MAIN_WIDTH = 62;
  var PIN_MAIN_HEIGHT = 84;
  var PIN_MAIN_LEFT = 570;
  var PIN_MAIN_TOP = 375;
  var X_MAX = 1200;
  var X_MIN = 0;
  var Y_MAX = 630;
  var Y_MIN = 130;

  var mapElement = document.querySelector('.map');
  var mapPinMainElement = mapElement.querySelector('.map__pin--main');
  var fieldsetElements = document.querySelectorAll('fieldset');
  var filterElements = document.querySelectorAll('.map__filter');
  var addressInputElement = window.form.adFormElement.querySelector('#address');
  var cards = [];

  var successHandler = function (data) {
    var ads = data;
    var sortAds = window.getSortAds(ads).slice(0, 5);
    setActiveState();
    getLocationPinMain(PIN_MAIN_RADIUS, PIN_MAIN_HEIGHT);
    window.pins.showPins(sortAds);
    window.card.showCard(sortAds);
    window.filter.updateAds(ads);
  };

  var errorHandler = function (errorMessage) {
    window.form.mainElement.appendChild(window.renderMessage.renderErrorMessageMap(errorMessage));
    document.addEventListener('keydown', window.form.documentEscKeyHandler);
    document.addEventListener('click', window.form.documentClickHandler);
  };

  var disableElements = function (elements, boolean) {
    Array.from(elements).forEach(function (element) {
      element.disabled = boolean;
    });
  };

  var setActiveState = function () {
    mapElement.classList.remove('map--faded');
    window.form.adFormElement.classList.remove('ad-form--disabled');
    disableElements(fieldsetElements, false);
    disableElements(filterElements, false);
  };

  var getLocationX = function () {
    return mapPinMainElement.offsetLeft;
  };

  var getLocationY = function () {
    return mapPinMainElement.offsetTop;
  };

  var getLocationPinMain = function (width, height) {
    var pinMainLocationX = getLocationX() + width;
    var pinMainLocationY = getLocationY() + height;
    addressInputElement.value = pinMainLocationX + ', ' + pinMainLocationY;
  };

  mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var dragged = false;

    var shift = {
      x: evt.clientX - getLocationX(),
      y: evt.clientY - getLocationY()
    };

    var documentMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var left = moveEvt.clientX - shift.x;
      var top = moveEvt.clientY - shift.y;

      if (left < X_MIN) {
        left = X_MIN;
      }
      if (left > X_MAX - PIN_MAIN_WIDTH) {
        left = X_MAX - PIN_MAIN_WIDTH;
      }

      if (top < Y_MIN) {
        top = Y_MIN;
      }
      if (top > Y_MAX) {
        top = Y_MAX;
      }

      mapPinMainElement.style.left = left + 'px';
      mapPinMainElement.style.top = top + 'px';

      getLocationPinMain(PIN_MAIN_RADIUS, PIN_MAIN_HEIGHT);
    };

    var documentMouseUpHandler = function (upEvt) {
      var mapPinElements = getMapPins();
      upEvt.preventDefault();

      if (dragged && mapPinElements.length === 0) {
        window.backend.load(successHandler, errorHandler);
      }

      document.removeEventListener('mousemove', documentMouseMoveHandler);
      document.removeEventListener('mouseup', documentMouseUpHandler);
    };

    document.addEventListener('mousemove', documentMouseMoveHandler);
    document.addEventListener('mouseup', documentMouseUpHandler);
  });

  var documentEscKeyHandler = function (evt) {
    window.util.isEscEvent(evt, removeCard);
  };

  var cardCloseClickHandler = function () {
    removeCard();
  };

  var closeCard = function () {
    if (cards.length !== 0) {
      var cardCloseElement = cards[0].querySelector('.popup__close');
      cardCloseElement.addEventListener('click', cardCloseClickHandler);
    }
  };

  var getMapPins = function () {
    return document.querySelectorAll('[type=button]');
  };

  var removeCard = function () {
    if (cards.length !== 0) {
      mapElement.removeChild(cards[0]);
      cards.shift();
      document.removeEventListener('keydown', documentEscKeyHandler);
      Array.from(getMapPins()).forEach(function (pin) {
        pin.classList.remove('map__pin--active');
      });
    }
  };

  var removePins = function () {
    Array.from(getMapPins()).forEach(function (pin) {
      window.pins.mapPinsElement.removeChild(pin);
    });
  };

  var setInactiveState = function () {
    mapElement.classList.add('map--faded');
    window.form.adFormElement.classList.add('ad-form--disabled');
    removeCard();
    removePins();
    mapPinMainElement.style.left = PIN_MAIN_LEFT + 'px';
    mapPinMainElement.style.top = PIN_MAIN_TOP + 'px';
    getLocationPinMain(PIN_MAIN_RADIUS, PIN_MAIN_RADIUS);
    window.preview.removeAvatar();
    window.preview.removePhotos();
    window.filter.resetFilter();
  };

  disableElements(fieldsetElements, true);
  disableElements(filterElements, true);
  getLocationPinMain(PIN_MAIN_RADIUS, PIN_MAIN_RADIUS);

  window.map = {
    setInactiveState: setInactiveState,
    disableElements: disableElements,
    fieldsetElements: fieldsetElements,
    filterElements: filterElements,
    removePins: removePins,
    closeCard: closeCard,
    removeCard: removeCard,
    mapElement: mapElement,
    cards: cards,
    documentEscKeyHandler: documentEscKeyHandler,
    getLocationX: getLocationX,
    getLocationY: getLocationY,
    getMapPins: getMapPins
  };
})();
