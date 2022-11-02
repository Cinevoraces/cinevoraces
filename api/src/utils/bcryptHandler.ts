import bcrypt from 'bcrypt';

/**
 * **comparePassword**
 * @description Compare a password with a hash.
 * @param pass_1 Password to compare
 * @param pass_2 Password to compare
 * @returns boolean
 */
export const comparePassword = async (pass_1: string, pass_2: string) => {
  return await bcrypt.compare(pass_1, pass_2);
};

/**
 * **hashPassword**
 * @description Hash a password.
 * @param password Password to hash
 * @returns Hashed password
 */
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
