import axios from "axios";
import { toast } from "react-toastify";

const client = axios.create({ baseURL: process.env.REACT_APP_API_BASEURL });

client.interceptors.response.use(
  (response) => response,
  (error) => {
    toast(`${error?.response?.data?.msg ?? error}`, { type: "error" });
    throw error;
  }
);

export default client;
