'use strict';

(function () {
  var PRICE_UNIT = '₽/ночь';
  var ONE_GUEST = 1;

  var ValueTypeHousing = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };

  var RoomsNumber = {
    ZERO: 0,
    ONE: 1,
    FIVE: 5
  };

  var RoomsText = {
    ONE: ' комната для ',
    FIVE: ' комнат для ',
    OTHER: ' комнаты для '
  };

  var GuestsText = {
    ONE: ' гостя',
    OTHER: ' гостей'
  };

  var TimeText = {
    CHECK_IN: 'Заезд после ',
    CHECK_OUT: ' выезд до '
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

  var getRoomsText = function (rooms) {
    if (rooms === RoomsNumber.ONE) {
      return RoomsText.ONE;
    }
    if (rooms === RoomsNumber.ZERO || rooms >= RoomsNumber.FIVE) {
      return RoomsText.FIVE;
    }
    return RoomsText.OTHER;
  };

  var getGuestsText = function (guests) {
    return guests === ONE_GUEST ? GuestsText.ONE : GuestsText.OTHER;
  };

  window.renderCard = function (ad) {
    var cardElement = cardTemplate.cloneNode(true);
    var featuresListElement = cardElement.querySelector('.popup__features');
    var featuresItemElements = featuresListElement.querySelectorAll('.popup__feature');
    var photosListElement = cardElement.querySelector('.popup__photos');
    var photosItemElement = photosListElement.querySelector('.popup__photo');

    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + PRICE_UNIT;
    cardElement.querySelector('.popup__type').textContent = getType(ad.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + getRoomsText(ad.offer.rooms) + ad.offer.guests + getGuestsText(ad.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = TimeText.CHECK_IN + ad.offer.checkin + TimeText.CHECK_OUT + ad.offer.checkout;

    if (ad.offer.description !== '') {
      cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    } else {
      cardElement.querySelector('.popup__description').style.display = 'none';
    }

    if (ad.author.avatar !== '') {
      cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
    } else {
      cardElement.querySelector('.popup__avatar').src = window.pin.IMAGE_AVATAR;
    }

    var features = ad.offer.features;

    if (features.length !== 0) {
      Array.from(featuresItemElements).forEach(function (item) {
        item.style.display = 'none';
      });

      Array.from(featuresItemElements).forEach(function (item) {
        var itemClass = item.classList;
        features.forEach(function (feature) {
          if (itemClass.contains('popup__feature--' + feature)) {
            item.style.display = 'inline-block';
          }
        });
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
