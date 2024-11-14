import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};

export const comparePassword = async (password, userPassword) => {
  const isValidPassword = await bcrypt.compare(password, userPassword);
  return isValidPassword;
};
