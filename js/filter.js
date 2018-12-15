'use strict';

(function () {
  var filtersElement = document.querySelector('.map__filters');
  var typeSelectElement = filtersElement.querySelector('#housing-type');
  var typeOptionElements = typeSelectElement.options;
  var priceSelectElement = filtersElement.querySelector('#housing-price');
  var priceOptionElements = priceSelectElement.options;
  var roomsSelectElement = filtersElement.querySelector('#housing-rooms');
  var roomsOptionElements = roomsSelectElement.options;
  var guestsSelectElement = filtersElement.querySelector('#housing-guests');
  var mapPinsElement = document.querySelector('.map__pins');


  var updateAds = function (ads) {
    var showPinsAndCard = function (arrayAds) {
      window.map.removePins();
      window.pins.showPins(arrayAds);
      window.showCard(arrayAds);
    };

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
      for (i = 0; i < priceOptionElements.length; i++) {
        if (priceOptionElements[i].selected) {
          var price = priceOptionElements[i].value;
        }
      }

      var filterType = ads.filter(function (ad) {
        return ad.offer.type === type;
      });

      var filterPrice = ads.filter(function (ad) {
        var result;
        if (price === 'low') {
          result = ad.offer.price < 10000;
        }
        if (price === 'middle') {
          result = ad.offer.price >= 10000 && ad.offer.price < 50000;
        }
        if (price === 'high') {
          result = ad.offer.price >= 50000;
        }
        return result;
      });

      var filterRooms = ads.filter(function (ad) {
        return ad.offer.rooms === parseInt(rooms, 10);
      });

      var filterTypeAndRooms = ads.filter(function (ad) {
        return ad.offer.type === type && ad.offer.rooms === parseInt(rooms, 10);
      });

      var filterTypeAndPrice = ads.filter(function (ad) {
        var result;
        if (price === 'low') {
          result = ad.offer.price < 10000;
        }
        if (price === 'middle') {
          result = ad.offer.price >= 10000 && ad.offer.price < 50000;
        }
        if (price === 'high') {
          result = ad.offer.price >= 50000;
        }
        return result && ad.offer.type === type;
      });

      var filterPriceAndRooms = ads.filter(function (ad) {
        var result;
        if (price === 'low') {
          result = ad.offer.price < 10000;
        }
        if (price === 'middle') {
          result = ad.offer.price >= 10000 && ad.offer.price < 50000;
        }
        if (price === 'high') {
          result = ad.offer.price >= 50000;
        }
        return result && ad.offer.rooms === parseInt(rooms, 10);
      });

      var filterTypeAndPriceAndRooms = ads.filter(function (ad) {
        var result;
        if (price === 'low') {
          result = ad.offer.price < 10000;
        }
        if (price === 'middle') {
          result = ad.offer.price >= 10000 && ad.offer.price < 50000;
        }
        if (price === 'high') {
          result = ad.offer.price >= 50000;
        }
        return result && ad.offer.type === type && ad.offer.rooms === parseInt(rooms, 10);
      });

      if (type === 'any' && price !== 'any' && rooms === 'any') {
        var filterAds = filterPrice;
        showPinsAndCard(filterAds);
      }

      if (type !== 'any' && price === 'any' && rooms === 'any') {
        filterAds = filterType;
        showPinsAndCard(filterAds);
      }

      if (type === 'any' && price === 'any' && rooms !== 'any') {
        filterAds = filterRooms;
        showPinsAndCard(filterAds);
      }

      if (type !== 'any' && price !== 'any' && rooms === 'any') {
        filterAds = filterTypeAndPrice;
        showPinsAndCard(filterAds);
      }

      if (type !== 'any' && price === 'any' && rooms !== 'any') {
        filterAds = filterTypeAndRooms;
        showPinsAndCard(filterAds);
      }

      if (type === 'any' && price !== 'any' && rooms !== 'any') {
        filterAds = filterPriceAndRooms;
        showPinsAndCard(filterAds);
      }

      if (type !== 'any' && price !== 'any' && rooms !== 'any') {
        filterAds = filterTypeAndPriceAndRooms;
        showPinsAndCard(filterAds);
      }

      if (type === 'any' && price === 'any' && rooms === 'any') {
        showPinsAndCard(ads);
      }
    };

    typeSelectElement.addEventListener('change', selectChangeHandler);
    roomsSelectElement.addEventListener('change', selectChangeHandler);
    priceSelectElement.addEventListener('change', selectChangeHandler);
  };

  window.filter = {
    updateAds: updateAds
  };
})();
