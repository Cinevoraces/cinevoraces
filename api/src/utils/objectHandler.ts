interface objectHandler {
  keysToArray: (
    enumerators: Array<string>,
    object: Record<string, unknown>
  )=>Record<string, unknown>[];
  
  filterKeys: (
    enumerators: Array<string>,
    object: Record<string, unknown>
  )=>Record<string, unknown>;
}

export default {
  keysToArray: (enumerators, object) => {
    const keys = Object.keys(object);
    return (keys as Array<string>).reduce(
      (acc, key) => {
        if (typeof object[key] === 'undefined') return acc;
        if (enumerators.find((element) => element === key)) {
          return [...acc, { [key]: object[key] }];
        }
        return acc;
      }, []
    );
  },

  filterKeys: (enumerators, object) => {
    let filteredObject = {};
    for (const key in object) {
      if (enumerators.find((enumerator) => enumerator === key)) {
        filteredObject = { ...filteredObject, [key]: object[key] };    
      }
    }  
    return filteredObject;
  }
} as objectHandler;
