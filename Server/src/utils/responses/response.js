export const SuccessResponse = (data, message) => {
  return {
    data,
    meta: { message },
  };
};
export const FailedResponse = (code, message) => {
  return {
    code,
    meta: { message },
  };
};
