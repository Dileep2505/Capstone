export const apiResponse = ({
  success = true,
  message = "",
  data = null,
  meta = {},
}: any) => {

  return {
    success,
    message,
    data,
    meta,
  };
};
