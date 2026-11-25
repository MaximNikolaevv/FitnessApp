import { api } from "../api";

export async function getAllDiet() {
  const response = await api.get(`/diet?order=id.asc`);
  return response.data;
}

export async function AddDiet(dietData) {
  const response = await api.post(`/diet`, dietData);
  return response.data;
}

export async function DeleteDiet(dietId) {
  await api.delete(`/diet?id=eq.${dietId}`);
}

export async function UpdateDiet(dietId, dietData) {
  const response = await api.patch(`/diet?id=eq.${dietId}`, dietData, {
    headers: { Prefer: "return=representation" },
  });
  const meal = response.data?.[0];

  if (!meal) {
    throw new Error("Meal was not found or you do not own it.");
  }

  return meal;
}
