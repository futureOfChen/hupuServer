(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["RedBagDetail"],{

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/RedBagDetail/ReactPullLoad.scss":
/*!*************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/RedBagDetail/ReactPullLoad.scss ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n.pull-load {\n  position: relative;\n  overflow-y: scroll;\n  -webkit-overflow-scrolling: touch; }\n\n.pull-load-head {\n  position: absolute;\n  transform: translate3d(0px, -100%, 0px);\n  width: 100%; }\n\n.state-refreshing .pull-load-head,\n.state-refreshed .pull-load-head {\n  position: relative;\n  transform: none; }\n\n.pull-load-body {\n  position: relative; }\n\n.state-refreshing .pull-load-body {\n  transition: transform 0.2s; }\n\n.state-reset .pull-load-body {\n  transition: transform 0.2s; }\n\n/*\r\n * HeadNode default UI\r\n */\n.pull-load-head-default {\n  text-align: center;\n  font-size: 0.32rem;\n  line-height: 1.28rem;\n  color: #7676a1; }\n\n.state-pulling .pull-load-head-default:after {\n  content: '\\4E0B\\62C9\\5237\\65B0'; }\n\n.state-pulling.enough .pull-load-head-default:after {\n  content: '\\677E\\5F00\\5237\\65B0'; }\n\n.state-refreshing .pull-load-head-default:after {\n  content: '\\6B63\\5728\\5237\\65B0...'; }\n\n.state-refreshed .pull-load-head-default:after {\n  content: '\\5237\\65B0\\6210\\529F'; }\n\n.state-pulling .pull-load-head-default {\n  opacity: 1; }\n\n.state-pulling .pull-load-head-default i {\n  display: inline-block;\n  font-size: 2em;\n  margin-right: .6em;\n  vertical-align: middle;\n  height: 1em;\n  border-left: 1px solid;\n  position: relative;\n  transition: transform .3s ease; }\n\n.state-pulling .pull-load-head-default i:before,\n.state-pulling .pull-load-head-default i:after {\n  content: '';\n  position: absolute;\n  font-size: .5em;\n  width: 1em;\n  bottom: 0px;\n  border-top: 1px solid; }\n\n.state-pulling .pull-load-head-default i:before {\n  right: 1px;\n  transform: rotate(50deg);\n  transform-origin: right; }\n\n.state-pulling .pull-load-head-default i:after {\n  left: 0px;\n  transform: rotate(-50deg);\n  transform-origin: left; }\n\n.state-pulling.enough .pull-load-head-default i {\n  transform: rotate(180deg); }\n\n.state-refreshing .pull-load-head-default i {\n  margin-right: 10px;\n  display: inline-block;\n  vertical-align: middle;\n  font-size: 0.64rem;\n  width: 1em;\n  height: 1em;\n  border: 2px solid #9494b6;\n  border-top-color: #fff;\n  border-radius: 100%;\n  animation: circle .8s infinite linear; }\n\n.state-refreshed .pull-load-head-default {\n  opacity: 1;\n  transition: opacity 1s; }\n\n.state-refreshed .pull-load-head-default i {\n  display: inline-block;\n  box-sizing: content-box;\n  vertical-align: middle;\n  margin-right: 10px;\n  font-size: 20px;\n  height: 1em;\n  width: 1em;\n  border: 1px solid;\n  border-radius: 100%;\n  position: relative; }\n\n.state-refreshed .pull-load-head-default i:before {\n  content: '';\n  position: absolute;\n  top: 3px;\n  left: 7px;\n  height: 11px;\n  width: 5px;\n  border: solid;\n  border-width: 0 1px 1px 0;\n  transform: rotate(40deg); }\n\n.pull-load-footer-default {\n  text-align: center;\n  font-size: 0.32rem;\n  line-height: 1.28rem;\n  color: #7676a1; }\n\n.state-loading .pull-load-footer-default:after {\n  content: '\\52A0\\8F7D\\66F4\\591A'; }\n\n.pull-load-footer-default.nomore:after {\n  content: '\\6CA1\\6709\\66F4\\591A'; }\n\n.state-loading .pull-load-footer-default i {\n  margin-right: 0.26667rem;\n  display: inline-block;\n  vertical-align: middle;\n  font-size: 0.64rem;\n  width: 1em;\n  height: 1em;\n  border: 2px solid #9494b6;\n  border-top-color: #fff;\n  border-radius: 100%;\n  animation: circle .8s infinite linear; }\n\n@keyframes circle {\n  100% {\n    transform: rotate(360deg); } }\n", ""]);

// exports
exports.locals = {
	"pull-load": "pull-load",
	"pull-load-head": "pull-load-head",
	"state-refreshing": "state-refreshing",
	"state-refreshed": "state-refreshed",
	"pull-load-body": "pull-load-body",
	"state-reset": "state-reset",
	"pull-load-head-default": "pull-load-head-default",
	"state-pulling": "state-pulling",
	"enough": "enough",
	"circle": "circle",
	"pull-load-footer-default": "pull-load-footer-default",
	"state-loading": "state-loading",
	"nomore": "nomore"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/RedBagDetail/RedBagDetail.scss":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/RedBagDetail/RedBagDetail.scss ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#rbd {\n  min-height: 100%;\n  background: #F5F5F5; }\n  #rbd .test-ul {\n    padding: 0.82667rem 0.48rem 0; }\n    #rbd .test-ul .head {\n      display: flex;\n      justify-content: space-between;\n      padding: 0.41333rem 0.46667rem; }\n      #rbd .test-ul .head span {\n        font-size: 0.42667rem;\n        line-height: 0.6rem;\n        color: #ED3648; }\n    #rbd .test-ul .white {\n      background: #ffffff; }\n    #rbd .test-ul .item-border-redus {\n      border-radius: 0.24rem; }\n    #rbd .test-ul .content {\n      margin-top: 0.26667rem; }\n      #rbd .test-ul .content .imgWarp {\n        padding-top: 1.97333rem;\n        padding-bottom: 4.12rem; }\n        #rbd .test-ul .content .imgWarp img {\n          width: 4.64rem;\n          height: 4.64rem;\n          display: block;\n          margin: 0 auto; }\n        #rbd .test-ul .content .imgWarp .tips {\n          font-size: 0.37333rem;\n          color: #999999;\n          letter-spacing: 0;\n          text-align: center;\n          line-height: 0.37333rem;\n          margin-top: 0.49067rem; }\n      #rbd .test-ul .content .item {\n        padding: 0.48rem 0.48rem;\n        display: flex;\n        justify-content: space-between; }\n        #rbd .test-ul .content .item .left span {\n          font-size: 0.4rem;\n          color: #333333;\n          letter-spacing: 0;\n          line-height: 0.4rem; }\n        #rbd .test-ul .content .item .left label {\n          font-size: 0.32rem;\n          color: #999999;\n          letter-spacing: 1px;\n          line-height: 0.32rem;\n          margin-top: 0.16rem; }\n", ""]);

// exports
exports.locals = {
	"rbd": "rbd",
	"test-ul": "test-ul",
	"head": "head",
	"white": "white",
	"item-border-redus": "item-border-redus",
	"content": "content",
	"imgWarp": "imgWarp",
	"tips": "tips",
	"item": "item",
	"left": "left"
};

/***/ }),

