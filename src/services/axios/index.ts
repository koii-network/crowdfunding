import axios from "axios";

//change to an environment url eventually
const customAxios = axios.create({
  /* eslint-disable-next-line */
  baseURL: process.env.REACT_APP_BUNDLER_API_URL
});

customAxios.defaults.headers.common["Content-Type"] = "application/json";
customAxios.defaults.headers.post["Content-Type"] = "application/json";
// customAxios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default customAxios;
