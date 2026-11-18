import { api } from "./api";

export async function getByWorkoutId(workoutId) {
  const response = await api.get(
    `/exercises?workout_id=eq.${workoutId}&order=id.asc`,
  );

  return response.data;
}
