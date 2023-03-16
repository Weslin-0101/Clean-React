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

/***/ "./src/main/router/router.tsx":
/*!************************************!*\
  !*** ./src/main/router/router.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/dist/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router/dist/index.js\");\n/* harmony import */ var _main_factories_pages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/main/factories/pages */ \"./src/main/factories/pages/index.ts\");\n/* harmony import */ var _presentation_contexts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/presentation/contexts */ \"./src/presentation/contexts/index.ts\");\n/* harmony import */ var _main_adapters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/main/adapters */ \"./src/main/adapters/index.ts\");\n\r\n\r\n\r\n\r\n\r\nconst Router = () => {\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentation_contexts__WEBPACK_IMPORTED_MODULE_2__.ApiContext.Provider, { value: {\r\n            setCurrentAccount: _main_adapters__WEBPACK_IMPORTED_MODULE_3__.setCurrentAccountAdapter,\r\n            getCurrentAccount: _main_adapters__WEBPACK_IMPORTED_MODULE_3__.getCurrentAccountAdapter\r\n        } },\r\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.BrowserRouter, null,\r\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Routes, null,\r\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Route, { path: '/login', element: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_main_factories_pages__WEBPACK_IMPORTED_MODULE_1__.MakeLogin, null) }),\r\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Route, { path: \"/signup\", element: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_main_factories_pages__WEBPACK_IMPORTED_MODULE_1__.MakeSignUp, null) }),\r\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Route, Object.assign({ path: \"/survey-list\", element: \r\n                    // <PrivateRoute>\r\n                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_main_factories_pages__WEBPACK_IMPORTED_MODULE_1__.MakeSurveyList, null) }, /* </PrivateRoute> */ )),\r\n                \"} />\"))));\r\n};\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Router);\r\n\n\n//# sourceURL=webpack://clean-react/./src/main/router/router.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("4303cad2fa94211ac4e6")
/******/ })();
/******/ 
/******/ }
);