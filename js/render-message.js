'use strict';

(function () {
  var COLOR = '#ffffff';
  var FONT_SIZE = '50px';
  var FONT_WEIGHT = '700';

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var renderSuccessMessageForm = function () {
    var successElement = successTemplate.cloneNode(true);
    return successElement;
  };

  var renderErrorMessageForm = function (errorMessage) {
    var errorElement = errorTemplate.cloneNode(true);
    var errorButtonElement = errorElement.querySelector('.error__button');
    var errorMessageElement = document.createElement('p');
    errorMessageElement.style.position = 'relative';
    errorMessageElement.style.color = COLOR;
    errorMessageElement.style.fontSize = FONT_SIZE;
    errorMessageElement.style.fontWeight = FONT_WEIGHT;
    errorMessageElement.textContent = errorMessage;
    errorElement.insertBefore(errorMessageElement, errorButtonElement);
    return errorElement;
  };

  var renderErrorMessageMap = function (errorMessage) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = errorMessage;
    return errorElement;
  };

  window.renderMessage = {
    renderSuccessMessageForm: renderSuccessMessageForm,
    renderErrorMessageForm: renderErrorMessageForm,
    renderErrorMessageMap: renderErrorMessageMap
  };
})();
