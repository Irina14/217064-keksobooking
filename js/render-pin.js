'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.renderPin = function (ad) {
    var pinElement = pinTemplate.cloneNode(true);
    if (ad.offer) {
      pinElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
      pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';

      if (ad.author.avatar !== '') {
        pinElement.querySelector('img').src = ad.author.avatar;
      } else {
        pinElement.querySelector('img').src = 'img/avatars/default.png';
      }

      pinElement.querySelector('img').alt = ad.offer.title;
    } else {
      pinElement.style.display = 'none';
    }
    return pinElement;
  };
})();
