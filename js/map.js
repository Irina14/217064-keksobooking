'use strict';

(function () {
  var PIN_MAIN_RADIUS = 31;
  var PIN_MAIN_HEIGHT = 84;
  var X_MAX = 1200;
  var X_MIN = 0;
  var Y_MAX = 630;
  var Y_MIN = 130;
  var ESC_KEYCODE = 27;

  var mapElement = document.querySelector('.map');
  var mapPinsElement = mapElement.querySelector('.map__pins');
  var mapPinMainElement = mapPinsElement.querySelector('.map__pin--main');
  var mapFiltersElement = mapElement.querySelector('.map__filters-container');
  var fieldsetElements = document.querySelectorAll('fieldset');
  var addressInputElement = window.form.adFormElement.querySelector('#address');

  var createArrayRandomAds = function (length) {
    var ads = [];
    for (var i = 0; i < length; i++) {
      ads.push(window.data.createRandomAd());
    }
    return ads;
  };

  var createArrayPins = function (arrayAds) {
    var arrayPins = [];
    for (var i = 0; i < arrayAds.length; i++) {
      arrayPins.push(window.renderPin(arrayAds[i]));
    }
    return arrayPins;
  };

  var createFragmentPins = function (arrayPins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrayPins.length; i++) {
      fragment.appendChild(arrayPins[i]);
    }
    return fragment;
  };

  var ads = createArrayRandomAds(8);
  var pins = createArrayPins(ads);
  var cards = [];

  var disableFieldset = function (boolean) {
    for (var i = 0; i < fieldsetElements.length; i++) {
      fieldsetElements[i].disabled = boolean;
    }
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
      upEvt.preventDefault();

      if (dragged) {
        setActiveState();
        getLocationPinMain(PIN_MAIN_RADIUS, PIN_MAIN_HEIGHT);
        mapPinsElement.appendChild(createFragmentPins(pins));
        showCard();
      }

      document.removeEventListener('mousemove', documentMouseMoveHandler);
      document.removeEventListener('mouseup', documentMouseUpHandler);
    };

    document.addEventListener('mousemove', documentMouseMoveHandler);
    document.addEventListener('mouseup', documentMouseUpHandler);
  });

  var showCard = function () {
    mapPinsElement.addEventListener('click', mapPinsClickHandler);
  };

  var closeCard = function () {
    if (cards.length !== 0) {
      var cardCloseElement = cards[0].querySelector('.popup__close');
      cardCloseElement.addEventListener('click', cardCloseClickHandler);
    }
  };

  var mapPinsClickHandler = function (evt) {
    removeCard();
    var target = evt.target;
    for (var i = 0; i < pins.length; i++) {
      if (pins[i] === target.parentElement || pins[i] === target) {
        var card = window.renderCard(ads[i]);
        mapElement.insertBefore(card, mapFiltersElement);
        cards.push(card);
      }
    }
    document.addEventListener('keydown', cardEscKeyHandler);
    closeCard();
  };

  var cardEscKeyHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removeCard();
    }
  };

  var cardCloseClickHandler = function () {
    removeCard();
  };

  var removeCard = function () {
    if (cards.length !== 0) {
      mapElement.removeChild(cards[0]);
      cards.shift();
      document.removeEventListener('keydown', cardEscKeyHandler);
    }
  };

  disableFieldset(true);
  getLocationPinMain(PIN_MAIN_RADIUS, PIN_MAIN_RADIUS);
  addressInputElement.disabled = true;
})();
