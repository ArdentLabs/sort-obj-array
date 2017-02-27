'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = sort;

var _compare = require('./compare');

var _compare2 = _interopRequireDefault(_compare);

var _compile = require('./compile');

var _compile2 = _interopRequireDefault(_compile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isMap(maybeMap) {
  return !!(maybeMap && maybeMap['@@__IMMUTABLE_MAP__@@']);
}

function get(obj, key) {
  if (isMap(obj)) {
    return obj.get(key);
  }
  return obj[key];
}

function getField(operation, entity) {
  return operation.fields.reduce(function (obj, field) {
    return get(obj, field);
  }, entity);
}

function getSimilarity(operation, a, b) {
  switch (typeof operation === 'undefined' ? 'undefined' : _typeof(operation)) {
    case 'function':
      return operation(a, b);

    case 'object':
      {
        var fieldA = getField(operation, a);
        var fieldB = getField(operation, b);

        return operation.order < 0 ? (0, _compare2.default)(fieldB, fieldA) // Negative values represent a descend sorting operation.
        : (0, _compare2.default)(fieldA, fieldB); // Positive values represent an ascend sorting operation.
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
  var operations = (0, _compile2.default)(sortBy);

  return elements.sort(function (a, b) {
    return stableSort(a, b, operations[0], operations.slice(1));
  });
}