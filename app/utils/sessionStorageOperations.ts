// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saveToSessionStorage = (stateName: string, state: any, ) => {
  try {
    sessionStorage.setItem(stateName, JSON.stringify(state));
  } catch (err){
    console.error(err);
  }
};

const getStateFromSessionStorage = (stateName: string) => {
  try {
    const savedState = sessionStorage.getItem(stateName);
    return savedState ? JSON.parse(savedState) : undefined;
  } catch (err){
    console.error(err);
  }
};

export { saveToSessionStorage, getStateFromSessionStorage };
