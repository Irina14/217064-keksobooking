'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.renderPin = function (ad) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x - window.data.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = ad.location.y - window.data.PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    return pinElement;
  };
})();
