'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  window.util = {
    isEscEvent: isEscEvent
  };
})();
