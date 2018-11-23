'use strict';

var AVATAR_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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
  return Math.floor(Math.random() * 601) + 300;
};

var getRandomLocationY = function () {
  return Math.floor(Math.random() * 501) + 130;
};

var getRandomPrice = function () {
  return Math.floor(Math.random() * 999001) + 1000;
};

var getRandomType = function () {
  return TYPES[Math.floor(Math.random() * TYPES.length)];
};

var getRandomRooms = function () {
  return Math.floor(Math.random() * 5) + 1;
};

var getRandomGuests = function () {
  return Math.floor(Math.random() * 10) + 1;
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
  for (var i = 0; i < 3; i++) {
    var photoIndex = Math.floor(Math.random() * PHOTOS.length);
    photos.push(PHOTOS[photoIndex]);
    PHOTOS.splice(photoIndex, 1);
  }
  return photos;
};

var cards = [
  {
    author: {
      avatar: getRandomAvatar()
    },
    offer: {
      title: getRandomTitle(),
      address: getRandomLocationX() + ', ' + getRandomLocationY(),
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
      x: getRandomLocationX(),
      y: getRandomLocationY()
    }
  }
];
