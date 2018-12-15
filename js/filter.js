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
  var guestsOptionElements = guestsSelectElement.options;
  var featuresElement = document.querySelector('.map__features');
  var featuresInputElements = featuresElement.querySelectorAll('.map__checkbox');

  var updateAds = function (ads) {
    var showPinsAndCard = function (arrayAds) {
      window.map.removePins();
      window.pins.showPins(arrayAds);
      window.showCard(arrayAds);
    };

    var selectChangeHandler = function () {
      var features = [];

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
      for (i = 0; i < guestsOptionElements.length; i++) {
        if (guestsOptionElements[i].selected) {
          var guests = guestsOptionElements[i].value;
        }
      }
      for (i = 0; i < featuresInputElements.length; i++) {
        if (featuresInputElements[i].checked) {
          features.push(featuresInputElements[i].value);
        }
      }

      if (type !== 'any' && price === 'any' && rooms === 'any' && guests === 'any' && features.length === 0) {
        var filterAds = ads.filter(function (ad) {
          return ad.offer.type === type;
        });
      }

      if (type === 'any' && price !== 'any' && rooms === 'any' && guests === 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
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
      }

      if (type === 'any' && price === 'any' && rooms !== 'any' && guests === 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return ad.offer.rooms === parseInt(rooms, 10);
        });
      }

      if (type === 'any' && price === 'any' && rooms === 'any' && guests !== 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return ad.offer.guests === parseInt(guests, 10);
        });
      }

      if (type !== 'any' && price !== 'any' && rooms === 'any' && guests === 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
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
      }

      if (type !== 'any' && price === 'any' && rooms !== 'any' && guests === 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return ad.offer.type === type && ad.offer.rooms === parseInt(rooms, 10);
        });
      }

      if (type !== 'any' && price === 'any' && rooms === 'any' && guests !== 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return ad.offer.type === type && ad.offer.guests === parseInt(guests, 10);
        });
      }

      if (type === 'any' && price === 'any' && rooms !== 'any' && guests !== 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return ad.offer.rooms === parseInt(rooms, 10) && ad.offer.guests === parseInt(guests, 10);
        });
      }

      if (type === 'any' && price !== 'any' && rooms !== 'any' && guests === 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
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
      }

      if (type === 'any' && price !== 'any' && rooms === 'any' && guests !== 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
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
          return result && ad.offer.guests === parseInt(guests, 10);
        });
      }

      if (type !== 'any' && price !== 'any' && rooms !== 'any' && guests === 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
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
      }

      if (type !== 'any' && price !== 'any' && rooms === 'any' && guests !== 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
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
          return result && ad.offer.type === type && ad.offer.guests === parseInt(guests, 10);
        });
      }

      if (type === 'any' && price !== 'any' && rooms !== 'any' && guests !== 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
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
          return result && ad.offer.rooms === parseInt(rooms, 10) && ad.offer.guests === parseInt(guests, 10);
        });
      }

      if (type !== 'any' && price === 'any' && rooms !== 'any' && guests !== 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return ad.offer.type === type && ad.offer.rooms === parseInt(rooms, 10) && ad.offer.guests === parseInt(guests, 10);
        });
      }

      if (type !== 'any' && price !== 'any' && rooms !== 'any' && guests !== 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
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
          return result && ad.offer.type === type && ad.offer.rooms === parseInt(rooms, 10) && ad.offer.guests === parseInt(guests, 10);
        });
      }

      if (type === 'any' && price === 'any' && rooms === 'any' && guests === 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return ad.offer.features.sort().toString() === features.sort().toString();
        });
      }

      if (type !== 'any' && price === 'any' && rooms === 'any' && guests === 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return ad.offer.type === type && ad.offer.features.sort().toString() === features.sort().toString();
        });
      }

      if (type === 'any' && price !== 'any' && rooms === 'any' && guests === 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
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
          return result && ad.offer.features.sort().toString() === features.sort().toString();
        });
      }

      if (type === 'any' && price === 'any' && rooms !== 'any' && guests === 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return ad.offer.rooms === parseInt(rooms, 10) && ad.offer.features.sort().toString() === features.sort().toString();
        });
      }

      if (type === 'any' && price === 'any' && rooms === 'any' && guests !== 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return ad.offer.guests === parseInt(guests, 10) && ad.offer.features.sort().toString() === features.sort().toString();
        });
      }

      if (type !== 'any' && price !== 'any' && rooms === 'any' && guests === 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
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
          return result && ad.offer.type === type && ad.offer.features.sort().toString() === features.sort().toString();
        });
      }

      if (type === 'any' && price !== 'any' && rooms !== 'any' && guests === 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
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
          return result && ad.offer.rooms === parseInt(rooms, 10) && ad.offer.features.sort().toString() === features.sort().toString();
        });
      }

      if (type === 'any' && price === 'any' && rooms !== 'any' && guests !== 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return ad.offer.rooms === parseInt(rooms, 10) && ad.offer.guests === parseInt(guests, 10) && ad.offer.features.sort().toString() === features.sort().toString();
        });
      }

      if (type !== 'any' && price === 'any' && rooms !== 'any' && guests === 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return ad.offer.type === type && ad.offer.rooms === parseInt(rooms, 10) && ad.offer.features.sort().toString() === features.sort().toString();
        });
      }

      if (type !== 'any' && price === 'any' && rooms === 'any' && guests !== 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return ad.offer.type === type && ad.offer.guests === parseInt(guests, 10) && ad.offer.features.sort().toString() === features.sort().toString();
        });
      }

      if (type !== 'any' && price !== 'any' && rooms !== 'any' && guests === 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
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
          return result && ad.offer.type === type && ad.offer.rooms === parseInt(rooms, 10) && ad.offer.features.sort().toString() === features.sort().toString();
        });
      }

      if (type === 'any' && price !== 'any' && rooms !== 'any' && guests !== 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
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
          return result && ad.offer.rooms === parseInt(rooms, 10) && ad.offer.guests === parseInt(guests, 10) && ad.offer.features.sort().toString() === features.sort().toString();
        });
      }

      if (type !== 'any' && price === 'any' && rooms !== 'any' && guests !== 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return ad.offer.type === type && ad.offer.rooms === parseInt(rooms, 10) && ad.offer.guests === parseInt(guests, 10) && ad.offer.features.sort().toString() === features.sort().toString();
        });
      }

      if (type !== 'any' && price !== 'any' && rooms === 'any' && guests !== 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
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
          return result && ad.offer.type === type && ad.offer.guests === parseInt(guests, 10) && ad.offer.features.sort().toString() === features.sort().toString();
        });
      }

      if (type !== 'any' && price !== 'any' && rooms !== 'any' && guests !== 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
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
          return result && ad.offer.type === type && ad.offer.rooms === parseInt(rooms, 10) && ad.offer.guests === parseInt(guests, 10) && ad.offer.features.sort().toString() === features.sort().toString();
        });
      }

      if (type === 'any' && price === 'any' && rooms === 'any' && guests === 'any' && features.length === 0) {
        filterAds = ads;
      }

      showPinsAndCard(filterAds);
    };

    typeSelectElement.addEventListener('change', selectChangeHandler);
    roomsSelectElement.addEventListener('change', selectChangeHandler);
    priceSelectElement.addEventListener('change', selectChangeHandler);
    guestsSelectElement.addEventListener('change', selectChangeHandler);
    featuresElement.addEventListener('change', selectChangeHandler);
  };

  window.filter = {
    updateAds: updateAds
  };
})();
