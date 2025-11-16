export const usernameValidation = (value: string): boolean => {
  if (!value) return false;
  if (value.length > 14) return true;
  
  const regex = /^[a-z0-9._]+$/;
  return !regex.test(value);
};