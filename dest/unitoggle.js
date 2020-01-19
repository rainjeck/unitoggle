(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.Unitoggle = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  /**
   * Author and copyright: Tishuk Nadezda (https://github.com/rainjeck)
   * Repository: https://github.com/rainjeck/unitoggle
   */
  var Unitoggle =
  /*#__PURE__*/
  function () {
    function Unitoggle() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Unitoggle);

      this.container = document.body;

      if (typeof options.container === 'string') {
        this.container = document.querySelector(options.container) || document.body;
      }

      if (_typeof(options.container) === 'object') {
        this.container = options.container;
      }

      this.dataAttr = options.dataAttr || 'toggle'; // [data-{dataAttr}]

      this.activeClass = options.activeClass || 'is-active'; // class name for add

      this.activateInputs = options.activateInputs || false; // activate inputs when open/on

      this.onOpen = options.onOpen || ''; // after Open

      this.onClose = options.onClose || ''; // after Close

      this.button = options.button || "[data-".concat(this.dataAttr, "]");
      this.init();
    }

    _createClass(Unitoggle, [{
      key: "init",
      value: function init() {
        this.container.addEventListener('click', this.clickButton.bind(this));
        this.activateTabs();
      }
    }, {
      key: "clickButton",
      value: function clickButton(e) {
        var button = e.target;

        if (!e.target.matches(this.button) && !e.target.closest(this.button)) {
          return;
        }

        if (!e.target.matches(this.button) && e.target.closest(this.button)) {
          button = e.target.closest(this.button);
        }

        var tabID = button.dataset[this.dataAttr];
        var tab = document.getElementById(tabID);

        if (button.hasAttribute("data-".concat(this.dataAttr, "-accordion")) && button.classList.contains(this.activeClass)) {
          this.inactivate(tab);
          return;
        }

        if (button.hasAttribute("data-".concat(this.dataAttr, "-group"))) {
          this.closeGroup(button.getAttribute("data-".concat(this.dataAttr, "-group")));
        }

        this.activate(tab);
      }
    }, {
      key: "activate",
      value: function activate(tab) {
        var _this = this;

        var searchString = "[data-".concat(this.dataAttr, "=\"").concat(tab.id, "\"]");
        var buttons = Array.from(document.querySelectorAll(searchString));

        if (tab.classList.contains(this.activeClass)) {
          this.inactivate(tab);
          return;
        }

        if (this.activateInputs) {
          this.enableInputs(tab);
        }

        tab.classList.add(this.activeClass);
        buttons.forEach(function (button) {
          button.classList.add(_this.activeClass);
        });

        if (this.onOpen && typeof this.onOpen === 'function') {
          this.onOpen(tab);
        }
      }
    }, {
      key: "inactivate",
      value: function inactivate(tab) {
        var _this2 = this;

        var searchString = "[data-".concat(this.dataAttr, "=\"").concat(tab.id, "\"]");
        var buttons = Array.from(document.querySelectorAll(searchString));
        buttons.forEach(function (button) {
          button.classList.remove(_this2.activeClass);
        });
        tab.classList.remove(this.activeClass);

        if (this.activateInputs) {
          this.disableInputs(tab);
        }

        if (this.onClose && typeof this.onClose === 'function') {
          this.onClose(tab);
        }
      }
    }, {
      key: "activateTabs",
      value: function activateTabs() {
        var _this3 = this;

        var buttons = Array.from(this.container.querySelectorAll("[data-".concat(this.dataAttr, "-group].").concat(this.activeClass)));

        if (buttons) {
          buttons.forEach(function (button) {
            var tabID = button.dataset[_this3.dataAttr];
            var tab = document.getElementById(tabID);

            _this3.activate(tab);
          });
        }
      }
    }, {
      key: "closeGroup",
      value: function closeGroup(groupID) {
        var _this4 = this;

        var groupButtons = Array.from(document.querySelectorAll("[data-".concat(this.dataAttr, "-group=\"").concat(groupID, "\"]")));
        groupButtons.forEach(function (button) {
          button.classList.remove(_this4.activeClass);
          var tabID = button.dataset[_this4.dataAttr];
          var tab = document.getElementById(tabID);
          tab.classList.remove(_this4.activeClass);

          if (_this4.activateInputs) {
            _this4.disableInputs(tab);
          }
        });
      }
    }, {
      key: "enableInputs",
      value: function enableInputs(tab) {
        var inputs = Array.from(tab.querySelectorAll('input, select, textarea'));
        inputs.forEach(function (input) {
          input.removeAttribute('disabled');
        });
      }
    }, {
      key: "disableInputs",
      value: function disableInputs(tab) {
        var inputs = Array.from(tab.querySelectorAll('input, select, textarea'));
        inputs.forEach(function (input) {
          input.setAttribute('disabled', true);
        });
      }
    }]);

    return Unitoggle;
  }();

  _exports["default"] = Unitoggle;
});
//# sourceMappingURL=../dest/unitoggle.js.map
