import bcrypt from 'bcryptjs';

/**
 * Hash a string with a salt set to 10.
 */
export const hashString = async (string: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(string, salt);
};

/**
 * Compare a string with a hash.
 */
export const compareStrings = async (s1: string, s2: string): Promise<boolean> => {
    return await bcrypt.compare(s1, s2);
};