/***/ "./node_modules/react-pullload/dist/FooterNode.js":
/*!********************************************************!*\
  !*** ./node_modules/react-pullload/dist/FooterNode.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = __webpack_require__(/*! ./constants */ "./node_modules/react-pullload/dist/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FooterNode = function (_PureComponent) {
  _inherits(FooterNode, _PureComponent);

  function FooterNode() {
    _classCallCheck(this, FooterNode);

    return _possibleConstructorReturn(this, (FooterNode.__proto__ || Object.getPrototypeOf(FooterNode)).apply(this, arguments));
  }

  _createClass(FooterNode, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          loaderState = _props.loaderState,
          hasMore = _props.hasMore;


      var className = 'pull-load-footer-default ' + (hasMore ? "" : "nomore");

      return _react2.default.createElement(
        'div',
        { className: className },
        loaderState === _constants.STATS.loading ? _react2.default.createElement('i', null) : ""
      );
    }
  }]);

  return FooterNode;
}(_react.PureComponent);

FooterNode.propTypes = {
  loaderState: _propTypes2.default.string.isRequired,
  hasMore: _propTypes2.default.bool.isRequired
};
FooterNode.defaultProps = {
  loaderState: _constants.STATS.init,
  hasMore: true
};
exports.default = FooterNode;

/***/ }),

/***/ "./node_modules/react-pullload/dist/HeadNode.js":
/*!******************************************************!*\
  !*** ./node_modules/react-pullload/dist/HeadNode.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = __webpack_require__(/*! ./constants */ "./node_modules/react-pullload/dist/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeadNode = function (_PureComponent) {
  _inherits(HeadNode, _PureComponent);

  function HeadNode() {
    _classCallCheck(this, HeadNode);

    return _possibleConstructorReturn(this, (HeadNode.__proto__ || Object.getPrototypeOf(HeadNode)).apply(this, arguments));
  }

  _createClass(HeadNode, [{
    key: 'render',
    value: function render() {
      var loaderState = this.props.loaderState;


      return _react2.default.createElement(
        'div',
        { className: 'pull-load-head-default' },
        _react2.default.createElement('i', null)
      );
    }
  }]);

  return HeadNode;
}(_react.PureComponent);

HeadNode.propTypes = {
  loaderState: _propTypes2.default.string.isRequired
};
HeadNode.defaultProps = {
  loaderState: _constants.STATS.init
};
exports.default = HeadNode;

/***/ }),

/***/ "./node_modules/react-pullload/dist/ReactPullLoad.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-pullload/dist/ReactPullLoad.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _constants = __webpack_require__(/*! ./constants */ "./node_modules/react-pullload/dist/constants.js");

var _HeadNode = __webpack_require__(/*! ./HeadNode */ "./node_modules/react-pullload/dist/HeadNode.js");

var _HeadNode2 = _interopRequireDefault(_HeadNode);

var _FooterNode = __webpack_require__(/*! ./FooterNode */ "./node_modules/react-pullload/dist/FooterNode.js");

var _FooterNode2 = _interopRequireDefault(_FooterNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function addEvent(obj, type, fn) {
  if (obj.attachEvent) {
    obj['e' + type + fn] = fn;
    obj[type + fn] = function () {
      obj['e' + type + fn](window.event);
    };
    obj.attachEvent('on' + type, obj[type + fn]);
  } else obj.addEventListener(type, fn, false, { passive: false });
}
function removeEvent(obj, type, fn) {
  if (obj.detachEvent) {
    obj.detachEvent('on' + type, obj[type + fn]);
    obj[type + fn] = null;
  } else obj.removeEventListener(type, fn, false);
}

var ReactPullLoad = function (_Component) {
  _inherits(ReactPullLoad, _Component);

  function ReactPullLoad() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ReactPullLoad);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReactPullLoad.__proto__ || Object.getPrototypeOf(ReactPullLoad)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      pullHeight: 0
    }, _this.getScrollTop = function () {
      if (_this.defaultConfig.container) {
        if (_this.defaultConfig.container === document.body) {
          return document.documentElement.scrollTop || document.body.scrollTop;
        }
        return _this.defaultConfig.container.scrollTop;
      } else {
        return 0;
      }
    }, _this.setScrollTop = function (value) {
      if (_this.defaultConfig.container) {
        var scrollH = _this.defaultConfig.container.scrollHeight;
        if (value < 0) {
          value = 0;
        }
        if (value > scrollH) {
          value = scrollH;
        }
        return _this.defaultConfig.container.scrollTop = value;
      } else {
        return 0;
      }
    }, _this.easing = function (distance) {
      // t: current time, b: begInnIng value, c: change In value, d: duration
      var t = distance;
      var b = 0;
      var d = screen.availHeight; // 允许拖拽的最大距离
      var c = d / 2.5; // 提示标签最大有效拖拽距离

      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    }, _this.canRefresh = function () {
      return [_constants.STATS.refreshing, _constants.STATS.loading].indexOf(_this.props.action) < 0;
    }, _this.onPullDownMove = function (data) {
      if (!_this.canRefresh()) return false;

      var loaderState = void 0,
          diff = data[0].touchMoveY - data[0].touchStartY;
      if (diff < 0) {
        diff = 0;
      }
      diff = _this.easing(diff);
      if (diff > _this.defaultConfig.downEnough) {
        loaderState = _constants.STATS.enough;
      } else {
        loaderState = _constants.STATS.pulling;
      }
      _this.setState({
        pullHeight: diff
      });
      _this.props.handleAction(loaderState);
    }, _this.onPullDownRefresh = function () {
      if (!_this.canRefresh()) return false;

      if (_this.props.action === _constants.STATS.pulling) {
        _this.setState({ pullHeight: 0 });
        _this.props.handleAction(_constants.STATS.reset);
      } else {
        _this.setState({
          pullHeight: 0
        });
        _this.props.handleAction(_constants.STATS.refreshing);
      }
    }, _this.onPullUpMove = function (data) {
      if (!_this.canRefresh()) return false;

      // const { hasMore, onLoadMore} = this.props
      // if (this.props.hasMore) {
      _this.setState({
        pullHeight: 0
      });
      _this.props.handleAction(_constants.STATS.loading);
      // }
    }, _this.onTouchStart = function (event) {
      var targetEvent = event.changedTouches[0];
      _this.startX = targetEvent.clientX;
      _this.startY = targetEvent.clientY;
    }, _this.onTouchMove = function (event) {
      var scrollTop = _this.getScrollTop(),
          scrollH = _this.defaultConfig.container.scrollHeight,
          conH = _this.defaultConfig.container === document.body ? document.documentElement.clientHeight : _this.defaultConfig.container.offsetHeight,
          targetEvent = event.changedTouches[0],
          curX = targetEvent.clientX,
          curY = targetEvent.clientY,
          diffX = curX - _this.startX,
          diffY = curY - _this.startY;

      //判断垂直移动距离是否大于5 && 横向移动距离小于纵向移动距离
      if (Math.abs(diffY) > 5 && Math.abs(diffY) > Math.abs(diffX)) {
        //滚动距离小于设定值 &&回调onPullDownMove 函数，并且回传位置值
        if (diffY > 5 && scrollTop < _this.defaultConfig.offsetScrollTop) {
          //阻止执行浏览器默认动作
          event.preventDefault();
          _this.onPullDownMove([{
            touchStartY: _this.startY,
            touchMoveY: curY
          }]);
        } //滚动距离距离底部小于设定值
        else if (diffY < 0 && scrollH - scrollTop - conH < _this.defaultConfig.distanceBottom) {
            //阻止执行浏览器默认动作
            // event.preventDefault();
            _this.onPullUpMove([{
              touchStartY: _this.startY,
              touchMoveY: curY
            }]);
          }
      }
    }, _this.onTouchEnd = function (event) {
      var scrollTop = _this.getScrollTop(),
          targetEvent = event.changedTouches[0],
          curX = targetEvent.clientX,
          curY = targetEvent.clientY,
          diffX = curX - _this.startX,
          diffY = curY - _this.startY;

      //判断垂直移动距离是否大于5 && 横向移动距离小于纵向移动距离
      if (Math.abs(diffY) > 5 && Math.abs(diffY) > Math.abs(diffX)) {
        if (diffY > 5 && scrollTop < _this.defaultConfig.offsetScrollTop) {
          //回调onPullDownRefresh 函数，即满足刷新条件
          _this.onPullDownRefresh();
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  //set props default values


  _createClass(ReactPullLoad, [{
    key: 'componentDidMount',


    // container = null;

    value: function componentDidMount() {
      var _props = this.props,
          isBlockContainer = _props.isBlockContainer,
          offsetScrollTop = _props.offsetScrollTop,
          downEnough = _props.downEnough,
          distanceBottom = _props.distanceBottom;

      this.defaultConfig = {
        container: isBlockContainer ? (0, _reactDom.findDOMNode)(this) : document.body,
        offsetScrollTop: offsetScrollTop,
        downEnough: downEnough,
        distanceBottom: distanceBottom
      };
      // console.info("downEnough = ", downEnough, this.defaultConfig.downEnough)
      /*
        As below reason handle touch event self ( widthout react defualt touch)
        Unable to preventDefault inside passive event listener due to target being treated as passive. See https://www.chromestatus.com/features/5093566007214080
      */
      addEvent(this.refs.container, "touchstart", this.onTouchStart);
      addEvent(this.refs.container, "touchmove", this.onTouchMove);
      addEvent(this.refs.container, "touchend", this.onTouchEnd);
    }

    // 未考虑到 children 及其他 props 改变的情况
    // shouldComponentUpdate(nextProps, nextState) {
    //   if(this.props.action === nextProps.action && this.state.pullHeight === nextState.pullHeight){
    //     //console.info("[ReactPullLoad] info new action is equal to old action",this.state.pullHeight,nextState.pullHeight);
    //     return false
    //   } else{
    //     return true
    //   }
    // }

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      removeEvent(this.refs.container, "touchstart", this.onTouchStart);
      removeEvent(this.refs.container, "touchmove", this.onTouchMove);
      removeEvent(this.refs.container, "touchend", this.onTouchEnd);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (nextProps.action === _constants.STATS.refreshed) {
        setTimeout(function () {
          _this2.props.handleAction(_constants.STATS.reset);
        }, 1000);
      }
    }

    // 拖拽的缓动公式 - easeOutSine

  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          action = _props2.action,
          handleAction = _props2.handleAction,
          hasMore = _props2.hasMore,
          className = _props2.className,
          offsetScrollTop = _props2.offsetScrollTop,
          downEnough = _props2.downEnough,
          distanceBottom = _props2.distanceBottom,
          isBlockContainer = _props2.isBlockContainer,
          HeadNode = _props2.HeadNode,
          FooterNode = _props2.FooterNode,
          other = _objectWithoutProperties(_props2, ['children', 'action', 'handleAction', 'hasMore', 'className', 'offsetScrollTop', 'downEnough', 'distanceBottom', 'isBlockContainer', 'HeadNode', 'FooterNode']);

      var pullHeight = this.state.pullHeight;


      var msgStyle = pullHeight ? {
        WebkitTransform: 'translate3d(0, ' + pullHeight + 'px, 0)',
        transform: 'translate3d(0, ' + pullHeight + 'px, 0)'
      } : null;

      var boxClassName = className + ' pull-load state-' + action;

      return _react2.default.createElement(
        'div',
        _extends({}, other, {
          className: boxClassName,
          ref: 'container' }),
        _react2.default.createElement(
          'div',
          { className: 'pull-load-body', style: msgStyle },
          _react2.default.createElement(
            'div',
            { className: 'pull-load-head' },
            _react2.default.createElement(HeadNode, { loaderState: action })
          ),
          children,
          _react2.default.createElement(
            'div',
            { className: 'pull-load-footer' },
            _react2.default.createElement(FooterNode, { loaderState: action, hasMore: hasMore })
          )
        )
      );
    }
  }]);

  return ReactPullLoad;
}(_react.Component);

