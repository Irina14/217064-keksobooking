'use strict';

var AVATAR_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = map.querySelector('.map__pins');
var mapFilters = map.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var getRandomAvatar = function () {
  var avatarIndex = Math.floor(Math.random() * AVATAR_NUMBERS.length);
  var avatarValue = AVATAR_NUMBERS[avatarIndex];
  AVATAR_NUMBERS.splice(avatarIndex, 1);
  return 'img/avatars/user' + avatarValue + '.png';
};

var getRandomTitle = function () {
  var titleIndex = Math.floor(Math.random() * TITLES.length);
  var titleValue = TITLES[titleIndex];
  TITLES.splice(titleIndex, 1);
  return titleValue;
};

var getRandomLocationX = function () {
  return Math.floor(Math.random() * ((X_MAX + PIN_WIDTH / 2) - (X_MIN + PIN_WIDTH / 2) + 1)) + X_MIN + PIN_WIDTH / 2;
};

var getRandomLocationY = function () {
  return Math.floor(Math.random() * ((Y_MAX + PIN_HEIGHT) - (Y_MIN + PIN_HEIGHT) + 1)) + Y_MIN + PIN_HEIGHT;
};

var getRandomPrice = function () {
  return Math.floor(Math.random() * (PRICE_MAX - PRICE_MIN + 1)) + PRICE_MIN;
};

var getRandomType = function () {
  return TYPES[Math.floor(Math.random() * TYPES.length)];
};

var getRandomRooms = function () {
  return Math.floor(Math.random() * (ROOMS_MAX - ROOMS_MIN + 1)) + ROOMS_MIN;
};

var getRandomGuests = function () {
  return Math.floor(Math.random() * (GUESTS_MAX - GUESTS_MIN + 1)) + GUESTS_MIN;
};

var getRandomCheckTime = function () {
  return CHECK_TIMES[Math.floor(Math.random() * CHECK_TIMES.length)];
};

var createArrayRandomFeatures = function () {
  var features = [];
  var length = Math.ceil(Math.random() * FEATURES.length);
  for (var i = 0; i < length; i++) {
    features.push(FEATURES[i]);
  }
  return features;
};

var createArrayRandomPhotos = function () {
  var photos = [];
  var photosCopy = PHOTOS.slice();
  for (var i = 0; i < PHOTOS.length; i++) {
    var photoIndex = Math.floor(Math.random() * photosCopy.length);
    photos.push(photosCopy[photoIndex]);
    photosCopy.splice(photoIndex, 1);
  }
  return photos;
};

var createRandomNotice = function () {
  var locationX = getRandomLocationX();
  var locationY = getRandomLocationY();
  var randomNotice = {
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
  return randomNotice;
};

var createArrayRandomNotices = function (length) {
  var randomNotices = [];
  for (var i = 0; i < length; i++) {
    randomNotices.push(createRandomNotice());
  }
  return randomNotices;
};

var notices = createArrayRandomNotices(8);

var renderPin = function (notice) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = notice.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = notice.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = notice.author.avatar;
  pinElement.querySelector('img').alt = notice.offer.title;
  return pinElement;
};

var fragmentPins = document.createDocumentFragment();
for (var i = 0; i < notices.length; i++) {
  fragmentPins.appendChild(renderPin(notices[i]));
}
mapPins.appendChild(fragmentPins);

var getType = function (type) {
  if (type === 'flat') {
    return 'Квартира';
  }
  if (type === 'bungalo') {
    return 'Бунгало';
  }
  if (type === 'house') {
    return 'Дом';
  }
  return 'Дворец';
};

var getRooms = function (rooms) {
  if (rooms === 1) {
    return ' комната для ';
  }
  if (rooms === 5) {
    return ' комнат для ';
  }
  return ' комнаты для ';
};

var renderCard = function (notice) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = notice.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = notice.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = notice.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getType(notice.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = notice.offer.rooms + getRooms(notice.offer.rooms) + notice.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + notice.offer.checkin + ' выезд до ' + notice.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = notice.offer.description;
  cardElement.querySelector('.popup__photos').querySelector('.popup__photo').src = notice.offer.photos;
  cardElement.querySelector('.popup__avatar').src = notice.author.avatar;

  var featuresList = cardElement.querySelector('.popup__features');
  var features = notice.offer.features;
  var featuresItems = featuresList.querySelectorAll('.popup__feature');
  for (var j = 0; j < featuresItems.length; j++) {
    featuresItems[j].style.display = 'none';
  }
  for (var i = 0; i < features.length; i++) {
    if (features[i] === 'wifi') {
      featuresList.querySelector('.popup__feature--wifi').style.display = 'inline-block';
    }
    if (features[i] === 'dishwasher') {
      featuresList.querySelector('.popup__feature--dishwasher').style.display = 'inline-block';
    }
    if (features[i] === 'parking') {
      featuresList.querySelector('.popup__feature--parking').style.display = 'inline-block';
    }
    if (features[i] === 'washer') {
      featuresList.querySelector('.popup__feature--washer').style.display = 'inline-block';
    }
    if (features[i] === 'elevator') {
      featuresList.querySelector('.popup__feature--elevator').style.display = 'inline-block';
    }
    if (features[i] === 'conditioner') {
      featuresList.querySelector('.popup__feature--conditioner').style.display = 'inline-block';
    }
  }
  return cardElement;
};

var fragmentCards = document.createDocumentFragment();
for (i = 0; i < notices.length; i++) {
  fragmentCards.appendChild(renderCard(notices[i]));
}
map.insertBefore(fragmentCards, mapFilters);
