import axios, { CanceledError, AxiosError } from "axios";

const baseUrl = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export { CanceledError, AxiosError };
export default baseUrl;