ReactPullLoad.propTypes = {
  action: _propTypes2.default.string.isRequired, //用于同步状态
  handleAction: _propTypes2.default.func.isRequired, //用于处理状态
  hasMore: _propTypes2.default.bool, //是否还有更多内容可加载
  offsetScrollTop: _propTypes2.default.number, //必须大于零，使触发刷新往下偏移，隐藏部分顶部内容
  downEnough: _propTypes2.default.number, //下拉满足刷新的距离
  distanceBottom: _propTypes2.default.number, //距离底部距离触发加载更多
  isBlockContainer: _propTypes2.default.bool,

  HeadNode: _propTypes2.default.any, //refresh message react dom
  FooterNode: _propTypes2.default.any //refresh loading react dom
};
ReactPullLoad.defaultProps = {
  hasMore: true,
  offsetScrollTop: 1,
  downEnough: 100,
  distanceBottom: 100,
  isBlockContainer: false,
  className: "",
  HeadNode: _HeadNode2.default, //refresh message react dom
  FooterNode: _FooterNode2.default //refresh loading react dom
};
exports.default = ReactPullLoad;

/***/ }),

/***/ "./node_modules/react-pullload/dist/constants.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-pullload/dist/constants.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var STATS = exports.STATS = {
  init: '',
  pulling: 'pulling',
  enough: 'pulling enough',
  refreshing: 'refreshing',
  refreshed: 'refreshed',
  reset: 'reset',

  loading: 'loading' // loading more
};

/***/ }),

/***/ "./node_modules/react-pullload/dist/index.js":
/*!***************************************************!*\
  !*** ./node_modules/react-pullload/dist/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.STATS = undefined;

var _constants = __webpack_require__(/*! ./constants */ "./node_modules/react-pullload/dist/constants.js");

Object.defineProperty(exports, 'STATS', {
  enumerable: true,
  get: function get() {
    return _constants.STATS;
  }
});

var _ReactPullLoad = __webpack_require__(/*! ./ReactPullLoad */ "./node_modules/react-pullload/dist/ReactPullLoad.js");

