'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  }
  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}
// Adds compatibility for ES modules
debounce.debounce = debounce;

var debounce_1 = debounce;

var defaultTarget = typeof window !== 'undefined' ? window : null;
function useDebounce(handler, debounceProp) {
    return debounceProp ? debounce_1(handler, debounceProp) : handler;
}
var defaultTrigger = function (props) { return (props.store.current = (props.store.current || 0) + 1); };
function useEventTrigger(props, deps) {
    if (props === void 0) { props = {}; }
    var _a = props.event, event = _a === void 0 ? 'scroll' : _a, _b = props.getTrigger, getTrigger = _b === void 0 ? defaultTrigger : _b, debounce = props.debounce, _c = props.target, target = _c === void 0 ? defaultTarget : _c;
    var store = React.useRef();
    var _d = React.useState(function () { return getTrigger(__assign({ event: null, store: store }, deps)); }), trigger = _d[0], setTrigger = _d[1];
    React.useEffect(function () {
        var handleEvent = useDebounce(function (event) {
            setTrigger(getTrigger(__assign({ event: event, store: store }, deps)));
        }, debounce);
        target.addEventListener(event, handleEvent);
        return function () {
            target.removeEventListener(event, handleEvent);
            debounce && handleEvent.clear();
        };
    }, [event, debounce, target, getTrigger].concat(deps));
    return [trigger, store];
}

/**
 * @class ExampleComponent
 */

exports.default = useEventTrigger;
//# sourceMappingURL=index.js.map
