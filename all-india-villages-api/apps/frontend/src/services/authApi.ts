import { api } from "./api";

export async function registerUser(payload: { email: string; password: string; firstName?: string; lastName?: string }) {
  return api.post("/v1/auth/register", payload);
}

export async function registerDemo(payload: { email: string; firstName?: string; lastName?: string; useCase?: string }) {
  // backend may support a demo-specific endpoint; fallback to /v1/auth/register with demo flag
  try {
    return await api.post("/v1/auth/register-demo", payload);
  } catch (err) {
    return api.post("/v1/auth/register", { ...payload, demo: true });
  }
}
