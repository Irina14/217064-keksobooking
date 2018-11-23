'use strict';

var AVATAR_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

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

// var cards = [
//   {
//     author: {
//       avatar: getRandomAvatar()
//     },
//     offer: {
//       title: getRandomTitle(),
//       address: '450, 350',
//       price: Math.floor(Math.random() * 999001) + 1000,
//       type: 'palace',
//       rooms: Math.floor(Math.random() * 5) + 1,
//       guests: Math.floor(Math.random() * 10) + 1,
//       checkin: '12:00',
//       checkout: '12:00',
//       features: ['wifi', 'dishwasher', 'parking'],
//       description: '',
//       photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
//     },
//     location: {
//       x: 450,
//       y: 350
//     }
//   }
// ];
