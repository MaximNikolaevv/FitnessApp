import { api } from "./api";

export async function getByWorkoutId(workoutId) {
  const response = await api.get(
    `/exercises?workout_id=eq.${workoutId}&order=id.asc`,
  );

  return response.data;
}

export async function AddExercises(workoutId, exerciseData) {
  const response = await api.post("/exercises", {
    ...exerciseData,
    workout_id: workoutId,
  });

  return response.data;
}
