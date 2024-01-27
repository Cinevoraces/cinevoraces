export const randomBoolean = () => Math.random() >= 0.5;

export const randomNumber = (min?: number, max?: number) => {
    if (min === undefined) min = 0;
    if (max === undefined) max = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
