/**
 * Get the arguments passed to the script
 * @returns {Object} - The arguments passed to the script
 * @example
 * // node dev.mjs --a=foo -b
 * const args = getArgs();
 * // { a: 'foo', b: true }
 */
export const getArgs = () => {
    const args = {};
    process.argv.slice(2, process.argv.length).forEach(arg => {
        if (arg.slice(0, 2) === '--') {
            const longArg = arg.split('=');
            const longArgFlag = longArg[0].slice(2, longArg[0].length);
            const longArgValue = longArg.length > 1 ? longArg[1] : true;
            args[longArgFlag] = longArgValue;
        }
        if (arg[0] === '-') {
            const flags = arg.slice(1, arg.length).split('');
            flags.forEach(flag => {
                args[flag] = true;
            });
        }
    });

    return args;
};
