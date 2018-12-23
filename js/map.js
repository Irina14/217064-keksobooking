'use strict';

(function () {
  var PIN_MAIN_RADIUS = 31;
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
  var addressInputElement = window.form.adFormElement.querySelector('#address');
  var cards = [];

  var successHandler = function (data) {
    var loadAds = data;
    var ads = window.getSortAds(loadAds).slice(0, 5);
    setActiveState();
    getLocationPinMain(PIN_MAIN_RADIUS, PIN_MAIN_HEIGHT);
    window.pins.showPins(ads);
    window.card.showCard(ads);
    window.filter.updateAds(ads);
  };

  var errorHandler = function (errorMessage) {
    window.form.mainElement.appendChild(window.renderMessage.renderErrorMessageMap(errorMessage));
  };

  var disableFieldset = function (boolean) {
    Array.from(fieldsetElements).forEach(function (fieldset) {
      fieldset.disabled = boolean;
    });
  };

  var setActiveState = function () {
    mapElement.classList.remove('map--faded');
    window.form.adFormElement.classList.remove('ad-form--disabled');
    disableFieldset(false);
  };

  var getLocationX = function () {
    var x = mapPinMainElement.offsetLeft;
    if (x < X_MIN) {
      x = X_MIN;
    }
    if (x > X_MAX - PIN_MAIN_RADIUS * 2) {
      x = X_MAX - PIN_MAIN_RADIUS * 2;
    }
    return x;
  };

  var getLocationY = function () {
    var y = mapPinMainElement.offsetTop;
    if (y < Y_MIN) {
      y = Y_MIN;
    }
    if (y > Y_MAX) {
      y = Y_MAX;
    }
    return y;
  };

  var getLocationPinMain = function (width, height) {
    var pinMainLocationX = getLocationX() + width;
    var pinMainLocationY = getLocationY() + height;
    addressInputElement.value = pinMainLocationX + ', ' + pinMainLocationY;
  };

  mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var documentMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      if (shift.x !== 0 && shift.y !== 0) {
        dragged = true;
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMainElement.style.left = (getLocationX() - shift.x) + 'px';
      mapPinMainElement.style.top = (getLocationY() - shift.y) + 'px';

      getLocationPinMain(PIN_MAIN_RADIUS, PIN_MAIN_HEIGHT);
    };

    var documentMouseUpHandler = function (upEvt) {
      var mapPinElements = mapElement.querySelectorAll('[type=button]');
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
    var mapPinElements = document.querySelectorAll('[type=button]');
    return mapPinElements;
  };

  var removeCard = function () {
    if (cards.length !== 0) {
      mapElement.removeChild(cards[0]);
      cards.shift();
      document.removeEventListener('keydown', documentEscKeyHandler);
      Array.from(getMapPins()).forEach(function (mapPin) {
        mapPin.classList.remove('map__pin--active');
      });
    }
  };

  var removePins = function () {
    Array.from(getMapPins()).forEach(function (mapPin) {
      window.pins.mapPinsElement.removeChild(mapPin);
    });
  };

  var setInactiveState = function () {
    mapElement.classList.add('map--faded');
    window.form.adFormElement.classList.add('ad-form--disabled');
    removeCard();
    removePins();
    mapPinMainElement.style.left = PIN_MAIN_LEFT + 'px';
    mapPinMainElement.style.top = PIN_MAIN_TOP + 'px';
    getLocationPinMain(PIN_MAIN_RADIUS, PIN_MAIN_HEIGHT);
  };

  disableFieldset(true);
  getLocationPinMain(PIN_MAIN_RADIUS, PIN_MAIN_RADIUS);

  window.map = {
    setInactiveState: setInactiveState,
    disableFieldset: disableFieldset,
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
