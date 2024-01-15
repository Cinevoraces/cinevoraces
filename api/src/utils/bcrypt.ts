import bcrypt from 'bcryptjs';

/**
 * @description Hash string with a salt set to 10.
 * @param {string} string string to hash.
 * @returns Hashed string.
 */
export const hashString = async (string: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(string, salt);
};

/**
 * @description Compare string with hashed one.
 * @param {string} s1 string to compare.
 * @param {string} s2 string to compare.
 * @returns Boolean.
 */
export const compareStrings = async (s1: string, s2: string): Promise<boolean> => {
    return await bcrypt.compare(s1, s2);
};