var _ReactPullLoad2 = _interopRequireDefault(_ReactPullLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ReactPullLoad2.default;

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/RedBagDetail/ReactPullLoad.scss":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/RedBagDetail/ReactPullLoad.scss ***!
  \*********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./ReactPullLoad.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/RedBagDetail/ReactPullLoad.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("d632a36e", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/RedBagDetail/RedBagDetail.scss":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader??ref--12-2!./node_modules/sass-loader/lib/loader.js??ref--12-3!./src/components/RedBagDetail/RedBagDetail.scss ***!
  \********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./RedBagDetail.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/RedBagDetail/RedBagDetail.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("4befbfc2", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/assets/imgs/RBrecord.png":
/*!**************************************!*\
  !*** ./src/assets/imgs/RBrecord.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgoAAAIKCAMAAAB1H5dnAAAC+lBMVEUAAADj4+Pi4uLi4uL////p6enx8fHt7e3n5+fp6enb29vw8PDs7Oy0tLTi4uLm5ubi4uLn5+fl5eXm5ubm5ubn5+e7u7t4eHi0tLTh4eHn5+fm5ubm5ubn5+fn5+fo6OhxcXHAwMDh4eHn5+e0tLTi4uLl5eXn5+fm5ubn5+fp6eni4uLh4eHn5+fl5eVwcHDh4eHh4eHn5+fn5+fn5+fn5+fn5+e0tLS2trbm5ubn5+fn5+e0tLTi4uLn5+fi4uK0tLS1tbXn5+d0dHTh4eG0tLTR0dHh4eG1tbXl5eW2tra1tbXo6Oi1tbVubm7p6enn5+fn5+fi4uK0tLTi4uLV1dW0tLTn5+fh4eG0tLS1tbXo6Oi0tLS3t7e6urq6urrX19e0tLS0tLS0tLS0tLS4uLi3t7e6urrV1dW0tLTn5+fm5ua0tLTi4uLi4uLn5+fi4uK0tLS1tbXn5+e1tbW1tbXm5uabm5uKiorr6+u0tLTn5+fm5ubn5+fi4uLW1ta0tLTOzs7i4uLi4uLR0dHn5+fi4uK0tLTi4uLn5+e1tbXp6enl5eXo6OjX19fn5+fS0tLm5ua0tLTV1dXc3Nzb29vh4eHa2tq0tLS0tLTi4uLn5+e0tLTi4uK0tLS0tLTq6uq1tbW0tLTm5ua3t7dycnLKysrJycnn5+fKysrm5ubn5+fm5ubLy8vX19fd3d3m5ubi4uKzs7PU1NTi4uLi4uLDw8O0tLTT09Pi4uK3t7fr6+u1tbXW1tbMzMy0tLTMzMzQ0NDHx8fHx8fk5OS3t7fU1NTa2trMzMzJycm/v7/o6OilpaXJycnIyMi2traYmJjl5eXJycnv7+/h4eHm5ubPz8/b29vNzc3U1NTW1tazs7PJycnX19f19fXS0tK3t7fe3t7k5OTa2trg4ODZ2dnFxcW6urrd3d20tLTKysq/v7/y8vLT09Ps7Ozn5+fp6enR0dH09PTr6+vu7u7x8fG2trbBwcG9vb25ubno6OjHx8e8vLy+vr7JPbSyAAAA03RSTlMACfcBBgQKD/IVBQIN+u1W/HpedWZiDwn18YVC+axJHhMMzsemcE05NCkY9OSKPgXo38G0mZB/akQl++bexKOfilRFH/rmwb2gl05KMC8bEv3g2tPJx8W6tZ1ybUA6HRbr17uvWycjE+Xa18/Asamdg353cW5gWi8mG+7c2dPRzsnHurexsKaYlGplTywj+/r57+vd2tjX1s21rKiTioJ6PDYqIRoO/ff27uzq4+Lg3drT0b6Qfmrw7cAzJh/219DPpYV1UiHz0JBxWVI3fXc4GvtMj0V+wgAAIC9JREFUeNrs3btqKlEUBuAVgs2EaYdpBd/BKSy0ECRiJQiKF7xFBBvFNFZ2ActUChJR8gQ2gUMgVerzAP8T+BYn3vckOSEJEzO6/6+dTrZzWftfawsRERERERERERERERERERERERERERERERERERERERER0VrjOuwIUTFhApg/CunNitpYaVpCGjM6PWwNhPRV7GMvJKSvDLgUaMmBKiykrRwUkTMhbYWxVy4K6auOrduuIaSH83oyVpTXxlix74JCOmgk70Y9AGbIEDcjagLmTUlIB6kqdkbyWiPv8HVRE38eoPgrpK0MVG0hXT3D5U5IVzO4JIVOXzB2U63WAuLWMKFIB4ROXD1XMbFUscQthL30vdBpSz5hZyxujSFWFuXs5bnQaatBYVriFgy3MtWJw4ySBho2VHUhXdXg8iykqy5UQyFtXUJhT4W0ZTSxkykIaaxwiyWz1UkJacNyZoa89hgdZrIxfi7qpFABELkU0pzTwlpeSGdOBltNIX0FolAwqK6xMFQzIW3FobDZtKAvi7E0Wgua2EvwpqCzFrbmLCvoLWVjpc8okvbyaWDRYmKZRAIzh72NRES6Mx45UJNeGJNbIO2I94yrafI6F23HDHnrvjbpxgrP7LH3j/sMlsxL8dhV1cZGOSWvdbcXe1VWLvzhbxxrkYB4KtXDXsQStxgr234zMLFVEE+1PpzSmIaKuenfN/6xDvgSXEIfXk0I/bIc9hZF+ZaAM27a8ZuGuKXgciMuZ3CpCP0uw8beSL7BSGZvsRK5f7O5qRqIWxmc9+wneeylLfmy88EtdrLiFvpw6MYlVJfiFsj1e5kOpzseTgE7I0u+rg2FeSEuVhk7lZK8VrP/v4oCLSzFw0xKHIbaHx+9kK+7gktJ3M46rfJTJTRuD+ryDit2lx09xWE2wwFxm2AjUuMe+YHcYcWOeZCF7RnyHRfy1hw78z9CP0vNuGdm8i0TqG7EMyb2HtiheyD1cM6Rb4pBMQ+KZ8pQ9IV8T2mvj3fOxDttqK6EfG8ax1IkWjgXLxl9KPi2cAxKnVGonRLPGVETW2ZDyFdSuUFKDqeYYCXSn6Z9AIuQIYczq2JpyJEeflLKLn5jBzE1zlTCTDn5SCD3wPZ6elEaYu9aSFtGE4qakLauoTBZ7jkhwWjcjLeD8lkJKLJCJ8PqY6l1Jp8Uwl6W+YET0sZa5+sPiCb7qk9KHGtp+aRgEysPHd4STkoJG3H5rGIagJngOVAnJo+NsnzaudMN+2EhXOWnjLd5p4aNqhyZYhVAhDOGva8S3MhxCc6xZHIteCWMjbEcly7WMkLe/qKIynGp8Ngyj+WwMZHjUuGGmMccbMTkP6bdsB/PAUqw9u0xI4KVeFDe1ajiRcJ/3Yo5bKSFvFGw8cJOyruCQ7/+9fLYsC+EvFFMpCOJurzLqPj2eGELWxwmdwDnCR+nlSLgSVaHE/VzWinEDpnDGWBn4bsHxK5k/sAw/I+zeoCPy9LBMlbaQj/tGjtD/31M/mPv/l/aOOM4gD/GqIglDa4dBGEymbZ+oehvK0xkRSZjHQVxIPtp+2FjvyiyjcL2Q8da6GRsIFurTCj7oWNjP6xjtIXul22Msf0BfnjuLk+CCYnRMzgIjETRwXa5u/gkanzO3D3PxTwvJdzjlVbqO/d87vk8iQi9/WtxlVTeQHjva2J7wZ/v/t/8yuvvy222PLxILF/I/+8G9/QX1hqOLNEb3vPFF7J/KO/bJfTWc2++8ImcHRpec5N0iCBqKAPnZ6eGwiAdJnSrC51+r774yrOo+ewUSFXdO+0brb/5yrhd+L0HpOP0olPNfhe0TZCOEzndFcOnhMgssDrd5cJzRGaB2VnkBx/0Lk9GxkM3xq63ehQFooLk+6tCR98ENWPNtyP3vEv2rYJUTUh4rdDWOwllIueRa+7nSUkiCf62oWlJEKcTiXX5UQQOGHMrnwOLcZ2UaOBn6YxOSF4FUeaRUF0zcKhbrS4lAUDT66NaSBfEfpMvNyNxWs/9BEcZbUO1ay/+/ZpeF1eFXZHTmNgkdN8LQRU3BlxKApWFdR8XCzmR05jQJFyYDUN1k/drT4JlK09MGfCruC40CmOikhDsZGkJDPfXnATbNjHlwaeS68SmK8CZuCQMPB4GJqGLtSThBpSkdWJJgz9lSEkGuBvrQCJcHBsHVoNd6KSuUUmAKLHo4E8KKdlJAl+CktBydhScCPzhRhJAJZZt8CeN2PQ14EtMEq49NQQOhTtP9i/1AC1DfF42RoktB3wJScJnLwfgBHqRc209UGb7sDWm5GYms+qT2iGpE9Mu8MU7CXTDybm5mpMAOrHEoURLkP8lVH8sNWBSlOUezdstiKu23hE4ufnm2pKwHwU9CTYlQUz5TV+EAeeN+SsJXHFPwuVHgzy/37YpqLROTFkoUUmJ7ovWRDLOvSvJOQnNV6ahZtNNNSUBMDFhKCkYY79Xk16b5ZiE1nOL4IbRtlqSAOnMgZ/4LqFFoRFxSALdcHJJT7vzJNByhe2CBpQtQtuFBsQvCZeWw+CeyW7GJLAqEEoB+EorINwyhyRQDScXDTE0p86MArP0LhG0AzaNszrRM0kQiFsS2qiGk2tCV11IAi2V0QU0A+OZPCnaToNAy0HEQ+cweCFyyY0k0JRdvZiEHByQSiXBA9qePzbjz/BJwhx4JNDnShJoG2p2O5OCSrkdY89TZnUD3KUSShaE4JiEp8Az4evoSK2j4BpMbOubbqYhpRPKDvDGOQn3A+Ch3iOT8DO4Jp0g+xIpcM0moRWAM85JQLPgqcfeJwE0QlsHl5jNcvGvypjmlISmQfDWo2avkwCr5JilyJSmxY8uK5PRnLqbyWYzcShjXhWEv5yXVxLQFfDaWMvB/E2AmxRSBkO5tX+JKZ/FcIBSOPIlOHStkI2CGLeCiJPz4LmZoBdJoGUJbQvKbCSq3QUoiWpzgGrVH5sKiMA1CagXvDdxpjwJN8FlyT1y9ItuM4SmQrlM9cpQy+Z3ChoIc7MJcdMJHExd8yIJNJzNE5O+CuV2CG0PyuUrSk5/4ZkE1A88LH5AJ8EbcbWQIGRbgzKVUdChTJoU+XSHNdckoI5h4GHkMjIFbwGrVCaRKMTBiWQaDshWed6bG6b8sbZ80MSxSai/YuF/w1edJiGad2d3eZTQYlBOJZQ9X2ybFJUE1DQCXEQuOEsCrLv1mhNVp2aAJJSh6kbxfehyE62It/4IcBF4BgWngVnUvflbUQvZvZ08IYlYGg7QjNWlmLoV91UQ4OdWxN8lTlkYvz4bYLdAbGrAJYOB+kFdE3i6OgwcDD78BTsQoza740bzZCnQi4T4fAS89uPD72Ob2Ik8sa3jxvJl8ccxh4QYuAFeCr/28bexmMMoZEjJLm4cC0shMM13IBHaRsEzww9/iBVtYke2iW0PN4ond8ah5HYQidA0A97466XvYgbnUdi/CdzBjeHLIShzqwmJ0DIG7ht8+Fts3yZ2JtNQV4WFpUGoNNqGRGi+By4been7GG0TO7ROTBl86r3zYxgOcv4WiH7c8Br+yCgVa4uCmiCGbXzaLQ3DESa7kRCdYXBJyC4VnUeBpmZ1PZE55esKf94NwNGG+pEQfQFww127VKyMgnTAgxGoLnQRCXEhBLUKvGaUijIKTJYiDLV3FxLis2EXSkUZBQPTIgKLQB8S4v4knFyxVJRRMLAsIrAKdyIh2ntqKhVlFDDzIgK7XiRE28SJS0UZBSZPqEUEBgKbU8Fl56XiL7FYTEaByd0QOCG2OdXxMjgxZJSKnKKgFhL6Th2vNCzcCYATwptTaA6Y/WWUiryioK4TQ6JOl6LfGYGTm25CQvQCk8hLVKnIIQpZYlmvv9kmdzcCTvilOYWuj8Ox7nxMlYpcopAnJf/W1yzxp1Eq1qinHQlxZRCqGqdKRW5RIJSdOsrCgyFwwm/NqQshhlKR+1WBksX1YeHuIDjhw+ZU/5FR/us3qlTkWytQdFwPnoyEwQGfNqe6F+EQkdeoUpFzFNQdQqmDGeJBCNwVEdScujbFWCryW1fI1tFVYYHqN7HwdXOq9WbF1iSqVOQYBdrmOrH8i33tjSFwwvfNqeAsVbN8/H+pKDwKGFtvtZvw9fzwIAJO1ENzqmMeTEtGqeiLKGC1sKMnsj5OgtNFhDppTqHHpVLRL1HwuXeGwWvzzUiIcz8apaKMApPVOwHg4HYLEiA4AxKr1BrwIKY5FZwGiVVcVePAg4jmVNNNkFhpWFVxFHjg35xqnQCJjZUEVdWAB97NqTOjILHaMpOAVS0NXAx9jrhpmwKJUXJLxaoJb3HKwuQZxMm1HpAYJXPYCAFWjQ81xykLTyE+2m+AxCiJVTME1hyxmgQeehAXAz+BxMRKgpUG8yjHJQuDiIeBRZAYbdgXBOMDmweYRxZCiIPuSZAYbZjXBCsEKjYP8AZ4bgZ57/4ISIwUKwl2nWAozhYKeK0Lee7zIZAYpVQrBZj6NMdeZ+ER8lz/MEiM4qpVMtoXBXqcAg9FelE1vni/jUYSp8pF64Mer4FXRt7j0I+6GgKJUdQqE+wQqJXjOHji5z9akPcuyiSwSmt2mWA/YGpsPniQhcDYVcTDhQhIbNIafREwjivHxoMG7hp+zKk7fWkQJDbJVbsksO4ZrBE9VrHLjcqps0HER5dMAqtkzvih01PDoWM3G5Xjty8iXq4EQGJBJ4EuFCvG1udWElwQmhtAx/LZu7k2ArMVSX8YY+pr1LErjcqeziDi549xkNhs2HVhqTVtHB49rrE5FV6+hHg6GwaJjWI/6akGlP0Vemx9EdfWnArd60ZsfPe+76eesl8XGo/2EabuITH1WNt1YfFcK+LrvEwCqzVVrdyfYF8Q0po9psoI67wCJzB9pRlxdg4kRnG8XxlWLDEmVxSNGlPnT5SFwfnLiF19/Zby0yCuVswB9thIwoqiRPfH9HnjIAVOjPS2IQf8+LuCTreo9eO1ywRqf8LGihEFJYorzu+P14DZRF8HEuAxSGzSmr3ATD33rQNlxYyCEreXGunz5lEc2Kx9hoSYA4lNegurBrsupKvG1IpBMbNQed4cM2YhGccYCXEPJDbpVdW85lP3DPYyc3ylSLGzQJ+n9zNE4Rgbxc43EuERSGzSOVyxP2F/HP+HjoKSsgNwcD+DBlWkUznzjyIW8poghP1aOPopvn/XGDWSYFAsqVzpPJ0J42Gr2sxg33Ig/vpAYk2CWrE/YX+s/b1iUWypVeo8vZ/hyKb1hlaaeUTUCs3y9Q7/sXMGO27CQBim932GXnvrw/RB+rITzW+QENoQpFxog9JTT5U3MjsejLF6CI7MRxT8a8O/0moUI+bfSQR+nFneDIhKIHwSzjOsNSoxzv77fCt8Ox0kAZk/UHmE8RfNQDAuPj/XA9QtQsuef3IpHM+bn4RuRerjceru9AkktcoviExDfRVbT8NG+1dpHA+cn01vVD5B6OlOAnjU8vP2JXTX4v1yulzb0ffba4P4ejrYZjCqASX/g/5GEvg0c0OK/fyCXUk/o4qmejpvR3Apre2g5yc43d3IA4qWdX7BmSg/lW+oEjkeOj+Ryyi6DfyxEqff5ANNKzvWYiH8hP+OG0T15Zi3FAeTm5ewzCcsK4EQqAW/eozWQf9qB96Oaa0RriOb1fwBmzNpsGSYGxFiTxA66F/twvefP447hiXvVzTzvAT7tswfnGkBAgwqv2BXQgf9qzxxpeoqtkQtd3S3ONMShOg7Y9z1Ou8Q9s+3FHR/vkBtV/7PTxQAYTrverPtX+WJUf35Q9vFhUJghVFcz1v++W4QLJov7ihNs56s8k5BsEbtrjduse6f8QbBxqj+PBemXfPAaQaFQaQWnKc9x/2z/VZQ8wK4RM2+Bq2AWC2k/75s7xWMnh9QlmbDSve0BiLU8/VR/5zvFXR/vkBtPD3QKojRRvx3zyskoecFFKhlconbP7QKorSr/vvnFZLQ8wKK1Hb90LFKIMQZWOcXwnqq8kTPCyhNs4wh2SBjBGzWQji/ILUZW1R5YuT8ALsuTBuZJ4hXAmG7FlT6RfkbHgcg21JQA2vL0jJdYmykNQo26V0JBP256YF8S0HPCyhTf7yPd4qDbfrO82fhP7UAci4F3U8vT7vq6O60AVLogvMZuB6A3EtBzwsoUH+cphttgSTq2X9uWXcNgPxLQfxx7LlA/ZA32gRpNKLdYP2nFniNUtDxzvK0ff2lbZBIP4obhnoAXqQU2Min5FyeZhFujoNk+ma0vlPd9sCrlIKM3LijPH2mFPA/vE4p/GPnjlUYhmEoiv7/971Q0kLeUDoKQh28FzdKh2bLqnsnaz+TLTzfzu/15eanoMC+wjhOggL7CmOeBAX2FcYl4Coo1N5XyOOyCQq19xV2DI9VgkI2//0HUGZ+35fXJkHhlwgKUIACFKAABShAAQpQgAIUJChAIYMCFDIoQCGDAhQyKEAhgwIUrhZQoG/dHQo0am5QIEnddocCSc12gwIpPAooUPOoQaF84b2AQvV8BIXihY8CCh927m63URgIw/BKe/9XZ68ISB4IhRApw48An3C0qoTa1LGrBlA7lb/nAjInrwi2gbjRO6QQNaZ3jBRiRveQQsSY7jFSiNdI90akEC2mjxgpxIpcSCFSTC6LFOI0kmtECnGiR0ghSkyPGCnspE+3prmdtAoSOI58kMIu/aVYXXoVIG8ckw8jhR10U7xptPKTN478kMJ2fVPcaXrlJW6cJT+LFDa7FB9clJe4cUx+jBS20oVDKx9x4ygEKWx1Khwn5SNtnKUQixQ2uhWOm/KRNo4phJHCRk3haJSPtHEjhYxIASkgBRlX7G8eR2FIIa7bRlwVsJjEbSO2mJACNp6xr4DjKOw24pAaZxB4dGX/GmLEIXV8LPlYpBAhPNuIFMItMJ54jpR13pm0eDsqXvi+AlJ4Y5lHGpktvsUE+PI7IAWkgBSQAlJACkgBKSAFpIAUkIJSSAEprJACUlghBaSwQgpIYYUUfk0KU1/qc1KbLEvbNm/TzJg6OetymZRMSOF4Xa+vps3DTKL7TkmDFI41lEmaf0malIOSBCkcZwpnEM5Bzt8FUjhIp02+idFCakAKP9KBW4OEOweksN+/l9wjNa/rhX6Ypm6e1dx1w7C8rilMmnvUpXoWUhCWQldluaM1109XCN2ir+YxnapTT0IKglIYEjeDulpm9QXzUtXugjMZ1FOQgpgU3BDSsy+DsLk/O1eHl6diQApCUnBCyKph069UmZArQ3KQv39E+s/O2YM2FUVx/IgxJhgofhQhNioKWgUVjBVsoKCCoIjWQRRE6Fjs4CBoRcWlDsUvRJzcBEFUxEHcHNTFb9SXQ7kX7pCkgS62gp2cTF5eajwmee8l7+OmPT9D9b90yY97z733jwbBLxFE7mcbvyondJDBKxX2r1+tnQ3x7rThE9O5f8f/WaM9sFj7+6acDZCaqnDgywW9bNi66kQ/ouEPeeHBgkCXhpohUjg7WuqpghS3DrzVxob4qZ2DWMbwg5/KlyPgdLZGMOXAL21VkEITG6Ln0/1oYfjAzI+/ImSnvb2jqFkZcoYdmqogTBcqNhx5uAPCYsnagRgi+qmC8vFSaDYrXLigqQolpJBlHV6Nfdh/5GEoS8ONvgwi+qyC8Gm4owOpMOzQUwUplBTmnxJi+N3p0kYBwRLt3ogUwwcKlc38t+ETP1Vnq2BuD+aPyt/y+PvRQDeK3l0xxEBU+CX9GfHpAWXSsENPFaQQSighpKxsE6XPq9eH9q8PRoboqhGsi+EHszMzs4avTOeE6NixUUpR+ZQp/8v8efXl/iP+HyguJh9jAwwmlA3CREmhLBfKDL3z+0Cx+X4/IqugkQpCKvMzNzFIy4hXYz7uE8u6yqMiq6CVCkpUrhYqi4KsyVIcf+mPDJHu54isgm4qiMqCYK0KkuS7772XITJ+DJFV0E8FZX3v5UWhHGpzWYZnb72VIboyg8gq6KiCUNXtwPyQXEIOfxn1TIYl4xlEVkFPFZQ5JljfvpJ18/Dn0fXLoH0Wdz1HZBV0VcG6VFDWotAgD7/c3/7rxJqNiKyCtipY986qetWo6mcpjh86shraYU8akVUwDI1VkH+nAilF4yzHPrUhQzTZg6xCGW1VqLxKmg8R5vfdOEv56t3o+hZ3iU3HEFkFE31VqPYVrPNj0yyHX7a0MKxLI7IKFtqqMNdXUNZ2YJPHLrhfGLpjyCrMoa0KtK9gm4fcLgxb04iswl+0VYH2FZRNlsLlwtD1GFmFWvRVgfQVbHPpZ2lh2AHOiA4gsgr/oK0KtK/gLL8edbZJ7LmCrAJBXxVIX8FZllc/OdkkNt1BVoGirwqkr+A0D32w3SSW7R5EVuE/9FWB9BUc51tvbFyIpBBZhf/RVwXSV3Ce5VjTgSFxAlmFeuirAukruMnHm7gQH0FWoS76qkD6Ca7y1QuNXFh3GVmF+uirAuknuMt3P9V3If4cWYUGaKtCk76CfS65UHddSIwgq9AIjVUg/QQ3WQlxdXQHUCI7kVVoiLYq0H6Cy6xKs+Ni2mBMIavQGH1VIP0E93lsPVFhJbIKTdBWBdpHcJ/lm4dQy+bbrEIztFWB9hFayLf21o6OR48hq9AMbVWw7SvYZzn0oGZcSCGr0BR9VSB9hJby2EOosg9ZheboqkKB9hFayx+qJ8olV1gFG3RVoUj7CK3lZ1+hwjiyCjboqoISkvYRWspvKstC4jGrYIeuKtA+Qqt5qLIsrEJWwQ5NVaB9hNbzZ/MQMcIq2KKnCkUhaB+hxSyGVwPAZmQVbNFShYKQtI/Qev4OAGdZBXt0VEHR/kE7Wb5eDPCUVbBHOxWK5sMi7SO0kYdWw01kFezRS4WCkrR/0H4+Dd2sggM0UqFgDouS9g/azu/hLKvgAF1UKChJ+wZe5ddwglVwgBYqFJT5fzHS/oE3WV6FEVbBARqoUJS0b+BplnfhKasQBu4PDOUNnfYNvMxD0MMqhIGbfaFgeiAk7Rt4m29BjFUIA/cXCFJI2jfwMstbcIlVCAPnBwYpab/AnzwEG1mFMHB2YJDSpo/gYb4HaVYhDOw9oP0Cv/NJSLIKYeDgIon2C3zOL2AtqxAo9iooJUqQfoH/uQsS/axCCDQ+MJjfC+0T+J8ntgJsZBVCwMYD0ifwP8sNALCcVQiBehdJooSkfYKAslwOAPEe9IhZg3HIdJ31gPQHgs25m1DiPnrEtME45Od/F0lC0j5BkFmmoMx29IhfBuOQfI0HtD8QRs4dBpOd6A0zBuOQqaoHNv2DgLJMQYXeQV4WgmXG8oD2B8LKucNgcZanhUD5ZQ2KtD8QVi6koMrWmFdbBLvgxISpoqJ9gTCzysRhjlXIo2NQzOZNDyTtD4SXc9ehhgH0ipmf03y/0JDp39miTf8g8DxxFmpJPEdvyefz2ezk5GQuZ5X3i0pJWbFw7sfCzlZfIOxcvJSAfzjcgz5CDclVDCkUyvUMRd/POQeYVawXCF2DGAbUkKkpq8Cj6Hs6Zz+y/LYW/mMctcM0JGsaUvZjoqhIx6v8UZzbyPkVUIfd2CHkK4qUBKkoYg4i9P2ds5OcXQl16cOOZs6QsiCmIUop+j7PuSbLbB80YBvOQyxDJietOcQ8y9D3+gWZVT4JDVk5iAuFfM1hpoy5htD3/Hmdi/2noAkr+nFhUzVkcm6bUUVJ3/fnRZ7o6YKmbIohY3eYsY671qWdDn0D93kqth1s2HIZGZeGZK0LkYI5iKjw+we2WU1eugG2JFLIeLWGTJUNqR5mhNCln1DI318KTli50AcGgt/H3cD7CRM94+CQNceQCY7830Wk5jDjWz9BZS8dBscsPYtM2OTRMqR63DVH1bb7CRP5+wlww/UnyOgJvRApqKKSTvsJKpv5CC6J8/TYUeSRvN2Z2wztS+QGdy0F92ziiWEe8M9xN395O7RENNmDzDzidjICrbLnBDLzhvQWaIePfPk4TzizFtpkyaoMMh3Pk1NLoH2iy/mJqsOJLU+AN8T7HiHTsTzadhS8Y+s2Xhk6lNi2OHjL0d13kOk4Ysk4eE9iOV9GdxiZ5UvBHxatuoJMx3ClOwI+si+9cJqwHc1geu1i8JmbfTxBak8muQ6CYOn4CDIas7MrAoHRu4uXBk2507cFgiXavREZ7djYHYUQ2JLkRoNWXN59E8Ji8fZdfPGkCZm+XgiXyPUUF1xCJzawbwlowNIV1/i5KkR60uejoA2JrhQfKULhzkBXAjQjen2AbQiYpwf3RUBLImu2cf8tMK4kexeDzuw5d4LHyD/s3D1r6mAUB/BA1SgVwpOXJa9DwOiFZIjJA1HI4BYQqlOGfIM4OASEYB0zFHu5dHYJdLloh+5Z73bnfJ/L3Trc3ra2tnnM+X2Gw/mfc3zMyck251EE6P5aPpTgZGK3V6Ex8UVFlMHkcAL7naBRxGka2P5Rgg9MBdS/pEjVVUUdyuFDykBUSUqFf2tJ2IYT1Du0hyiv6M54hEaOhvsSvNlYiabkhsKzPDZYwLd9Xm20cAQiNsYjtSxOgX/evWR27UcG+aPBK3xTcQaXh2fMFU6iqVrpqEiBpy9PzdYKVjtUTdH5jaPDLarc2y5fj0T4v4v7LdrFNT0/yAufU1MKPNEY/EZ+nTrEne4jZlCJx0fVlE6iIJyf9c4px5kp5LUdCt6oUaiRO7w+s9CQH0MnUT1oBEdo3k940bdJbxLyOnQQa6TVfmlChqZmsXgZxoRNEnfx3xLIoQROoVVILOcq+rzC0dGObd9MmPw7LIef4uJqYDGR6GT6ugqtYnSI7cwRk5XlQQF8oZY2lRgemcvM3ox/lp9j1h7HerY0OWFrFFcQAVXUpNNBX+qt+ASbga+E+mZ9eGd9jNqHh8eNPtw5Jk4ERjVuNfoMfzmuh0s6LaZ9I5cmam/LrFiB56OEQwiLpukGjhMErmuaoogxQhyXRDe8wGwnVv/W0zpdWP4AAAAAAAAAf9qDAxIAAAAAQf9f9yNUAAAAAAAAAAAAAAAAAOAkUT1ONCTGyKkAAAAASUVORK5CYII="

/***/ }),

/***/ "./src/components/RedBagDetail/ReactPullLoad.scss":
/*!********************************************************!*\
  !*** ./src/components/RedBagDetail/ReactPullLoad.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/vue-style-loader!../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./ReactPullLoad.scss */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/RedBagDetail/ReactPullLoad.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/RedBagDetail/RedBagDetail.js":
/*!*****************************************************!*\
  !*** ./src/components/RedBagDetail/RedBagDetail.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _toConsumableArray2 = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ "./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactPullload = __webpack_require__(/*! react-pullload */ "./node_modules/react-pullload/dist/index.js");

