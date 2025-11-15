export const emailValidation = (value: string): boolean => {
  if (!value) return false;
  if (value.includes(" ")) return true;
  
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !regex.test(value);
};
