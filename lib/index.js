'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = sort;
exports.inverse = inverse;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Convert from an object into an array of sort operations.
 *
 * @param  {object} sortBy
 *         An object specifying sorting operations. Keys represent the field to
 *         sort with and the value can either be an object or an integer.
 *
 *         An integer value specifies the order in which to perform sorting
 *         operations.
 *
 *         An object value specifies a nested object in which to recurse into.
 *         Used for objects that requrie "deep sorting" (objects within
 *         objects).
 *
 *         ```
 *         {
 *           student: {
 *             lastName: 1,
 *             firstName: -3,
 *           },
 *           order: 2,
 *           account: {
 *            email: -4,
 *           },
 *         }
 *         ```
 *
 * @param  {array} prevFields
 *         Previous field names, used for deep sorting.
 *
 * @param  {boolean} negate
 *         Flag to negate the sorting order, used for changing an ascend sort
 *         operation into a descend sort operation.
 *
 * @return {array}
 *         An array of sort operations.
 *
 *         ```
 *         [
 *           { fields: ['student', 'lastName'], order: 1 },
 *           { fields: ['order'], order: -2 },
 *           { fields: ['student', 'firstName'], order: 3 },
 *           { fields: ['instructor', 'nickname'], order: -4},
 *         ]
 *         ```
 */
function toOperations(sortBy) {
  var prevFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var result = [];

  if ((typeof sortBy === 'undefined' ? 'undefined' : _typeof(sortBy)) === 'object' && !Array.isArray(sortBy)) {
    // Fill the result with sort operations
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(sortBy)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        var value = sortBy[key];
        var fields = [].concat(_toConsumableArray(prevFields), [key]);

        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          result.push.apply(result, _toConsumableArray(toOperations(value, fields)));
        } else {
          result.push({
            fields: fields,
            order: value
          });
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  // Sort based on order
  result.sort(function (a, b) {
    return Math.abs(a.order) - Math.abs(b.order);
  });

  return result;
}

function compile(sortBy) {
  switch (typeof sortBy === 'undefined' ? 'undefined' : _typeof(sortBy)) {
    case 'object':
      if (Array.isArray(sortBy)) {
        return sortBy;
      }
      return toOperations(sortBy);
    case 'string':
      return toOperations(_defineProperty({}, sortBy, 1));
    case 'function':
      return [sortBy];
    default:
      return toOperations();
  }
}

function getField(operation, entity) {
  return operation.fields.reduce(function (prev, field) {
    return prev[field];
  }, entity);
}

function compare(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  return String(a).localeCompare(b);
}

function getSimilarity(operation, a, b) {
  switch (typeof operation === 'undefined' ? 'undefined' : _typeof(operation)) {
    case 'function':
      return operation(a, b);

    case 'object':
      {
        var fieldA = getField(operation, a);
        var fieldB = getField(operation, b);

        return operation.order < 0 ? compare(fieldB, fieldA) // Negative values represent a descend sorting operation.
        : compare(fieldA, fieldB); // Positive values represent an ascend sorting operation.
      }

    default:
      throw new Error('Operation is required to be a function or an object');
  }
}

function stableSort(a, b, operation, nextOperations) {
  if (!operation) return 0;

  var similarity = getSimilarity(operation, a, b);

  if (similarity === 0 && nextOperations.length) {
    return stableSort(a, b, nextOperations[0], nextOperations.slice(1));
  }

  return similarity;
}

function sort(array, sortBy) {
  var elements = array || [];
  var operations = compile(sortBy);

  return elements.sort(function (a, b) {
    return stableSort(a, b, operations[0], operations.slice(1));
  });
}

function inverse(sortBy) {
  var result = {};

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object.keys(sortBy)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var key = _step2.value;

      var value = sortBy[key];

      switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
        case 'number':
          result[key] = value * -1;
          break;
        case 'object':
          if (value && !Array.isArray(value)) {
            result[key] = inverse(value);
          }
          break;
        default:
          break;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return result;
}