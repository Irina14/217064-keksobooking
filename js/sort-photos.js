'use strict';

(function () {
  window.sortPhotos = function (photos) {
    var dragElement;

    Array.from(photos.children).forEach(function (photo) {
      photo.draggable = true;
    });

    var photoDragOverHandler = function (evt) {
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'move';

      var target = evt.target;
      if (target && target !== dragElement && target.nodeName === 'IMG' && target !== photos.lastChild) {
        photos.insertBefore(dragElement, photos.children[0] !== target && target.nextSibling || target);
      }
      if (target && target !== dragElement && target.nodeName === 'IMG' && target === photos.lastChild) {
        photos.insertBefore(dragElement, null);
      }
    };

    var photoDragEndHandler = function (evt) {
      evt.preventDefault();
      photos.removeEventListener('dragover', photoDragOverHandler);
      photos.removeEventListener('dragend', photoDragEndHandler);
    };

    photos.addEventListener('dragstart', function (evt) {
      dragElement = evt.target;
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('Text', dragElement.textContent);
      photos.addEventListener('dragover', photoDragOverHandler);
      photos.addEventListener('dragend', photoDragEndHandler);
    });
  };
})();
