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

export async function UpdateExercise(exerciseId, exerciseData) {
  const response = await api.patch(
    `/exercises?id=eq.${exerciseId}`,
    exerciseData,
    { headers: { Prefer: "return=representation" } },
  );
  const exercise = response.data?.[0];

  if (!exercise) {
    throw new Error("Exercise was not found or you do not own it.");
  }

  return exercise;
}

export async function DeleteExercise(exerciseId) {
  const response = await api.delete(`/exercises?id=eq.${exerciseId}`, {
    headers: { Prefer: "return=representation" },
  });

  if (!response.data?.[0]) {
    throw new Error("Exercise was not found or you do not own it.");
  }

  return response.data[0];
}
