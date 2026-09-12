import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const predictSentiment = async (headline) => {
  const { data } = await api.post("/api/predict", { headline });
  return data;
};

export const getHistory = async (limit = 50) => {
  const { data } = await api.get(`/api/history?limit=${limit}`);
  return data;
};

export const getStats = async () => {
  const { data } = await api.get("/api/stats");
  return data;
};