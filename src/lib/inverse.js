
export default function inverse(sortBy) {
  const result = {};

  for (const key of Object.keys(sortBy)) {
    const value = sortBy[key];

    switch (typeof value) {
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

  return result;
}

