export const passwordValidation = (value: string): boolean => {
  if (!value) return false;
  if (value.includes(" ")) return true;
  return value.length < 6;
};
