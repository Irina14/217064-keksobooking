'use strict';

var cards = [
  {
    author: {
      avatar: 'img/avatars/user01.png'
    },
    offer: {
      title: 'Большая уютная квартира',
      address: '600, 350',
      price: Math.floor(Math.random() * 999001) + 1000,
      type: 'palace',
      rooms: Math.floor(Math.random() * 5) + 1,
      guests: Math.floor(Math.random() * 10) + 1,
      checkin: '12:00',
      checkout: '12:00',
      features: ['wifi', 'dishwasher', 'parking'],
      description: '',
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    location: {
      x: 4,
      y: Math.floor(Math.random() * 501) + 130
    }
  }
];
