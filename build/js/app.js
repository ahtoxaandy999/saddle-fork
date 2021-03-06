"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

document.addEventListener("DOMContentLoaded", function () {
  mobileBurgerMenu('.js-burger-opener', '.js-mobile-nav');
  new Tabs('.js-tab-nav', '.js-tab');
  new OpenClose({
    holders: '.js-open-close',
    close: '.js-close',
    hideOnClickOutside: true
  });
  new OpenClose({
    holders: '.js-advanced-openclose',
    hideOnClickOutside: false
  });
  new OpenClose({
    holders: '.js-openclose-deposit',
    hideOnClickOutside: false,
    classToBody: 'deposit-active'
  });
});

function mobileBurgerMenu(openerSelector, holderSelector) {
  var activeClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'mobile-nav-active';
  if (!document.querySelector(openerSelector) || !document.querySelector(holderSelector)) return;
  var holder = document.querySelector(holderSelector);
  var opener = holder.querySelector(openerSelector);
  var body = document.querySelector('body');
  opener.addEventListener('click', function (event) {
    event.preventDefault();

    if (!body.classList.contains(activeClass)) {
      body.classList.add(activeClass);
    } else {
      body.classList.remove(activeClass);
    }
  });
}

var Tabs = /*#__PURE__*/function () {
  function Tabs(navSelector, tabsSelector) {
    _classCallCheck(this, Tabs);

    this.nav = document.querySelector(navSelector);
    this.links = this.nav.querySelectorAll('a');
    this.tabs = document.querySelectorAll(tabsSelector);
    this.linkActiveClass = 'active';
    this.init();
  }

  _createClass(Tabs, [{
    key: "init",
    value: function init() {
      this.displayCurrentTab(0);
      this.attachEvents();
      this.links[0].classList.add(this.linkActiveClass);
    }
  }, {
    key: "displayCurrentTab",
    value: function displayCurrentTab(current) {
      for (var i = 0; i < this.tabs.length; i++) {
        this.tabs[i].style.display = current === i ? "block" : "none";
      }

      document.querySelector('body').classList.remove('mobile-nav-active');
    }
  }, {
    key: "clearActiveClass",
    value: function clearActiveClass() {
      var _this = this;

      this.links.forEach(function (item) {
        item.classList.remove(_this.linkActiveClass);
      });
    }
  }, {
    key: "attachEvents",
    value: function attachEvents() {
      var _this2 = this;

      this.nav.addEventListener("click", function (event) {
        if (event.target.className === "js-tab-link") {
          for (var i = 0; i < _this2.links.length; i++) {
            if (event.target === _this2.links[i]) {
              _this2.clearActiveClass();

              _this2.displayCurrentTab(i);

              event.target.classList.add(_this2.linkActiveClass);
              break;
            }
          }
        }
      });
    }
  }]);

  return Tabs;
}();

var OpenClose = /*#__PURE__*/function () {
  function OpenClose(params) {
    _classCallCheck(this, OpenClose);

    if (!document.querySelector(params.holders)) return;
    console.log(params);
    this.holders = document.querySelectorAll(params.holders);
    this.opener = params.opener || '.js-opener';
    this.closeBtn = params.close;
    this.hideOnClickOutside = params.hideOnClickOutside;
    this.classToBody = params.classToBody;
    this.activeClass = params.activeClass || 'active';
    this.finishClass = params.finishClass || 'finished';
    this.attachEvents();
  }

  _createClass(OpenClose, [{
    key: "attachEvents",
    value: function attachEvents() {
      var _this3 = this;

      this.holders.forEach(function (currentEl) {
        var opener = currentEl.querySelector(_this3.opener);
        opener.addEventListener('click', function (e) {
          e.stopPropagation();
          e.preventDefault();

          if (currentEl.classList.contains(_this3.activeClass)) {
            _this3.removeClass(currentEl);

            if (_this3.finishClass) {
              _this3.removeFinishClass(currentEl);
            }

            if (_this3.classToBody) {
              document.querySelector('body').classList.remove(_this3.classToBody);
            }
          } else {
            _this3.addClass(currentEl);

            if (_this3.finishClass) {
              _this3.addFinishClass(currentEl);
            }

            if (_this3.classToBody) {
              document.querySelector('body').classList.add(_this3.classToBody);
            }
          }

          if (_this3.hideOnClickOutside) {
            //hide other drop if open
            _this3.holders.forEach(function (item) {
              if (item.classList.contains(_this3.activeClass) && item !== currentEl) {
                _this3.removeClass(item);
              }
            });
          }
        });
        var closeBtn = currentEl.querySelector(_this3.closeBtn);

        if (closeBtn) {
          closeBtn.addEventListener('click', function (e) {
            e.preventDefault();

            _this3.removeClass(currentEl);
          });
        }

        if (_this3.hideOnClickOutside) {
          //hide drop on click outside
          document.addEventListener('click', function (el) {
            if (!currentEl.contains(el.target)) {
              _this3.removeClass(currentEl);
            }
          });
        }
      });
    }
  }, {
    key: "addClass",
    value: function addClass(e) {
      e.classList.add(this.activeClass);
    }
  }, {
    key: "removeClass",
    value: function removeClass(e) {
      e.classList.remove(this.activeClass);
    }
  }, {
    key: "addFinishClass",
    value: function addFinishClass(e) {
      var _this4 = this;

      this.timeout = setTimeout(function () {
        if (e.classList.contains(_this4.activeClass)) {
          e.classList.add(_this4.finishClass);
        }
      }, 300);
    }
  }, {
    key: "removeFinishClass",
    value: function removeFinishClass(e) {
      e.classList.remove(this.finishClass);
    }
  }]);

  return OpenClose;
}();