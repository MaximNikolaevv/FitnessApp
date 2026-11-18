import { api } from "../api";

export async function getAllDiet() {
  const response = await api.get(`/diet?order=id.asc`);
  return response.data;
}
