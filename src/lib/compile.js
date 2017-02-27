
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
function toOperations(sortBy, prevFields = []) {
  const result = [];

  if (typeof sortBy === 'object' && !Array.isArray(sortBy)) {
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


export default function compile(sortBy) {
  switch (typeof sortBy) {
    case 'object':
      if (Array.isArray(sortBy)) {
        return sortBy;
      }
      return toOperations(sortBy);
    case 'string':
      return toOperations({ [sortBy]: 1 });
    case 'function':
      return [sortBy];
    default:
      return toOperations();
  }
}

