const basicStyle = `peer
    rounded-md bg-medium-gray border border-transparent
    px-3 py-2
    placeholder:font-extralight placeholder:text-gray-400 
    focus:outline-none 
    focus:placeholder:text-gray-600
  `;

const styles = {
  basicStyle,
  standardStyle : basicStyle + `
    focus:border-orange-primary focus:ring-4 focus:ring-offset-0 focus:ring-white/5
    invalid:border-red-500
  `,
}; 

export default styles; 
