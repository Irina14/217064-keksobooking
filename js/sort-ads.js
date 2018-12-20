'use strict';

(function () {
  window.getSortAds = function (ads) {
    var adsCopy = ads.slice();

    var pinMainX = window.map.getLocationX();
    var pinMainY = window.map.getLocationY();

    adsCopy.forEach(function (ad) {
      var vector = {
        x: ad.location.x - pinMainX,
        y: ad.location.y - pinMainY
      };

      var itemlength = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
      ad.length = itemlength;
    });

    var sortAds = adsCopy.sort(function (left, right) {
      if (left.length > right.length) {
        return 1;
      }
      if (left.length < right.length) {
        return -1;
      } else {
        return 0;
      }
    });

    return sortAds;
  };
})();
