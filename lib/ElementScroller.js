"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementScroller = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ScrollManager = require("./ScrollManager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ManagedElementScroller =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ManagedElementScroller, _React$Component);

  function ManagedElementScroller(props) {
    var _this;

    _classCallCheck(this, ManagedElementScroller);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ManagedElementScroller).call(this, props));
    _this._ref = _react.default.createRef();
    return _this;
  }

  _createClass(ManagedElementScroller, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._register();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._unregister(this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this._unregister(prevProps);

      this._register();
    }
  }, {
    key: "_register",
    value: function _register() {
      var _this$props = this.props,
          manager = _this$props.manager,
          scrollKey = _this$props.scrollKey;
      var node = this._ref.current;

      if (!manager) {
        console.warn("ElementScroller only works when nested within a ScrollManager"); // eslint-disable-line no-console
      } else if (scrollKey && node) {
        setTimeout(function () {
          return manager._registerElement(scrollKey, node);
        }, 1);
      }
    }
  }, {
    key: "_unregister",
    value: function _unregister(props) {
      var manager = props.manager,
          scrollKey = props.scrollKey;

      if (manager && scrollKey) {
        manager._unregisterElement(scrollKey);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.cloneElement(_react.default.Children.only(this.props.children), {
        ref: this._ref
      });
    }
  }]);

  return ManagedElementScroller;
}(_react.default.Component);

ManagedElementScroller.propTypes = {
  manager: _propTypes.default.instanceOf(_ScrollManager.ScrollManager).isRequired,
  scrollKey: _propTypes.default.string.isRequired,
  children: _propTypes.default.element.isRequired
};
var ElementScroller = (0, _ScrollManager.withManager)(ManagedElementScroller);
exports.ElementScroller = ElementScroller;