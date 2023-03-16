"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateclean_react"]("main",{

/***/ "./src/presentation/components/header/header.tsx":
/*!*******************************************************!*\
  !*** ./src/presentation/components/header/header.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _header_styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header-styles.scss */ \"./src/presentation/components/header/header-styles.scss\");\n/* harmony import */ var _presentation_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/presentation/components */ \"./src/presentation/components/index.ts\");\n/* harmony import */ var _presentation_contexts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/presentation/contexts */ \"./src/presentation/contexts/index.ts\");\n\r\n\r\n\r\n\r\nconst Header = () => {\r\n    // const navigate = useNavigate();\r\n    const { setCurrentAccount, getCurrentAccount } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_presentation_contexts__WEBPACK_IMPORTED_MODULE_3__.ApiContext);\r\n    const logout = (event) => {\r\n        event.preventDefault();\r\n        setCurrentAccount(undefined);\r\n        navigate('/login');\r\n    };\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"header\", { className: _header_styles_scss__WEBPACK_IMPORTED_MODULE_1__[\"default\"].headerWrap },\r\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", { className: _header_styles_scss__WEBPACK_IMPORTED_MODULE_1__[\"default\"].headerContent },\r\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentation_components__WEBPACK_IMPORTED_MODULE_2__.Logo, null),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", { className: _header_styles_scss__WEBPACK_IMPORTED_MODULE_1__[\"default\"].logoutWrap },\r\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", null, getCurrentAccount().name),\r\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", { \"data-testid\": \"logout\", href: \"#\", onClick: logout }, \"Sair\")))));\r\n};\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(Header));\r\n\n\n//# sourceURL=webpack://clean-react/./src/presentation/components/header/header.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("74bbcb330cf3367ddb83")
/******/ })();
/******/ 
/******/ }
);