import api from "../api";

export async function getAll() {
  const response = await api.get("/workouts");

  return response.data;
}
