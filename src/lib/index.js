
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
function toOperations(sortBy, prevFields = []) {
  const result = [];

  if (sortBy) {
    // Fill the result with sort operations
    for (const key of Object.keys(sortBy)) {
      const value = sortBy[key];
      const fields = [...prevFields, key];

      if (typeof value === 'object') {
        result.push(...toOperations(value, fields));
      } else {
        result.push({
          fields,
          order: value,
        });
      }
    }
  }

  // Sort based on order
  result.sort((a, b) => Math.abs(a.order) - Math.abs(b.order));

  return result;
}


function getField(operation, entity) {
  return operation.fields.reduce((prev, field) => prev[field], entity);
}


function compare(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  return String(a).localeCompare(b);
}


function stableSort(a, b, operation, nextOperations) {
  if (!operation) return 0;

  const fieldA = getField(operation, a);
  const fieldB = getField(operation, b);

  const similarity = (operation.order < 0)
    ? compare(fieldB, fieldA)   // Negative values represent a descend sorting operation.
    : compare(fieldA, fieldB);  // Positive values represent an accend sorting operation.

  if (similarity === 0 && nextOperations.length) {
    return stableSort(a, b, nextOperations[0], nextOperations.slice(1));
  }
  return similarity;
}


export default function sort(array, sortBy) {
  const elements = array || [];
  const operations = toOperations(sortBy);

  return elements.sort((a, b) => {
    return stableSort(a, b, operations[0], operations.slice(1));
  });
}

