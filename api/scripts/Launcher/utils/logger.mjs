export const getLogTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const AMPM = hours >= 12 ? 'PM' : 'AM';
    const AMPMHours = hours % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    return `${AMPMHours}:${minutes}:${seconds} ${AMPM} - `;
};

export const colorize = (color, text) => {
    const colors = {
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        cyan: '\x1b[36m',
        magenta: '\x1b[35m',
        reset: '\x1b[0m',
    };
    if (typeof colors[color] === 'undefined') {
        return text;
    }
    return colors[color] + text + colors.reset;
};

export const log = (text, color) => console.log(getLogTime() + colorize(color, text));
