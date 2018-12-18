'use strict';

(function () {
  var mapFiltersElement = document.querySelector('.map__filters-container');

  window.card.showCard = function (arrayAds) {
    window.card.mapPinsClickHandler = function (evt) {
      var mapPinElements = window.map.getMapPins();
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

    window.pins.mapPinsElement.addEventListener('click', window.card.mapPinsClickHandler);
  };
})();
