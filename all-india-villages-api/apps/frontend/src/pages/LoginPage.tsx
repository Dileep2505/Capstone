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

  const [authMode, setAuthMode] =
    useState<"user" | "admin">("user");

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
      const [isRegister, setIsRegister] =
        useState(false);
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

  const title = isRegister
    ? "Create an Account"
    : authMode === "admin"
    ? "Admin Login"
    : "User Login";
  const submitLabel = isRegister ? "Register" : "Login";
  const showRegister = authMode === "user";

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      const title = isRegister ? "Create an Account" : "User Login";
              <button
      const showRegister = true;
                onClick={() => {
                  setAuthMode("user");
                  setIsRegister(false);
                }}
                className={`px-4 py-2 rounded-lg ${
                  authMode === "user"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                User Login
              </button>
              <button
                      setIsRegister(false);
                    }}
                    className={`px-4 py-2 rounded-lg bg-black text-white`}
                    : "bg-gray-100 text-gray-700"
                }`}
              >
            </button>
          )}
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

          {showRegister && isRegister && (
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