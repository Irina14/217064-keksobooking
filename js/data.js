'use strict';

(function () {
  var AVATAR_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var X_MAX_PIN = 875;
  var X_MIN_PIN = 275;
  var Y_MAX_PIN = 630;
  var Y_MIN_PIN = 130;
  var PRICE_MAX = 1000000;
  var PRICE_MIN = 1000;
  var ROOMS_MAX = 5;
  var ROOMS_MIN = 1;
  var GUESTS_MAX = 10;
  var GUESTS_MIN = 2;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

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
    return getRandomNumber(X_MIN_PIN + PIN_WIDTH / 2, X_MAX_PIN + PIN_WIDTH / 2);
  };

  var getRandomLocationY = function () {
    return getRandomNumber(Y_MIN_PIN + PIN_HEIGHT, Y_MAX_PIN + PIN_HEIGHT);
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

  window.data = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    createRandomAd: createRandomAd
  };
})();
