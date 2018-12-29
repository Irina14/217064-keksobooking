'use strict';

(function () {
  var mapPinsElement = document.querySelector('.map__pins');

  var createArrayPins = function (arrayAds) {
    var arrayPins = [];
    var arrayAdsCopy = arrayAds.slice();
    arrayAdsCopy.forEach(function (ad) {
      arrayPins.push(window.pin.renderPin(ad));
    });
    return arrayPins;
  };

  var createFragmentPins = function (arrayPins) {
    var fragment = document.createDocumentFragment();
    arrayPins.forEach(function (pin) {
      fragment.appendChild(pin);
    });
    return fragment;
  };

  var showPins = function (ads) {
    mapPinsElement.appendChild(createFragmentPins(createArrayPins(ads)));
  };

  window.pins = {
    showPins: showPins,
    createArrayPins: createArrayPins,
    mapPinsElement: mapPinsElement
  };
})();
