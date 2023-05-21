"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./Dropdown.css");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _arrow_icon = _interopRequireDefault(require("./assets/arrow_icon.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * Dropdown component.
 * @param {object[]} items - The array of items to display in the dropdown.
 * @param {function} onChange - The callback function called when an item is selected.
 * @param {string|number|boolean} value - The currently selected value.
 * @param {string|number} [width="100%"] - The width of the dropdown.
 * @param {string} [iconSrc=arrow] - The source of the dropdown icon.
 * @returns {JSX.Element} The rendered dropdown component.
 */
var Dropdown = function Dropdown(_ref) {
  var _ref$items = _ref.items,
    items = _ref$items === void 0 ? [] : _ref$items,
    onChange = _ref.onChange,
    value = _ref.value,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? "100%" : _ref$width,
    _ref$iconSrc = _ref.iconSrc,
    iconSrc = _ref$iconSrc === void 0 ? _arrow_icon.default : _ref$iconSrc;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    itemSelected = _useState2[0],
    setItemSelected = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    openList = _useState4[0],
    setOpenList = _useState4[1];
  var ref = (0, _react.useRef)();
  var listRef = (0, _react.useRef)();

  /**
   * Toggle the open state of the dropdown list.
   */
  var toggleOpenList = function toggleOpenList() {
    setOpenList(!openList);
  };

  /**
   * Select an item from the dropdown.
   * @param {object} item - The selected item.
   */
  var selectItem = function selectItem(item) {
    onChange(item.value);
  };
  (0, _react.useEffect)(function () {
    var index = items.findIndex(function (item) {
      return item.value === value;
    });
    setItemSelected(items[index]);
  }, [value, items]);
  (0, _react.useEffect)(function () {
    if (openList) {
      var _listRef$current;
      document.addEventListener("click", handleClick);
      document.addEventListener("keydown", handleKeyDown);
      if ((_listRef$current = listRef.current) !== null && _listRef$current !== void 0 && _listRef$current.childNodes) {
        var listItems = listRef.current.childNodes;
        var selectedIndex = items.findIndex(function (item) {
          return item.value === itemSelected.value;
        });
        listItems[selectedIndex].focus();
      }
    } else {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    }
    return function () {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, openList]);

  /**
   * Handle click events outside of the dropdown.
   * @param {MouseEvent} event - The click event.
   */
  var handleClick = function handleClick(event) {
    if (ref.current && !ref.current.contains(event.target) && !event.target.closest(".dropdownOP-list")) {
      setOpenList(false);
    }
  };

  /**
   * Handle keydown events for keyboard navigation.
   * @param {KeyboardEvent} event - The keydown event.
   */
  var handleKeyDown = function handleKeyDown(event) {
    var _listRef$current2;
    event.preventDefault();
    var listItems = listRef === null || listRef === void 0 ? void 0 : (_listRef$current2 = listRef.current) === null || _listRef$current2 === void 0 ? void 0 : _listRef$current2.childNodes;
    if (listItems) {
      var focusedIndex = Array.prototype.indexOf.call(listItems, document.activeElement);
      if (event.key === "ArrowDown" || event.key === "Tab" && !event.shiftKey) {
        event.preventDefault();
        if (focusedIndex < items.length - 1) {
          listItems[focusedIndex + 1].focus();
        }
      } else if (event.key === "ArrowUp" || event.key === "Tab" && event.shiftKey) {
        event.preventDefault();
        if (focusedIndex > 0) {
          listItems[focusedIndex - 1].focus();
        }
      } else if (event.key === "Enter") {
        selectItem(items[focusedIndex]);
        setOpenList(false);
        ref.current.focus();
      } else if (event.key === "Escape" || event.key === " ") {
        event.preventDefault();
        setOpenList(!openList);
        ref.current.focus();
      }
    }
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, itemSelected && /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdownOP",
    ref: ref,
    style: {
      width: width
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    id: "filter",
    className: "dropdownOP-toggle",
    "aria-haspopup": "listbox",
    "aria-expanded": openList ? "true" : "false",
    onClick: toggleOpenList,
    tabIndex: 0
  }, /*#__PURE__*/_react.default.createElement("span", null, itemSelected.name), iconSrc && /*#__PURE__*/_react.default.createElement("img", {
    src: iconSrc,
    alt: ""
  })), openList && /*#__PURE__*/_react.default.createElement("ul", {
    ref: listRef,
    role: "listbox",
    className: "dropdownOP-list"
  }, items.map(function (item, index) {
    return /*#__PURE__*/_react.default.createElement("li", {
      key: item.name + item.value,
      role: "option",
      "aria-selected": item.value === itemSelected.value ? "true" : "false",
      onClick: function onClick() {
        selectItem(item);
        setOpenList(false);
      },
      className: "dropdownOP-item ".concat(item.value === itemSelected.value ? "dropdownOP-item-selected" : ""),
      tabIndex: 0
    }, /*#__PURE__*/_react.default.createElement("span", null, item.name), index === 0 && iconSrc && /*#__PURE__*/_react.default.createElement("img", {
      src: iconSrc,
      alt: ""
    }));
  }))));
};
Dropdown.propTypes = {
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    name: _propTypes.default.string.isRequired,
    value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.bool]).isRequired
  })),
  onChange: _propTypes.default.func.isRequired,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.bool]),
  width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  iconSrc: _propTypes.default.string
};
var _default = Dropdown;
exports.default = _default;