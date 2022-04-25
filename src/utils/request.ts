import axios from 'axios';

export const requestHandler = async (config, url, data) => {
  const request = axios.create(config);

  const result = await request.post(url, data);

  return result.data;
};
