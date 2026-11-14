import axios from "axios";

const base = axios.create({
  baseURL: "https://qhahlswszeculdkyvxeo.supabase.co",
  headers: {
    apikey: "sb_publishable_I9xnl1Pg0a0rqDeNP5tpEg_aEb-9Ayw",
    "Content-Type": "application/json",
  },
});

const api = axios.create({
  ...base.defaults,
  baseURL: `${base.defaults.baseURL}/rest/v1`,
});

export default api;

// https://qhahlswszeculdkyvxeo.supabase.co/rest/v1/workouts

// https://qhahlswszeculdkyvxeo.supabase.co/rest/v1/exercises
