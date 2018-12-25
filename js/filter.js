'use strict';

(function () {
  var VALUE_ANY = 'any';

  var ValuePrice = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var Price = {
    MIN: 10000,
    MAX: 50000
  };

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
    var getFilterAds = function () {
      var showPinsAndCard = function () {
        window.map.removeCard();
        window.map.removePins();
        if (filterAds.length !== 0) {
          window.pins.mapPinsElement.removeEventListener('click', window.card.mapPinsClickHandler);
          window.pins.showPins(filterAds);
          window.card.showCard(filterAds);
        }
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
        if (price === ValuePrice.LOW) {
          result = ad.offer.price < Price.MIN;
        }
        if (price === ValuePrice.MIDDLE) {
          result = ad.offer.price >= Price.MIN && ad.offer.price < Price.MAX;
        }
        if (price === ValuePrice.HIGH) {
          result = ad.offer.price >= Price.MAX;
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

      if (type !== VALUE_ANY && price === VALUE_ANY && rooms === VALUE_ANY && guests === VALUE_ANY && features.length === 0) {
        var filterAds = ads.filter(function (ad) {
          return filterType(ad);
        });
      }

      if (type === VALUE_ANY && price !== VALUE_ANY && rooms === VALUE_ANY && guests === VALUE_ANY && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterPrice(ad);
        });
      }

      if (type === VALUE_ANY && price === VALUE_ANY && rooms !== VALUE_ANY && guests === VALUE_ANY && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterRooms(ad);
        });
      }

      if (type === VALUE_ANY && price === VALUE_ANY && rooms === VALUE_ANY && guests !== VALUE_ANY && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterGuests(ad);
        });
      }

      if (type !== VALUE_ANY && price !== VALUE_ANY && rooms === VALUE_ANY && guests === VALUE_ANY && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterPrice(ad);
        });
      }

      if (type !== VALUE_ANY && price === VALUE_ANY && rooms !== VALUE_ANY && guests === VALUE_ANY && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterRooms(ad);
        });
      }

      if (type !== VALUE_ANY && price === VALUE_ANY && rooms === VALUE_ANY && guests !== VALUE_ANY && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterGuests(ad);
        });
      }

      if (type === VALUE_ANY && price === VALUE_ANY && rooms !== VALUE_ANY && guests !== VALUE_ANY && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterRooms(ad) && filterGuests(ad);
        });
      }

      if (type === VALUE_ANY && price !== VALUE_ANY && rooms !== VALUE_ANY && guests === VALUE_ANY && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterPrice(ad) && filterRooms(ad);
        });
      }

      if (type === VALUE_ANY && price !== VALUE_ANY && rooms === VALUE_ANY && guests !== VALUE_ANY && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterPrice(ad) && filterGuests(ad);
        });
      }

      if (type !== VALUE_ANY && price !== VALUE_ANY && rooms !== VALUE_ANY && guests === VALUE_ANY && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterPrice(ad) && filterRooms(ad);
        });
      }

      if (type !== VALUE_ANY && price !== VALUE_ANY && rooms === VALUE_ANY && guests !== VALUE_ANY && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterPrice(ad) && filterGuests(ad);
        });
      }

      if (type === VALUE_ANY && price !== VALUE_ANY && rooms !== VALUE_ANY && guests !== VALUE_ANY && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterPrice(ad) && filterRooms(ad) && filterGuests(ad);
        });
      }

      if (type !== VALUE_ANY && price === VALUE_ANY && rooms !== VALUE_ANY && guests !== VALUE_ANY && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterRooms(ad) && filterGuests(ad);
        });
      }

      if (type !== VALUE_ANY && price !== VALUE_ANY && rooms !== VALUE_ANY && guests !== VALUE_ANY && features.length === 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterPrice(ad) && filterRooms(ad) && filterGuests(ad);
        });
      }

      if (type === VALUE_ANY && price === VALUE_ANY && rooms === VALUE_ANY && guests === VALUE_ANY && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterFeatures(ad);
        });
      }

      if (type !== VALUE_ANY && price === VALUE_ANY && rooms === VALUE_ANY && guests === VALUE_ANY && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterFeatures(ad);
        });
      }

      if (type === VALUE_ANY && price !== VALUE_ANY && rooms === VALUE_ANY && guests === VALUE_ANY && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterPrice(ad) && filterFeatures(ad);
        });
      }

      if (type === VALUE_ANY && price === VALUE_ANY && rooms !== VALUE_ANY && guests === VALUE_ANY && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterRooms(ad) && filterFeatures(ad);
        });
      }

      if (type === VALUE_ANY && price === VALUE_ANY && rooms === VALUE_ANY && guests !== VALUE_ANY && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterGuests(ad) && filterFeatures(ad);
        });
      }

      if (type !== VALUE_ANY && price !== VALUE_ANY && rooms === VALUE_ANY && guests === VALUE_ANY && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterPrice(ad) && filterFeatures(ad);
        });
      }

      if (type === VALUE_ANY && price !== VALUE_ANY && rooms !== VALUE_ANY && guests === VALUE_ANY && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterPrice(ad) && filterRooms(ad) && filterFeatures(ad);
        });
      }

      if (type === VALUE_ANY && price !== VALUE_ANY && rooms === VALUE_ANY && guests !== VALUE_ANY && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterPrice(ad) && filterGuests(ad) && filterFeatures(ad);
        });
      }

      if (type === VALUE_ANY && price === VALUE_ANY && rooms !== VALUE_ANY && guests !== VALUE_ANY && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterRooms(ad) && filterGuests(ad) && filterFeatures(ad);
        });
      }

      if (type !== VALUE_ANY && price === VALUE_ANY && rooms !== VALUE_ANY && guests === VALUE_ANY && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterRooms(ad) && filterFeatures(ad);
        });
      }

      if (type !== VALUE_ANY && price === VALUE_ANY && rooms === VALUE_ANY && guests !== VALUE_ANY && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterGuests(ad) && filterFeatures(ad);
        });
      }

      if (type !== VALUE_ANY && price !== VALUE_ANY && rooms !== VALUE_ANY && guests === VALUE_ANY && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterPrice(ad) && filterRooms(ad) && filterFeatures(ad);
        });
      }

      if (type === VALUE_ANY && price !== VALUE_ANY && rooms !== VALUE_ANY && guests !== VALUE_ANY && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterPrice(ad) && filterRooms(ad) && filterGuests(ad) && filterFeatures(ad);
        });
      }

      if (type !== VALUE_ANY && price === VALUE_ANY && rooms !== VALUE_ANY && guests !== VALUE_ANY && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterRooms(ad) && filterGuests(ad) && filterFeatures(ad);
        });
      }

      if (type !== VALUE_ANY && price !== VALUE_ANY && rooms === VALUE_ANY && guests !== VALUE_ANY && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterPrice(ad) && filterGuests(ad) && filterFeatures(ad);
        });
      }

      if (type !== VALUE_ANY && price !== VALUE_ANY && rooms !== VALUE_ANY && guests !== VALUE_ANY && features.length !== 0) {
        filterAds = ads.filter(function (ad) {
          return filterType(ad) && filterPrice(ad) && filterRooms(ad) && filterGuests(ad) && filterFeatures(ad);
        });
      }

      if (type === VALUE_ANY && price === VALUE_ANY && rooms === VALUE_ANY && guests === VALUE_ANY && features.length === 0) {
        filterAds = ads;
      }

      showPinsAndCard();
    };

    var filterChangeHandler = function () {
      window.debounce(getFilterAds);
    };

    filtersElement.addEventListener('change', filterChangeHandler);
  };

  var resetFilter = function () {
    filtersElement.reset();
  };

  window.filter = {
    updateAds: updateAds,
    resetFilter: resetFilter
  };
})();
