import api from "../api";

export async function getAll() {
  const response = await api.get("/workouts", {
    params: { order: "id.asc" },
  });

  return response.data;
}
