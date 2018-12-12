'use strict';

(function () {
  var TIME = 10000;
  var SUCCESS_CODE = 200;
  var ERROR_BAD_REQUEST_CODE = 400;
  var ERROR_NOT_FOUND_CODE = 404;
  var ERROR_SERVER_CODE = 500;

  var load = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case SUCCESS_CODE:
          successHandler(xhr.response);
          break;
        case ERROR_BAD_REQUEST_CODE:
          error = 'Неверный запрос';
          break;
        case ERROR_NOT_FOUND_CODE:
          error = 'Ничего не найдено';
          break;
        case ERROR_SERVER_CODE:
          error = 'Внутренняя ошибка сервера';
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

    xhr.timeout = TIME;

    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };

  var upload = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case SUCCESS_CODE:
          successHandler(xhr.response);
          break;
        case ERROR_BAD_REQUEST_CODE:
          error = 'Неверный запрос';
          break;
        case ERROR_SERVER_CODE:
          error = 'Внутренняя ошибка сервера';
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

    xhr.timeout = TIME;

    xhr.open('POST', 'https://js.dump.academy/keksobooking');
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
