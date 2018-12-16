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
    var filterChangeHandler = function () {
      var showPinsAndCard = function (arrayAds) {
        window.map.removeCard();
        window.map.removePins();
        window.pins.showPins(arrayAds);
        window.showCard(arrayAds);
      };

      var getValueOption = function (optionElements) {
        for (var i = 0; i < optionElements.length; i++) {
          if (optionElements[i].selected) {
            var value = optionElements[i].value;
          }
        }
        return value;
      };

      var getValueFeatures = function () {
        var value = [];
        for (var i = 0; i < featuresInputElements.length; i++) {
          if (featuresInputElements[i].checked) {
            value.push(featuresInputElements[i].value);
          }
        }
        return value;
      };

      var filterType = function (ad) {
        return ad.offer.type === type;
      };

      var filterPrice = function (ad) {
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
      };

      var filterRooms = function (ad) {
        return ad.offer.rooms === parseInt(rooms, 10);
      };

      var filterGuests = function (ad) {
        return ad.offer.guests === parseInt(guests, 10);
      };

      var filterFeatures = function (ad) {
        for (var i = 0; i < features.length; i++) {
          if (ad.offer.features.includes(features[i])) {
            var result = true;
          } else {
            result = false;
            break;
          }
        }
        return result;
      };

      var type = getValueOption(typeOptionElements);
      var rooms = getValueOption(roomsOptionElements);
      var price = getValueOption(priceOptionElements);
      var guests = getValueOption(guestsOptionElements);
      var features = getValueFeatures();

      if (type !== 'any' && price === 'any' && rooms === 'any' && guests === 'any' && features.length === 0) {
        var filterAds = ads.filter(function (ad) {
          return filterType(ad);
        });
      }

      if (type === 'any' && price !== 'any' && rooms === 'any' && guests === 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterPrice(ad);
        });
      }

      if (type === 'any' && price === 'any' && rooms !== 'any' && guests === 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterRooms(ad);
        });
      }

      if (type === 'any' && price === 'any' && rooms === 'any' && guests !== 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterGuests(ad);
        });
      }

      if (type !== 'any' && price !== 'any' && rooms === 'any' && guests === 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterPrice(ad);
        });
      }

      if (type !== 'any' && price === 'any' && rooms !== 'any' && guests === 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterRooms(ad);
        });
      }

      if (type !== 'any' && price === 'any' && rooms === 'any' && guests !== 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterGuests(ad);
        });
      }

      if (type === 'any' && price === 'any' && rooms !== 'any' && guests !== 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterRooms(ad) && filterGuests(ad);
        });
      }

      if (type === 'any' && price !== 'any' && rooms !== 'any' && guests === 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterPrice(ad) && filterRooms(ad);
        });
      }

      if (type === 'any' && price !== 'any' && rooms === 'any' && guests !== 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterPrice(ad) && filterGuests(ad);
        });
      }

      if (type !== 'any' && price !== 'any' && rooms !== 'any' && guests === 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterPrice(ad) && filterRooms(ad);
        });
      }

      if (type !== 'any' && price !== 'any' && rooms === 'any' && guests !== 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterPrice(ad) && filterGuests(ad);
        });
      }

      if (type === 'any' && price !== 'any' && rooms !== 'any' && guests !== 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterPrice(ad) && filterRooms(ad) && filterGuests(ad);
        });
      }

      if (type !== 'any' && price === 'any' && rooms !== 'any' && guests !== 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterRooms(ad) && filterGuests(ad);
        });
      }

      if (type !== 'any' && price !== 'any' && rooms !== 'any' && guests !== 'any' && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterPrice(ad) && filterRooms(ad) && filterGuests(ad);
        });
      }

      if (type === 'any' && price === 'any' && rooms === 'any' && guests === 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterFeatures(ad);
        });
      }

      if (type !== 'any' && price === 'any' && rooms === 'any' && guests === 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterFeatures(ad);
        });
      }

      if (type === 'any' && price !== 'any' && rooms === 'any' && guests === 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterPrice(ad) && filterFeatures(ad);
        });
      }

      if (type === 'any' && price === 'any' && rooms !== 'any' && guests === 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterRooms(ad) && filterFeatures(ad);
        });
      }

      if (type === 'any' && price === 'any' && rooms === 'any' && guests !== 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterGuests(ad) && filterFeatures(ad);
        });
      }

      if (type !== 'any' && price !== 'any' && rooms === 'any' && guests === 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterPrice(ad) && filterFeatures(ad);
        });
      }

      if (type === 'any' && price !== 'any' && rooms !== 'any' && guests === 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterPrice(ad) && filterRooms(ad) && filterFeatures(ad);
        });
      }

      if (type === 'any' && price !== 'any' && rooms === 'any' && guests !== 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterPrice(ad) && filterGuests(ad) && filterFeatures(ad);
        });
      }

      if (type === 'any' && price === 'any' && rooms !== 'any' && guests !== 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterRooms(ad) && filterGuests(ad) && filterFeatures(ad);
        });
      }

      if (type !== 'any' && price === 'any' && rooms !== 'any' && guests === 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterRooms(ad) && filterFeatures(ad);
        });
      }

      if (type !== 'any' && price === 'any' && rooms === 'any' && guests !== 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterGuests(ad) && filterFeatures(ad);
        });
      }

      if (type !== 'any' && price !== 'any' && rooms !== 'any' && guests === 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterPrice(ad) && filterRooms(ad) && filterFeatures(ad);
        });
      }

      if (type === 'any' && price !== 'any' && rooms !== 'any' && guests !== 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterPrice(ad) && filterRooms(ad) && filterGuests(ad) && filterFeatures(ad);
        });
      }

      if (type !== 'any' && price === 'any' && rooms !== 'any' && guests !== 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterRooms(ad) && filterGuests(ad) && filterFeatures(ad);
        });
      }

      if (type !== 'any' && price !== 'any' && rooms === 'any' && guests !== 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterPrice(ad) && filterGuests(ad) && filterFeatures(ad);
        });
      }

      if (type !== 'any' && price !== 'any' && rooms !== 'any' && guests !== 'any' && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterPrice(ad) && filterRooms(ad) && filterGuests(ad) && filterFeatures(ad);
        });
      }

      if (type === 'any' && price === 'any' && rooms === 'any' && guests === 'any' && features.length === 0) {
        filterAds = ads;
      }

      showPinsAndCard(filterAds);
    };

    filtersElement.addEventListener('change', filterChangeHandler);
  };

  window.filter = {
    updateAds: updateAds
  };
})();
