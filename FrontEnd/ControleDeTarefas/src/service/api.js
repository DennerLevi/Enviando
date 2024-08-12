import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:44321/api/ControleDeTarefas"
});

export default api;
