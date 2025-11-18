export const confirmPasswordValidation = (
  password: string,
  confirm: string,
): boolean => {
  if ((confirm.trim() === "") && (password.trim() === "")) return false;
  if ((password.length < 6) || (confirm.length < 6)) return true;
  return password !== confirm;
};
