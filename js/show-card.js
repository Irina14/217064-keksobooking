'use strict';

(function () {
  var mapFiltersElement = document.querySelector('.map__filters-container');

  window.showCard = function (arrayAds) {
    var mapPinsClickHandler = function (evt) {
      var mapPinElements = document.querySelectorAll('[type=button]');
      window.map.removeCard();
      var target = evt.target;
      for (var i = 0; i < mapPinElements.length; i++) {
        if (mapPinElements[i] === target.parentElement || mapPinElements[i] === target) {
          var card = window.renderCard(arrayAds[i]);
          window.map.mapElement.insertBefore(card, mapFiltersElement);
          window.map.cards.push(card);
          mapPinElements[i].classList.add('map__pin--active');
        }
      }
      document.addEventListener('keydown', window.map.documentEscKeyHandler);
      window.map.closeCard();
    };

    window.pins.mapPinsElement.addEventListener('click', mapPinsClickHandler);
  };
})();
