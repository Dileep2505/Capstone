import { useState } from "react";

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

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
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
          }
        );

      setToken(
        response.data.token
      );

      window.location.reload();

    } catch (error) {

      console.error(error);

      alert("Login failed");
    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6">

          Admin Login

        </h2>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded"
          >
            {
              loading
                ? "Loading..."
                : "Login"
            }
          </button>

        </form>

      </div>

    </div>
  );
}

export default LoginPage;