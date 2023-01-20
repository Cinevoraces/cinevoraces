/**
 * Handle the clearing of all filters options and animation
 * @param userFilterReset state mutation to clear 
 * @param filterRef Ref object to handle the search value reset
 */
const userFilterResetHandling = ( userFilterReset: ()=>void, filterRef: React.RefObject<HTMLDivElement>) => {
  userFilterReset();
  const filterNodeList = filterRef.current?.firstChild?.childNodes
    ? ([...filterRef.current?.firstChild?.childNodes] as HTMLElement[])
    : [];
  const resetButtonSVGNode = filterNodeList.filter((node) => node.innerText === '')[0].firstChild as HTMLElement;
  const toggleRotateClass = () => {
    resetButtonSVGNode?.classList.toggle('animate-reverse-spin');
  };
  toggleRotateClass();
  setTimeout(toggleRotateClass, 1000);
};

export default userFilterResetHandling;
