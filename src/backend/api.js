/* eslint-disable import/no-named-as-default-member */
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
  },
});

const base = axios.create({
  baseURL: supabaseUrl,
  headers: {
    apikey: supabasePublishableKey,
    "Content-Type": "application/json",
  },
});

export const api = axios.create({
  ...base.defaults,
  baseURL: `${base.defaults.baseURL}/rest/v1`,
});

api.interceptors.request.use(async (config) => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;

  if (data.session?.access_token) {
    config.headers.Authorization = `Bearer ${data.session.access_token}`;
  }

  return config;
});

export const auth = axios.create({
  ...base.defaults,
  baseURL: `${base.defaults.baseURL}/auth/v1`,
});

export const storage = axios.create({
  ...base.defaults,
  baseURL: `${base.defaults.baseURL}/storage/v1`,
});
