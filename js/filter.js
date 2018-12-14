'use strict';

(function () {
  var filtersElement = document.querySelector('.map__filters');
  var typeSelectElement = filtersElement.querySelector('#housing-type');
  var typeOptionElements = typeSelectElement.options;
  var priceSelectElement = filtersElement.querySelector('#housing-price');
  var roomsSelectElement = filtersElement.querySelector('#housing-rooms');
  var roomsOptionElements = roomsSelectElement.options;
  var guestsSelectElement = filtersElement.querySelector('#housing-guests');
  var mapPinsElement = document.querySelector('.map__pins');


  var updateAds = function (ads) {
    var selectChangeHandler = function () {
      for (var i = 0; i < typeOptionElements.length; i++) {
        if (typeOptionElements[i].selected) {
          var type = typeOptionElements[i].value;
        }
      }
      for (i = 0; i < roomsOptionElements.length; i++) {
        if (roomsOptionElements[i].selected) {
          var rooms = roomsOptionElements[i].value;
        }
      }

      if (type !== 'any' && rooms === 'any') {
        var filterAds = ads.filter(function (ad) {
          return ad.offer.type === type;
        });
        window.map.removePins();
        window.pins.showPins(filterAds);
        window.showCard(filterAds);
      }

      if (type === 'any' && rooms !== 'any') {
        filterAds = ads.filter(function (ad) {
          return ad.offer.rooms === parseInt(rooms, 10);
        });
        window.map.removePins();
        window.pins.showPins(filterAds);
        window.showCard(filterAds);
      }

      if (type !== 'any' && rooms !== 'any') {
        filterAds = ads.filter(function (ad) {
          return ad.offer.type === type && ad.offer.rooms === parseInt(rooms, 10);
        });
        window.map.removePins();
        window.pins.showPins(filterAds);
        window.showCard(filterAds);
      }

      if (type === 'any' && rooms === 'any') {
        window.map.removePins();
        window.pins.showPins(ads);
        window.showCard(ads);
      }
    };

    typeSelectElement.addEventListener('change', selectChangeHandler);
    roomsSelectElement.addEventListener('change', selectChangeHandler);
  };

  window.filter = {
    updateAds: updateAds
  };
})();
