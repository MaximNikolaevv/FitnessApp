import { api } from "../api";

export async function getAllDiet() {
  const response = await api.get(`/diet?order=id.asc`);
  return response.data;
}

export async function AddDiet(dietData) {
  const response = await api.post(`/diet`, dietData);
  return response.data;
}
