'use strict';

var AVATAR_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_MAIN_RADIUS = 31;
var PIN_MAIN_HEIGHT = 84;
var X_MAX = 875;
var X_MIN = 275;
var Y_MAX = 630;
var Y_MIN = 130;
var PRICE_MAX = 1000000;
var PRICE_MIN = 1000;
var ROOMS_MAX = 5;
var ROOMS_MIN = 1;
var GUESTS_MAX = 10;
var GUESTS_MIN = 2;
var ESC_KEYCODE = 27;
var MIN_PRICE_BUNGALO = 0;
var MIN_PRICE_FLAT = 1000;
var MIN_PRICE_HOUSE = 5000;
var MIN_PRICE_PALACE = 10000;

var mapElement = document.querySelector('.map');
var mapPinsElement = mapElement.querySelector('.map__pins');
var mapPinMainElement = mapPinsElement.querySelector('.map__pin--main');
var mapFiltersElement = mapElement.querySelector('.map__filters-container');
var fieldsetElements = document.querySelectorAll('fieldset');
var adFormElement = document.querySelector('.ad-form');
var addressInputElement = adFormElement.querySelector('#address');
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
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var getRandomIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomAvatar = function () {
  var avatarIndex = getRandomIndex(AVATAR_NUMBERS);
  var avatarValue = AVATAR_NUMBERS[avatarIndex];
  AVATAR_NUMBERS.splice(avatarIndex, 1);
  return 'img/avatars/user' + avatarValue + '.png';
};

var getRandomTitle = function () {
  var titleIndex = getRandomIndex(TITLES);
  var titleValue = TITLES[titleIndex];
  TITLES.splice(titleIndex, 1);
  return titleValue;
};

var getRandomLocationX = function () {
  return getRandomNumber(X_MIN + PIN_WIDTH / 2, X_MAX + PIN_WIDTH / 2);
};

var getRandomLocationY = function () {
  return getRandomNumber(Y_MIN + PIN_HEIGHT, Y_MAX + PIN_HEIGHT);
};

var getRandomPrice = function () {
  return getRandomNumber(PRICE_MIN, PRICE_MAX);
};

var getRandomType = function () {
  return TYPES[getRandomIndex(TYPES)];
};

var getRandomRooms = function () {
  return getRandomNumber(ROOMS_MIN, ROOMS_MAX);
};

var getRandomGuests = function () {
  return getRandomNumber(GUESTS_MIN, GUESTS_MAX);
};

var getRandomCheckTime = function () {
  return CHECK_TIMES[getRandomIndex(CHECK_TIMES)];
};

var createArrayRandomFeatures = function () {
  var features = [];
  var length = Math.ceil(Math.random() * FEATURES.length);
  for (var i = 0; i < length; i++) {
    features.push(FEATURES[i]);
  }
  return features;
};

var shuffle = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var createArrayRandomPhotos = function () {
  var photosCopy = PHOTOS.slice();
  return shuffle(photosCopy);
};

