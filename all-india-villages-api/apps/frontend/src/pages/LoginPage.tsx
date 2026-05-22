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

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [isRegister, setIsRegister] =
    useState(false);

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
          }
        );

      setToken(
        response.data.token
      );

      window.location.reload();

    } catch (error) {

      console.error(error);

      alert("Login failed. Please check your credentials.");
    } finally {

      setLoading(false);
    }
  };

  const handleRegister = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await api.post(
        "/v1/auth/register",
        {
          email,
          password,
        }
      );

      alert("Registration successful. Please log in.");
      setIsRegister(false);
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const title = isRegister ? "Create an Account" : "Admin Login";
  const submitLabel = isRegister ? "Register" : "Login";

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-full max-w-md">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {title}
          </h2>
          <button
            type="button"
            onClick={() => setIsRegister((value) => !value)}
            className="text-sm text-blue-600 hover:underline"
          >
            {isRegister ? "Go to Login" : "Create account"}
          </button>
        </div>

        <form
          onSubmit={isRegister ? handleRegister : handleLogin}
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

          {isRegister && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full border p-3 rounded"
              required
            />
          )}

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