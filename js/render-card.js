'use strict';

(function () {
  var ValueTypeHousing = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец',
  };

  var RoomNumber = {
    ONE: 1,
    FIVE: 5
  };

  var Feature = {
    WIFI: 'wifi',
    DISHWASHER: 'dishwasher',
    PARKING: 'parking',
    WASHER: 'washer',
    ELEVATOR: 'elevator',
    CONDITIONER: 'conditioner'
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var getType = function (type) {
    var typeValue;
    switch (type) {
      case window.form.TypeHousing.FLAT:
        typeValue = ValueTypeHousing.FLAT;
        break;
      case window.form.TypeHousing.BUNGALO:
        typeValue = ValueTypeHousing.BUNGALO;
        break;
      case window.form.TypeHousing.HOUSE:
        typeValue = ValueTypeHousing.HOUSE;
        break;
      default:
        typeValue = ValueTypeHousing.PALACE;
    }
    return typeValue;
  };

  var getRooms = function (rooms) {
    if (rooms === RoomNumber.ONE) {
      return ' комната для ';
    }
    if (rooms >= RoomNumber.FIVE) {
      return ' комнат для ';
    }
    return ' комнаты для ';
  };

  window.renderCard = function (ad) {
    var cardElement = cardTemplate.cloneNode(true);
    var featuresListElement = cardElement.querySelector('.popup__features');
    var featuresItemElements = featuresListElement.querySelectorAll('.popup__feature');
    var photosListElement = cardElement.querySelector('.popup__photos');
    var photosItemElement = photosListElement.querySelector('.popup__photo');

    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getType(ad.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + getRooms(ad.offer.rooms) + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkout;

    if (ad.offer.description !== '') {
      cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    } else {
      cardElement.querySelector('.popup__description').style.display = 'none';
    }

    if (ad.author.avatar !== '') {
      cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
    } else {
      cardElement.querySelector('.popup__avatar').src = 'img/avatars/default.png';
    }

    var features = ad.offer.features;

    if (features.length !== 0) {
      Array.from(featuresItemElements).forEach(function (item) {
        item.style.display = 'none';
      });

      features.forEach(function (feature) {
        if (feature === Feature.WIFI) {
          featuresListElement.querySelector('.popup__feature--wifi').style.display = 'inline-block';
        }
        if (feature === Feature.DISHWASHER) {
          featuresListElement.querySelector('.popup__feature--dishwasher').style.display = 'inline-block';
        }
        if (feature === Feature.PARKING) {
          featuresListElement.querySelector('.popup__feature--parking').style.display = 'inline-block';
        }
        if (feature === Feature.WASHER) {
          featuresListElement.querySelector('.popup__feature--washer').style.display = 'inline-block';
        }
        if (feature === Feature.ELEVATOR) {
          featuresListElement.querySelector('.popup__feature--elevator').style.display = 'inline-block';
        }
        if (feature === Feature.CONDITIONER) {
          featuresListElement.querySelector('.popup__feature--conditioner').style.display = 'inline-block';
        }
      });
    } else {
      featuresListElement.style.display = 'none';
    }

    var photos = ad.offer.photos;

    if (photos.length !== 0) {
      photosListElement.innerHTML = '';
      photos.forEach(function (photo) {
        var photoCopyElement = photosItemElement.cloneNode(true);
        photosListElement.appendChild(photoCopyElement);
        photoCopyElement.src = photo;
      });
    } else {
      photosListElement.style.display = 'none';
    }
    return cardElement;
  };
})();
