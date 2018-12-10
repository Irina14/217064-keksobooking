'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

  window.renderCard = function (ad) {
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
})();
