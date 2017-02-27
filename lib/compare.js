'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compare;
function compare(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  return String(a).localeCompare(b);
}