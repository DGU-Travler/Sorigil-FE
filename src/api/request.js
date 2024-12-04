export const sendRequest = async (instance, method, url, data = {}, option = {}) => {
  try {
    const config = {
      method,
      url,
      data,
      ...option,
    };

    const response = await instance(config);

    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || '요청 처리 중 오류가 발생했습니다.');
  }
};
