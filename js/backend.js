'use strict';

(function () {
  var TIME = 10000;
  var Code = {
    SUCCESS: 200,
    ERROR_BAD_REQUEST: 400,
    ERROR_NOT_FOUND: 404,
    ERROR_SERVER: 500
  };

  var load = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case Code.SUCCESS:
          successHandler(xhr.response);
          break;
        case Code.ERROR_BAD_REQUEST_CODE:
          error = 'Неверный запрос';
          break;
        case Code.ERROR_NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        case Code.ERROR_SERVER:
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
        case Code.SUCCESS:
          successHandler(xhr.response);
          break;
        case Code.ERROR_BAD_REQUEST_CODE:
          error = 'Неверный запрос';
          break;
        case Code.ERROR_SERVER:
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
