'use strict';

(function () {
  var TIME = 10000;
  var STATUS = 'Cтатус ответа: ';

  var Code = {
    SUCCESS: 200,
    ERROR_BAD_REQUEST: 400,
    ERROR_NOT_FOUND: 404,
    ERROR_SERVER: 500
  };

  var ErrorText = {
    BAD_REQUEST: 'Неверный запрос',
    SEARCH: 'Ничего не найдено',
    SERVER: 'Внутренняя ошибка сервера',
    CONNECTION: 'Произошла ошибка соединения',
    TIMEOUT: 'Истекло время ожидания'
  };

  var setEvents = function (xhr, successHandler, errorHandler) {
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case Code.SUCCESS:
          successHandler(xhr.response);
          break;
        case Code.ERROR_BAD_REQUEST:
          error = ErrorText.BAD_REQUEST;
          break;
        case Code.ERROR_NOT_FOUND:
          error = ErrorText.SEARCH;
          break;
        case Code.ERROR_SERVER:
          error = ErrorText.SERVER;
          break;
        default:
          error = STATUS + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        errorHandler(error);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler(ErrorText.CONNECTION);
    });

    xhr.addEventListener('timeout', function () {
      errorHandler(ErrorText.TIMEOUT);
    });
  };

  var load = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    setEvents(xhr, successHandler, errorHandler);
    xhr.timeout = TIME;
    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };

  var upload = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    setEvents(xhr, successHandler, errorHandler);
    xhr.timeout = TIME;
    xhr.open('POST', 'https://js.dump.academy/keksobooking');
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
