/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var createExecuteFn = function createExecuteFn(apiPrefix) {
	    return function (service, action, payload) {
	        return new Promise(function (resolve, reject) {
	            var xhr = new XMLHttpRequest();
	            xhr.open('post', apiPrefix + '/' + service);
	            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

	            xhr.addEventListener('load', function () {
	                var response = xhr.response,
	                    status = xhr.status;

	                var res = JSON.parse(response);
	                if (status >= 200 && status < 400) {
	                    resolve(res);
	                } else {
	                    reject({ response: res, status: status });
	                }
	            });

	            xhr.send(JSON.stringify({ payload: payload, action: action }));
	        });
	    };
	};

	function namelessClient(apiPrefix) {
	    return {
	        exec: createExecuteFn(apiPrefix)
	    };
	}

	exports.default = namelessClient;

/***/ }
/******/ ]);