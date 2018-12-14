'use strict';

(function () {
  var filtersElement = document.querySelector('.map__filters');
  var typeSelectElement = filtersElement.querySelector('#housing-type');
  var typeOptionElements = typeSelectElement.options;
  var priceSelectElement = filtersElement.querySelector('#housing-price');
  var roomsSelectElement = filtersElement.querySelector('#housing-rooms');
  var guestsSelectElement = filtersElement.querySelector('#housing-guests');
  var mapPinsElement = document.querySelector('.map__pins');

  var updateAds = function (ads) {
    var typeSelectChangeHandler = function () {
      for (var i = 0; i < typeOptionElements.length; i++) {
        if (typeOptionElements[i].selected) {
          var type = typeOptionElements[i].value;
        }
      }

      if (typeOptionElements.value !== 'any') {
        var typeAds = ads.filter(function (ad) {
          return ad.offer.type === type;
        });
        window.map.removePins();
        window.pins.showPins(typeAds);
      }
    };

    typeSelectElement.addEventListener('change', typeSelectChangeHandler);
  };

  window.filter = {
    updateAds: updateAds
  };
})();
