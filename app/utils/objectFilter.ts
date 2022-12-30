// eslint-disable-next-line @typescript-eslint/no-explicit-any
const objectFilter = (objectToFilter: {[key: string]: any }, wantedProperties: string[]) => {
  return wantedProperties
    .reduce(
      (filteredObject: {} | undefined, property: string) => {
        return {
          ...filteredObject,
          [property]: objectToFilter[property],
        };
      }, {});
};

export default objectFilter;
