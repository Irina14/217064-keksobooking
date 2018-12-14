'use strict';

(function () {
  var mapPinsElement = document.querySelector('.map__pins');

  var createArrayPins = function (arrayAds) {
    var arrayPins = [];
    for (var i = 0; i < arrayAds.length; i++) {
      arrayPins.push(window.renderPin(arrayAds[i]));
    }
    return arrayPins;
  };

  var createFragmentPins = function (arrayPins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrayPins.length; i++) {
      fragment.appendChild(arrayPins[i]);
    }
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
