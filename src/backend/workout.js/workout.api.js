import { api } from "../api";

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

export async function AddWorkout(workoutData) {
  const response = await api.post("/workouts", workoutData, {
    headers: { Prefer: "return=representation" }, // return the data after the post
  });
  const workout = Array.isArray(response.data)
    ? response.data[0]
    : response.data;

  return workout;
}
