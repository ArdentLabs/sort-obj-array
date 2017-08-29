import compare from './compare';
import compile from './compile';


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
  return operation.fields.reduce((obj, field) => get(obj, field), entity);
}


function getSimilarity(operation, a, b) {
  switch (typeof operation) {
    case 'function':
      return operation(a, b);

    case 'object': {
      const fieldA = getField(operation, a);
      const fieldB = getField(operation, b);

      return (operation.order < 0)
        ? compare(fieldB, fieldA) // Negative values represent a descend sorting operation.
        : compare(fieldA, fieldB); // Positive values represent an ascend sorting operation.
    }

    default:
      throw new Error('Operation is required to be a function or an object');
  }
}


function stableSort(a, b, operation, nextOperations) {
  if (!operation) return 0;

  const similarity = getSimilarity(operation, a, b);

  if (similarity === 0 && nextOperations.length) {
    return stableSort(a, b, nextOperations[0], nextOperations.slice(1));
  }

  return similarity;
}

export default function sort(array, sortBy) {
  const elements = array || [];
  const operations = compile(sortBy);

  return elements.sort((a, b) => {
    return stableSort(a, b, operations[0], operations.slice(1));
  });
}

