import axios from "axios";
const BASE_URL = "https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane";

const Request = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

export default Request;
