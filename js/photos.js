'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var EVENT_NAMES = ['dragenter', 'dragover', 'dragleave', 'drop'];
  var EVENT_NAMES_ONE = ['dragenter', 'dragover'];
  var EVENT_NAMES_TWO = ['dragleave', 'drop'];
  var RED_COLOR = '#ff5635';
  var GRAY_COLOR = '#999999';


  var adFormFieldElement = document.querySelector('.ad-form__field');
  var fileChooserElement = adFormFieldElement.querySelector('.ad-form-header__input');
  var previewElement = document.querySelector('.ad-form-header__preview img');
  var dropZoneAvatarElement = adFormFieldElement.querySelector('.ad-form-header__drop-zone');

  var readFile = function (file) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  fileChooserElement.addEventListener('change', function () {
    var file = fileChooserElement.files[0];
    readFile(file);
  });

  EVENT_NAMES.forEach(function (eventName) {
    adFormFieldElement.addEventListener(eventName, function (evt) {
      evt.preventDefault();
    });
  });

  EVENT_NAMES_ONE.forEach(function (eventName) {
    adFormFieldElement.addEventListener(eventName, function () {
      dropZoneAvatarElement.style.borderColor = RED_COLOR;
    });
  });

  EVENT_NAMES_TWO.forEach(function (eventName) {
    adFormFieldElement.addEventListener(eventName, function () {
      dropZoneAvatarElement.style.borderColor = GRAY_COLOR;
    });
  });

  adFormFieldElement.addEventListener('drop', function (evt) {
    var file = evt.dataTransfer.files[0];
    readFile(file);
  });
})();
