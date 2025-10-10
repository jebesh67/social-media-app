export const parseJsonResponse = async <TSuccess, TError>(
  response: Response,
): Promise<TSuccess | TError> => {
  const text: string = await response.text();
  return (text ? JSON.parse(text) : {}) as TSuccess | TError;
};
