'use strict';

(function () {
  var load = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          successHandler(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        errorHandler(error);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Истекло время ожидания');
    });

    xhr.timeout = 10000;

    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };

  var upload = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          successHandler(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        default:
          error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        errorHandler(error);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Истекло время ожидания');
    });

    xhr.timeout = 10000;

    xhr.open('POST', 'https://js.dump.academy/keksobooking');
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
