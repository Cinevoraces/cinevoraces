// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saveToLocalStorage = (stateName: string, state: any, ) => {
  try {
    localStorage.setItem(stateName, JSON.stringify(state));
  } catch (err){
    console.error(err);
  }
};

const getStateFromLocalStorage = (stateName: string) => {
  try {
    const savedState = localStorage.getItem(stateName);
    return savedState ? JSON.parse(savedState) : undefined;
  } catch (err){
    console.error(err);
  }
};

export { saveToLocalStorage, getStateFromLocalStorage };
