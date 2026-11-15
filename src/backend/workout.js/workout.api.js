import api from "../api";

export async function getAll() {
  const response = await api.get("/workouts?order=id.asc", {
    // params: { order: "id.asc" },
  });

  return response.data;
}

export async function getById(workoutId) {
  const response = await api.get(`/workouts?id=eq.${workoutId}`);

  const result = response.data;

  return result[0];
}
