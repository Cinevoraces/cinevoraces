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