var createRandomAd = function () {
  var locationX = getRandomLocationX();
  var locationY = getRandomLocationY();
  var ad = {
    author: {
      avatar: getRandomAvatar()
    },
    offer: {
      title: getRandomTitle(),
      address: locationX + ', ' + locationY,
      price: getRandomPrice(),
      type: getRandomType(),
      rooms: getRandomRooms(),
      guests: getRandomGuests(),
      checkin: getRandomCheckTime(),
      checkout: getRandomCheckTime(),
      features: createArrayRandomFeatures(),
      description: '',
      photos: createArrayRandomPhotos()
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return ad;
};

var createArrayRandomAds = function (length) {
  var ads = [];
  for (var i = 0; i < length; i++) {
    ads.push(createRandomAd());
  }
  return ads;
};

var renderPin = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;
  return pinElement;
};

var getType = function (type) {
  var typeValue;
  switch (type) {
    case 'flat':
      typeValue = 'Квартира';
      break;
    case 'bungalo':
      typeValue = 'Бунгало';
      break;
    case 'house':
      typeValue = 'Дом';
      break;
    default:
      typeValue = 'Дворец';
  }
  return typeValue;
};

var getRooms = function (rooms) {
  if (rooms === 1) {
    return ' комната для ';
  }
  if (rooms >= 5) {
    return ' комнат для ';
  }
  return ' комнаты для ';
};

var renderCard = function (ad) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getType(ad.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + getRooms(ad.offer.rooms) + ad.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  cardElement.querySelector('.popup__photos').querySelector('.popup__photo').src = ad.offer.photos;
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  var features = ad.offer.features;
  var featuresListElement = cardElement.querySelector('.popup__features');
  var featuresItemsElement = featuresListElement.querySelectorAll('.popup__feature');
  for (var i = 0; i < featuresItemsElement.length; i++) {
    featuresItemsElement[i].style.display = 'none';
  }

  for (var j = 0; j < features.length; j++) {
    if (features[j] === 'wifi') {
      featuresListElement.querySelector('.popup__feature--wifi').style.display = 'inline-block';
    }
    if (features[j] === 'dishwasher') {
      featuresListElement.querySelector('.popup__feature--dishwasher').style.display = 'inline-block';
    }
    if (features[j] === 'parking') {
      featuresListElement.querySelector('.popup__feature--parking').style.display = 'inline-block';
    }
    if (features[j] === 'washer') {
      featuresListElement.querySelector('.popup__feature--washer').style.display = 'inline-block';
    }
    if (features[j] === 'elevator') {
      featuresListElement.querySelector('.popup__feature--elevator').style.display = 'inline-block';
    }
    if (features[j] === 'conditioner') {
      featuresListElement.querySelector('.popup__feature--conditioner').style.display = 'inline-block';
    }
  }

  var photos = ad.offer.photos;
  var photosListElement = cardElement.querySelector('.popup__photos');
  var photosItemElement = photosListElement.querySelector('.popup__photo');
  photosListElement.innerHTML = '';
  for (i = 0; i < photos.length; i++) {
    var photoCopyElement = photosItemElement.cloneNode(true);
    photosListElement.appendChild(photoCopyElement);
    photoCopyElement.src = photos[i];
  }

  return cardElement;
};

var createArrayPins = function (arrayAds) {
  var arrayPins = [];
  for (var i = 0; i < arrayAds.length; i++) {
    arrayPins.push(renderPin(arrayAds[i]));
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

var disableFieldset = function (boolean) {
  for (var i = 0; i < fieldsetElements.length; i++) {
    fieldsetElements[i].disabled = boolean;
  }
};

var setActiveState = function () {
  mapElement.classList.remove('map--faded');
  adFormElement.classList.remove('ad-form--disabled');
  disableFieldset(false);
};

var getLocationX = function (element) {
  var box = element.getBoundingClientRect();
  return Math.round(box.left + window.pageXOffset);
};

var getLocationY = function (element) {
  var box = element.getBoundingClientRect();
  return Math.round(box.top + window.pageYOffset);
};

var getLocationPinMain = function (width, height) {
  var pinMainLocationX = getLocationX(mapPinMainElement) + width;
  var pinMainLocationY = getLocationY(mapPinMainElement) + height;
  addressInputElement.value = pinMainLocationX + ', ' + pinMainLocationY;
};

var ads = createArrayRandomAds(8);
var pins = createArrayPins(ads);
var cards = [];

var mapPinMainClickHandler = function () {
  setActiveState();
  getLocationPinMain(PIN_MAIN_RADIUS, PIN_MAIN_HEIGHT);
  mapPinsElement.appendChild(createFragmentPins(pins));
  showCard();
  mapPinMainElement.removeEventListener('click', mapPinMainClickHandler);
};

mapPinMainElement.addEventListener('click', mapPinMainClickHandler);

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
      var card = renderCard(ads[i]);
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

getCheckTime(timeinSelectElement, timeinOptionElements, timeoutOptionElements);
getCheckTime(timeoutSelectElement, timeoutOptionElements, timeinOptionElements);

typeSelectElement.addEventListener('change', typeSelectChangeHandler);
roomNumberSelectElement.addEventListener('change', roomNumberChangeHandler);

var capacitySelectCopyElement = copyCapacitySelect();
removeCapacityOptions();
appendCapacityOption(2);
