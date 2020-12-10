"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Author and copyright: Tishuk Nadezda (https://github.com/rainjeck)
 * Repository: https://github.com/rainjeck/unitoggle
 */
var Unitoggle = /*#__PURE__*/function () {
  function Unitoggle() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Unitoggle);

    this.container = document.body;

    if (typeof options.container === 'string') {
      if (!document.querySelector(options.container)) return;
      this.container = document.querySelector(options.container);
    }

    if (_typeof(options.container) === 'object') {
      this.container = options.container;
    }

    this.dataAttr = options.dataAttr || 'toggle'; // [data-{dataAttr}]

    this.activeClass = options.activeClass || 'is-active'; // class name for add

    this.activateInputs = options.activateInputs || false; // activate inputs when open/on

    this.hash = options.hash || false; // hash

    this.onOpen = options.onOpen || ''; // after Open

    this.onClose = options.onClose || ''; // after Close

    this.button = options.button || "[data-".concat(this.dataAttr, "]");
    this.init();
  }

  _createClass(Unitoggle, [{
    key: "init",
    value: function init() {
      this.container.addEventListener('click', this.clickButton.bind(this));

      if (!this.hash) {
        this.activateTabs();
      }

      if (this.hash) {
        this.activateHash();
      }
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

      if (this.hash) {
        this.setHash();
      }
    }
  }, {
    key: "activate",
    value: function activate(tab) {
      var _this = this;

      var selector = "[data-".concat(this.dataAttr, "=\"").concat(tab.id, "\"]");
      var buttons = Array.prototype.slice.call(document.querySelectorAll(selector));

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

      var selector = "[data-".concat(this.dataAttr, "=\"").concat(tab.id, "\"]");
      var buttons = Array.prototype.slice.call(this.container.querySelectorAll(selector));
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

      var selector = "[data-".concat(this.dataAttr, "-group].").concat(this.activeClass);
      var buttons = Array.prototype.slice.call(this.container.querySelectorAll(selector));

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

      var selector = "[data-".concat(this.dataAttr, "-group=\"").concat(groupID, "\"]");
      var groupButtons = Array.prototype.slice.call(this.container.querySelectorAll(selector));
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
      var inputs = Array.prototype.slice.call(tab.querySelectorAll('input, select, textarea'));
      inputs.forEach(function (input) {
        input.removeAttribute('disabled');
      });
    }
  }, {
    key: "disableInputs",
    value: function disableInputs(tab) {
      var inputs = Array.prototype.slice.call(tab.querySelectorAll('input, select, textarea'));
      inputs.forEach(function (input) {
        input.setAttribute('disabled', true);
      });
    }
  }, {
    key: "activateHash",
    value: function activateHash() {
      var _this5 = this;

      var hash = window.location.hash;

      if (!hash) {
        this.activateTabs();
        this.setHash();
        return;
      }

      ;
      var hashItems = this.checkHash(hash.replace('#', '').split('_'));

      if (!hashItems) {
        this.activateTabs();
        this.setHash();
        return;
      }

      hashItems.forEach(function (item) {
        var selector = "[data-".concat(_this5.dataAttr, "=\"").concat(item, "\"]");

        var button = _this5.container.querySelector(selector);

        var attr = "data-".concat(_this5.dataAttr, "-group");
        var groupID = button.getAttribute(attr);
        var tab = document.getElementById(item);

        _this5.closeGroup(groupID);

        _this5.activate(tab);
      });
      this.setHash();
    }
  }, {
    key: "checkHash",
    value: function checkHash(hashItems) {
      var _this6 = this;

      var selector = "[data-".concat(this.dataAttr, "-group]");
      var tabsGroup = this.container.querySelectorAll(selector);
      var groups = [];
      [].forEach.call(tabsGroup, function (elem) {
        var attr = "data-".concat(_this6.dataAttr, "-group");
        var group = elem.getAttribute(attr);

        if (groups.indexOf(group) < 0) {
          groups.push(group);
        }
      });

      if (hashItems.length !== groups.length) {
        return 0;
      }

      var offIndex;
      hashItems.forEach(function (item) {
        var selector = "[data-".concat(_this6.dataAttr, "=\"").concat(item, "\"]");

        var button = _this6.container.querySelector(selector);

        if (button !== null) {
          var attr = "data-".concat(_this6.dataAttr, "-group");
          var group = button.getAttribute(attr);
          groups.splice(groups.indexOf(group), 1);
        }

        if (button === null) {
          offIndex = hashItems.indexOf(item);
          hashItems.splice(offIndex, 1);
        }
      });
      groups.forEach(function (item) {
        var selector = "[data-".concat(_this6.dataAttr, "-group=\"").concat(item, "\"].").concat(_this6.activeClass);

        var button = _this6.container.querySelector(selector);

        var attr = "data-".concat(_this6.dataAttr);
        var tabID = button.getAttribute(attr);

        if (hashItems.indexOf(tabID) < 0) {
          hashItems.splice(offIndex, 0, tabID);
        }
      });
      return hashItems;
    }
  }, {
    key: "setHash",
    value: function setHash() {
      var _this7 = this;

      var selector = "[data-".concat(this.dataAttr, "-group].").concat(this.activeClass);
      var items = Array.prototype.slice.call(this.container.querySelectorAll(selector));
      var ids = [];
      items.forEach(function (item) {
        var attrName = "data-".concat(_this7.dataAttr);
        var id = item.getAttribute(attrName);
        ids.push(id);
      });
      var hash = ids.join('_');
      window.location.hash = '#' + hash;
    }
  }]);

  return Unitoggle;
}();
//# sourceMappingURL=../dest/unitoggle.js.map
