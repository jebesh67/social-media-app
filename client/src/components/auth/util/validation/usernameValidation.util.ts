export const usernameValidation = (value: string): boolean => {
  if (!value) return false;
  
  const regex = /^[a-z0-9._]+$/;
  return !regex.test(value);
};