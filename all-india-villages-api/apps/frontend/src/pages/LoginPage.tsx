import { useState } from "react";
import type { FormEvent } from "react";

import { api } from "../services/api";

import { useAuthStore } from "../store/authStore";

function LoginPage() {

  const setToken =
    useAuthStore(
      (state) => state.setToken
    );

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [authMode, setAuthMode] =
    useState<"user" | "admin">("admin");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await api.post(
          "/v1/auth/login",
          {
            email,
            password,
          },
          {
            headers:
              authMode === "admin"
                ? { "x-admin-login": "1" }
                : undefined,
          }
        );

      setToken(
        response.data.token,
        response.data.role
      );

      window.location.reload();

    } catch (error) {

      console.error(error);

      alert("Login failed. Please check your credentials.");
    } finally {

      setLoading(false);
    }
  };

  const title = "Admin Login";
  const submitLabel = "Login";

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-full max-w-md">

        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => setAuthMode("admin")}
                className={`px-4 py-2 rounded-lg ${
                  authMode === "admin"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Admin Login
              </button>
            </div>
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-3 rounded"
            required
          />

          {/* registration disabled - admin-only login UI */}

          <button
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded"
          >
            {loading ? "Loading..." : submitLabel}
          </button>

        </form>

      </div>

    </div>
  );
}

export default LoginPage;