var _reactPullload2 = _interopRequireDefault(_reactPullload);

var _config = __webpack_require__(/*! ../../assets/util/config */ "./src/assets/util/config.js");

var _config2 = _interopRequireDefault(_config);

var _request = __webpack_require__(/*! ../../assets/util/request */ "./src/assets/util/request.js");

__webpack_require__(/*! ./ReactPullLoad.scss */ "./src/components/RedBagDetail/ReactPullLoad.scss");

__webpack_require__(/*! ./RedBagDetail.scss */ "./src/components/RedBagDetail/RedBagDetail.scss");

var _RBrecord = __webpack_require__(/*! ../../assets/imgs/RBrecord.png */ "./src/assets/imgs/RBrecord.png");

var _RBrecord2 = _interopRequireDefault(_RBrecord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var RedBagDetail = function (_React$Component) {
    (0, _inherits3.default)(RedBagDetail, _React$Component);

    function RedBagDetail(props, context) {
        (0, _classCallCheck3.default)(this, RedBagDetail);

        var _this = (0, _possibleConstructorReturn3.default)(this, (RedBagDetail.__proto__ || (0, _getPrototypeOf2.default)(RedBagDetail)).call(this, props, context));

        _this.getRecordData = function (currentPage) {
            return (0, _request.post)(_config2.default.REST.getRewardList, {
                awardSt: "1",
                currentPage: currentPage,
                pageSize: "15"
            });
        };

        _this.handleAction = function (action) {
            console.info(action, _this.state.action, action === _this.state.action);
            //new action must do not equel to old action
            if (action === _this.state.action) {
                return false;
            }

            if (action === _reactPullload.STATS.refreshing) {
                //刷新
                _this.handRefreshing();
            } else if (action === _reactPullload.STATS.loading) {
                //加载更多
                _this.handLoadMore();
            } else {
                //DO NOT modify below code
                _this.setState({
                    action: action
                });
            }
        };

        _this.handRefreshing = function () {
            if (_reactPullload.STATS.refreshing === _this.state.action) {
                return false;
            }

            setTimeout(function () {
                //refreshing complete
                _this.setState({
                    data: cData.params,
                    hasMore: true,
                    action: _reactPullload.STATS.refreshed,
                    index: cData.totalPage - 1
                });
            }, 500);

            _this.getRecordData(1).then(function (response) {
                _this.setState({
                    currentPage: response.currentPage,
                    data: response.params,
                    hasMore: true,
                    action: _reactPullload.STATS.refreshed,
                    index: response.totalPage - response.currentPage,
                    totalNum: response.totalNum,
                    totalPointAt: response.totalPointAt
                });
            });

            _this.setState({
                action: _reactPullload.STATS.refreshing
            });
        };

        _this.handLoadMore = function () {
            if (_reactPullload.STATS.loading === _this.state.action) {
                return false;
            }
            //无更多内容则不执行后面逻辑
            if (!_this.state.hasMore) {
                return;
            }

            setTimeout(function () {
                if (_this.state.index === 0) {
                    _this.setState({
                        action: _reactPullload.STATS.reset,
                        hasMore: false
                    });
                } else {

                    _this.setState({
                        data: [].concat((0, _toConsumableArray3.default)(_this.state.data), [cData.params[0], cData.params[0], cData.params[0], cData.params[0], cData.params[0], cData.params[0], cData.params[0], cData.params[0], cData.params[0], cData.params[0], cData.params[0]]),
                        action: _reactPullload.STATS.reset,
                        index: _this.state.index - 1
                    });
                }
            }, 500);

            _this.getRecordData(_this.state.currentPage + 1).then(function (response) {
                var arr = [].concat((0, _toConsumableArray3.default)(_this.state.data), (0, _toConsumableArray3.default)(response.params));
                var index = response.totalPage - response.currentPage;
                if (_this.state.index === 0) {
                    _this.setState({
                        action: _reactPullload.STATS.reset,
                        hasMore: false
                    });
                } else {

                    _this.setState({
                        data: arr,
                        hasMore: true,
                        action: _reactPullload.STATS.reset,
                        index: index,
                        totalNum: response.totalNum,
                        totalPointAt: response.totalPointAt
                    });
                }
            });

            _this.setState({
                action: _reactPullload.STATS.loading
            });
        };

        _this.getMony = function (money) {
            money += "";
            if (money.length == 0) {
                return;
            }
            money = money.trim();
            if (money.length >= 3) {
                var str1 = money.slice(0, money.length - 2);
                var str2 = money.slice(money.length - 2);
                return str1 + "." + str2;
            } else if (money.length == 2) {
                return "0." + money;
            } else {
                return "0.0" + money;
            }
        };

        _this.state = {
            currentPage: 1,
            data: [],
            hasMore: true,
            action: _reactPullload.STATS.init,
            index: 100,
            totalNum: 0,
            totalPointAt: 0
        };
        return _this;
    }

    (0, _createClass3.default)(RedBagDetail, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            (0, _request.beforeEnterRouter)("赏金奖励");

            this.getRecordData(1).then(function (response) {
                _this2.setState({
                    currentPage: response.currentPage,
                    data: response.params,
                    hasMore: true,
                    action: _reactPullload.STATS.refreshed,
                    index: parseInt(response.totalPage) - parseInt(response.currentPage),
                    totalNum: response.totalNum,
                    totalPointAt: response.totalPointAt
                });
            });

            this.setState({
                currentPage: 1,
                data: cData.params,
                hasMore: true,
                action: _reactPullload.STATS.init,
                index: 5 - 1,
                totalNum: 100,
                totalPointAt: 180
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                data = _state.data,
                hasMore = _state.hasMore,
                totalNum = _state.totalNum,
                totalPointAt = _state.totalPointAt;


            return _react2.default.createElement(
                "div",
                { id: "rbd" },
                _react2.default.createElement(
                    _reactPullload2.default
                    // downEnough={150}
                    ,
                    { action: this.state.action,
                        handleAction: this.handleAction,
                        hasMore: hasMore,
                        distanceBottom: 1000
                    },
                    _react2.default.createElement(
                        "ul",
                        { className: "test-ul" },
                        _react2.default.createElement(
                            "div",
                            { className: "head white  item-border-redus" },
                            _react2.default.createElement(
                                "span",
                                null,
                                totalNum,
                                "\u4EFD\u63A8\u8350\u7EA2\u5305"
                            ),
                            _react2.default.createElement(
                                "span",
                                null,
                                "\u5171 ",
                                this.getMony(totalPointAt),
                                "\u5143"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "content white item-border-redus" },
                            data.length != 0 ? data.map(function (str, index) {
                                return _react2.default.createElement(
                                    "li",
                                    { className: "item", key: index },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "left" },
                                        _react2.default.createElement(
                                            "span",
                                            null,
                                            str.mobile
                                        ),
                                        _react2.default.createElement("br", null),
                                        _react2.default.createElement(
                                            "label",
                                            null,
                                            "\u60A8\u7684\u8D4F\u91D1\u5DF2\u5B58\u5165\u7EA2\u5305"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "right" },
                                        "\xA5",
                                        _this3.getMony(str.pointAt)
                                    )
                                );
                            }) : _react2.default.createElement(
                                "div",
                                { className: "imgWarp" },
                                _react2.default.createElement("img", { src: _RBrecord2.default, alt: "" }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "tips" },
                                    "\u672C\u5217\u8868\u4EC5\u5C55\u793A\u8FD1\u4E09\u4E2A\u6708\u7684\u8D4F\u91D1\u8BB0\u5F55"
                                )
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "__reactstandin__regenerateByEval",
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);
    return RedBagDetail;
}(_react2.default.Component);

exports.default = RedBagDetail;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(RedBagDetail, "RedBagDetail", "C:/Users/Administrator/Desktop/work_xvsh/xvsh-v2/src/components/RedBagDetail/RedBagDetail.js");
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/RedBagDetail/RedBagDetail.scss":
/*!*******************************************************!*\
  !*** ./src/components/RedBagDetail/RedBagDetail.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/vue-style-loader!../../../node_modules/css-loader??ref--12-2!../../../node_modules/sass-loader/lib/loader.js??ref--12-3!./RedBagDetail.scss */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/RedBagDetail/RedBagDetail.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

}]);