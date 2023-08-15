import axios from "axios";

const Instance = axios.create({
  baseURL: "https://swapi.dev/api/people/",
});

export default Instance;
