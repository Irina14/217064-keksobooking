'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var EVENT_NAMES = ['dragenter', 'dragover', 'dragleave', 'drop'];
  var ONE_EVENT_NAMES = ['dragenter', 'dragover'];
  var TWO_EVENT_NAMES = ['dragleave', 'drop'];
  var RED_COLOR = '#ff5635';
  var GRAY_COLOR = '#999999';
  var IMAGE_AVATAR = 'img/muffin-grey.svg';


  var adFormAvatarElement = document.querySelector('.ad-form__field');
  var adFormPhotoElement = document.querySelector('.ad-form__upload');
  var fileChooserAvatarElement = adFormAvatarElement.querySelector('.ad-form-header__input');
  var fileChooserPhotoElement = adFormPhotoElement.querySelector('.ad-form__input');
  var previewAvatarElement = document.querySelector('.ad-form-header__preview img');
  var previewPhotoElement = document.querySelector('.ad-form__photo');
  var dropZoneAvatarElement = adFormAvatarElement.querySelector('.ad-form-header__drop-zone');
  var dropZonePhotoElement = adFormPhotoElement.querySelector('.ad-form__drop-zone');

  var previewFile = function (file, readFile) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      readFile(file);
    }
  };

  var readFileAvatar = function (file) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      previewAvatarElement.src = reader.result;
    });
    reader.readAsDataURL(file);
  };

  var readFilePhoto = function (file) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      var imageElement = document.createElement('img');
      imageElement.src = reader.result;
      previewPhotoElement.appendChild(imageElement);
    });
    reader.readAsDataURL(file);
  };

  var addEvents = function (form, dropZone) {
    EVENT_NAMES.forEach(function (eventName) {
      form.addEventListener(eventName, function (evt) {
        evt.preventDefault();
      });
    });

    ONE_EVENT_NAMES.forEach(function (eventName) {
      form.addEventListener(eventName, function () {
        dropZone.style.borderColor = RED_COLOR;
      });
    });

    TWO_EVENT_NAMES.forEach(function (eventName) {
      form.addEventListener(eventName, function () {
        dropZone.style.borderColor = GRAY_COLOR;
      });
    });
  };

  var removeAvatar = function () {
    previewAvatarElement.src = IMAGE_AVATAR;
  };

  var removePhotos = function () {
    previewPhotoElement.innerHTML = '';
  };

  addEvents(adFormAvatarElement, dropZoneAvatarElement);
  addEvents(adFormPhotoElement, dropZonePhotoElement);

  fileChooserAvatarElement.addEventListener('change', function () {
    var file = fileChooserAvatarElement.files[0];
    previewFile(file, readFileAvatar);
  });

  adFormAvatarElement.addEventListener('drop', function (evt) {
    var file = evt.dataTransfer.files[0];
    previewFile(file, readFileAvatar);
  });

  fileChooserPhotoElement.addEventListener('change', function () {
    var files = Array.from(fileChooserPhotoElement.files);
    files.forEach(function (file) {
      previewFile(file, readFilePhoto);
    });
    window.sortPhotos(previewPhotoElement);
  });

  adFormPhotoElement.addEventListener('drop', function (evt) {
    var files = Array.from(evt.dataTransfer.files);
    files.forEach(function (file) {
      previewFile(file, readFilePhoto);
    });
    window.sortPhotos(previewPhotoElement);
  });

  window.preview = {
    removeAvatar: removeAvatar,
    removePhotos: removePhotos
  };
})();
