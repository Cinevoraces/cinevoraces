import bcrypt from "bcrypt";

export const comparePassword = async (pass_1: string, pass_2: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.compare(pass_1, pass_2)
}

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}