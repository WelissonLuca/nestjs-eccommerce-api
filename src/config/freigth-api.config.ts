import { AxiosRequestConfig } from 'axios';

export const freightApiConfig: AxiosRequestConfig = {
  method: 'post',
  url: process.env.FREIGTH_API_URL,
  headers: {
    Accept: 'application/json',
    ContentType: 'application/json',
    Authorization: process.env.FREIGHT_API_KEY,
    UserAgent: process.env.USER_AGENT,
  },
};
