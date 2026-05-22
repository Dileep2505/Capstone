import { useState } from "react";
import type { FormEvent } from "react";

import { api } from "../services/api";

import { useAuthStore } from "../store/authStore";

type Layer = "admin" | "b2b" | "demo";

const layerCards: Array<{
  id: Layer;
  tag: string;
  title: string;
  subtitle: string;
  body: string;
  accent: string;
  borderClass: string;
  icon: string;
  cta: string;
}> = [
  {
    id: "admin",
    tag: "Admin User",
    title: "Admin Portal",
    subtitle: "React SPA · Internal",
    body:
      "Full platform control - user approvals, API key management, analytics, and village master data.",
    accent: "gold",
    borderClass: "layer-card admin",
    icon: "👤",
    cta: "Sign in as Admin",
  },
  {
    id: "b2b",
    tag: "B2B Client",
    title: "B2B Client Portal",
    subtitle: "React SPA · Business",
    body:
      "For registered businesses - manage API keys, view usage analytics, access swagger docs and integration guides.",
    accent: "teal",
    borderClass: "layer-card b2b",
    icon: "🧰",
    cta: "Business Sign In",
  },
  {
    id: "demo",
    tag: "Demo Client",
    title: "Demo Client",
    subtitle: "Contact Form · Public",
    body:
      "Try the live address autocomplete and village search API with a restricted demo key. No signup required.",
    accent: "coral",
    borderClass: "layer-card demo",
    icon: "<>",
    cta: "Try the Demo",
  },
];

function LoginPage() {
  const setToken = useAuthStore((state) => state.setToken);

  const [selectedLayer, setSelectedLayer] = useState<Layer>("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const activeCard = layerCards.find((card) => card.id === selectedLayer) ?? layerCards[0];

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post(
        "/v1/auth/login",
        {
          email,
          password,
        },
        {
          headers:
            selectedLayer === "admin"
              ? { "x-admin-login": "1" }
              : undefined,
        }
      );

      setToken(response.data.token, response.data.role);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/v1/auth/register", {
        email,
        password,
      });

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

  return (
    <div className="layer-screen">
      <div className="layer-grid-veil" aria-hidden="true" />

      <main className="layer-shell">
        <section className="layer-hero">
          <div className="brand-pill">
            <span className="brand-dot" />
            <span>VillageAPI</span>
          </div>

          <h1>
            Access the <em>Client Layer</em>
          </h1>

          <p className="layer-subtitle">
            India&apos;s most complete village data platform · 6,40,930 villages · Census 2011
          </p>

          <div className="layer-divider">
            <span />
            <strong>Client Layer — React SPA</strong>
            <span />
          </div>

          <section className="cards-grid">
            {layerCards.map((card) => (
              <article
                key={card.id}
                className={card.borderClass}
                onClick={() => {
                  setSelectedLayer(card.id);
                  setIsRegister(false);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedLayer(card.id);
                    setIsRegister(false);
                  }
                }}
              >
                <div className={`tag tag-${card.accent.toLowerCase()}`}>{card.tag}</div>

                <div className="icon-badge">{card.icon}</div>

                <h2>{card.title}</h2>
                <p className="card-subtitle">{card.subtitle}</p>
                <p className="card-body">{card.body}</p>

                <button
                  type="button"
                  className={`card-cta cta-${card.accent.toLowerCase()}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedLayer(card.id);
                    setIsRegister(false);
                  }}
                >
                  {card.cta} <span>→</span>
                </button>

                {selectedLayer === card.id && (
                  <div className="selected-chip">Selected</div>
                )}
              </article>
            ))}
          </section>

          <footer className="layer-footer">
            <div className="footer-links">
              <a href="#">Documentation</a>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Support</a>
            </div>

            <div className="system-pill">
              <span className="brand-dot" />
              All systems operational
            </div>
          </footer>
        </section>

        <aside className="auth-panel">
          <div className="auth-panel-head">
            <div className="auth-eyebrow">{activeCard.tag}</div>
            <h3>{activeCard.title}</h3>
            <p>{activeCard.subtitle}</p>
          </div>

          <div className="auth-card-copy">
            <p>{activeCard.body}</p>
          </div>

          <div className="auth-switcher">
            <button
              type="button"
              className={selectedLayer === "admin" ? "active" : ""}
              onClick={() => setSelectedLayer("admin")}
            >
              Admin
            </button>
            <button
              type="button"
              className={selectedLayer === "b2b" ? "active" : ""}
              onClick={() => setSelectedLayer("b2b")}
            >
              B2B
            </button>
            <button
              type="button"
              className={selectedLayer === "demo" ? "active" : ""}
              onClick={() => setSelectedLayer("demo")}
            >
              Demo
            </button>
          </div>

          <form
            className="auth-form"
            onSubmit={isRegister ? handleRegister : handleLogin}
          >
            <label>
              Email
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            {isRegister && (
              <label>
                Confirm Password
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
            )}

            <button disabled={loading} className="auth-submit" type="submit">
              {loading ? "Loading..." : isRegister ? "Create account" : "Sign in"}
            </button>

            {selectedLayer !== "demo" && (
              <button
                type="button"
                className="auth-link"
                onClick={() => setIsRegister((value) => !value)}
              >
                {isRegister ? "Go to login" : "Create account"}
              </button>
            )}
          </form>

          <div className="auth-note">
            {selectedLayer === "admin" && (
              <span>Admin uses JWT authentication and role-based access.</span>
            )}
            {selectedLayer === "b2b" && (
              <span>B2B clients get API keys, usage quotas, billing, and analytics.</span>
            )}
            {selectedLayer === "demo" && (
              <span>Demo users can preview the platform with public access.</span>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}

export default LoginPage;