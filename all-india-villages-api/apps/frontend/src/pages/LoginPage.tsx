import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

import { api } from "../services/api";
import { useAuthStore } from "../store/authStore";

type PortalId = "admin" | "b2b" | "demo";

type PortalCard = {
  id: PortalId;
  tag: string;
  title: string;
  // Keep optional subtitle/description to satisfy any lingering references
  subtitle?: string;
  description?: string;
};

const portalCards: PortalCard[] = [
  {
    id: "admin",
    tag: "Admin Login",
    title: "Admin Login",
  },
  {
    id: "b2b",
    tag: "User Login",
    title: "User Login",
  },
  {
    id: "demo",
    tag: "Demo Client Login",
    title: "Demo Client Login",
    // demo has no subtitle/description
  },
];

function PortalIcon({ portal }: { portal: PortalId }) {
  if (portal === "admin") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        <path d="M19 8h2M21 6v4" />
      </svg>
    );
  }

  if (portal === "b2b") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function LoginPage() {
  const setToken = useAuthStore((state) => state.setToken);

  const [activePortal, setActivePortal] = useState<PortalId | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [demoEmail, setDemoEmail] = useState("demo@example.com");
  const [demoUseCase, setDemoUseCase] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");

  const portal = useMemo(
    () => portalCards.find((item) => item.id === activePortal) ?? null,
    [activePortal]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePortal(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openPortal = (portalId: PortalId) => {
    setActivePortal(portalId);

    if (portalId === "admin") {
      setEmail("admin@login.com");
      // Seeded admin password in backend is 'Admin' (development convenience)
      setPassword("Admin");
    }

    if (portalId === "demo") {
      setDemoEmail("demo@example.com");
      setDemoUseCase("");
    }
  };

  const closePortal = () => {
    setActivePortal(null);
  };

  const signIn = async (event: FormEvent) => {
    event.preventDefault();

    if (!activePortal) {
      return;
    }

    const loginEmail = activePortal === "demo" ? demoEmail || " " : email;
    const loginPassword = activePortal === "demo" ? "demo-password" : password;

    try {
      setLoading(true);

      const response = await api.post(
        "/v1/auth/login",
        {
          email: loginEmail,
          password: loginPassword,
        },
        activePortal === "admin" ? { headers: { "x-admin-login": "1" } } : undefined
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

    const handleRegister = async (event: FormEvent) => {
      event.preventDefault();

      if (!activePortal) return;

      try {
        setLoading(true);
        if (activePortal === "b2b") {
          // register a normal user
          const { registerUser } = await import("../services/authApi");
          await registerUser({ email, password, firstName: regFirstName, lastName: regLastName });
          alert("Registration successful. You can now sign in.");
          setIsRegister(false);
        } else if (activePortal === "demo") {
          const { registerDemo } = await import("../services/authApi");
          await registerDemo({ email: demoEmail, firstName: regFirstName, lastName: regLastName, useCase: demoUseCase });
          alert("Demo registration submitted. Check your email for demo access.");
          setIsRegister(false);
        }
      } catch (err) {
        console.error(err);
        alert("Registration failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="login-page">
      <div className="login-page__bg" aria-hidden="true">
        <div className="login-page__grid" />
        <div className="login-page__vignette" />
        <div className="login-page__accent login-page__accent--gold" />
        <div className="login-page__accent login-page__accent--teal" />
      </div>

      <div className="login-page__wrap">
        <header className="login-page__header">
          <div className="login-page__logo-row">
            <div className="login-page__logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <div className="login-page__logo-name">
              Village<span>API</span>
            </div>
          </div>

          <h1 className="login-page__title">
            CAPSTONE
          </h1>

          <div className="login-page__admin-link-row">
            <button
              type="button"
              className="text-sm text-gray-500 hover:underline"
              onClick={() => openPortal("admin")}
            >
            </button>
          </div>

        </header>

        <section className="login-page__portals">
          {portalCards.map((card) => (
            <button
              key={card.id}
              type="button"
              className={`login-page__portal login-page__portal--${card.id}`}
              onClick={() => openPortal(card.id)}
            >
              <div className={`login-page__tag login-page__tag--${card.id}`}>
                <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
                  <circle cx="4" cy="4" r="3" fill="currentColor" />
                </svg>
                {card.tag}
              </div>
              <span className={`login-page__cta login-page__cta--${card.id}`}>
                {card.id === "admin"
                  ? "Sign in as Admin"
                  : card.id === "b2b"
                    ? "User Sign In"
                    : "Try the Demo"}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          ))}
        </section>

        <footer className="login-page__footer">
          <div className="login-page__footer-links">
            <a href="#">Documentation</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Support</a>
          </div>

          <div className="login-page__status-pill">
            <span className="login-page__status-dot" />
            All systems operational
          </div>
        </footer>
      </div>

      <div
        className={`login-page__overlay ${activePortal ? "is-open" : ""}`}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closePortal();
          }
        }}
      >
        {portal && (
          <div className="login-page__modal">
            <div className="login-page__modal-top">
              <div className={`login-page__modal-accent login-page__modal-accent--${portal.id}`} />
              <div className={`login-page__modal-icon login-page__modal-icon--${portal.id}`}>
                <PortalIcon portal={portal.id} />
              </div>

              <button type="button" className="login-page__close" onClick={closePortal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="login-page__modal-body">
              <form onSubmit={isRegister ? handleRegister : signIn} className="login-page__form">
                {portal.id === "demo" && (
                  <>
                    <div className="login-page__field">
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder={portal.id === "demo" ? "demo@example.com" : "you@yourcompany.com"}
                        value={portal.id === "demo" ? demoEmail : email}
                        onChange={(event) => portal.id === "demo" ? setDemoEmail(event.target.value) : setEmail(event.target.value)}
                      />
                    </div>

                    <div className="login-page__field">
                      <label>Password</label>
                      <input
                        type="password"
                        placeholder={portal.id === "demo" ? "Demo password" : "Enter your password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>

                    <div className="login-page__remember-row">
                      <label className="login-page__check-label">
                        <input type="checkbox" />
                        Remember me
                      </label>
                      <a href="#">Forgot password?</a>
                    </div>
                  </>
                     )
            }

                {!isRegister && portal.id === "b2b" && (
                  <>
                    <div className="login-page__field">
                      <label>User Email</label>
                      <input
                        type="email"
                        placeholder="you@yourcompany.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>

                    <div className="login-page__field">
                      <label>Password</label>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>

                    <div className="login-page__remember-row">
                      <label className="login-page__check-label">
                        <input type="checkbox" />
                        Remember me
                      </label>
                      <a href="#">Forgot password?</a>
                    </div>
                  </>
                )}

                {isRegister && (portal.id === "b2b" || portal.id === "demo") && (
                  <>
                    <div className="login-page__field">
                      <label>First Name</label>
                      <input type="text" placeholder="First name" value={regFirstName} onChange={(e) => setRegFirstName(e.target.value)} />
                    </div>

                    <div className="login-page__field">
                      <label>Last Name</label>
                      <input type="text" placeholder="Last name" value={regLastName} onChange={(e) => setRegLastName(e.target.value)} />
                    </div>

                    <div className="login-page__field">
                      <label>Email</label>
                      <input type="email" placeholder="you@yourcompany.com" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>

                    <div className="login-page__field">
                      <label>Password</label>
                      <input type="password" placeholder="Choose a password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>

                    {portal.id === "demo" && (
                      <div className="login-page__field">
                        <label>Use Case <span>(optional)</span></label>
                        <input type="text" placeholder="e.g. Address validation" value={demoUseCase} onChange={(e) => setDemoUseCase(e.target.value)} />
                      </div>
                    )}

                    <div className="login-page__remember-row">
                      <button type="button" className="text-sm text-blue-600" onClick={() => setIsRegister(false)}>Back to Sign In</button>
                    </div>
                  </>
                )}

                {/* Demo-specific note remains above registration; unified login fields cover demo and user */}

                

                <button type="submit" className="login-page__submit" disabled={loading}>
                  {loading
                    ? "Loading..."
                    : isRegister
                      ? "Register"
                      : portal.id === "admin"
                        ? "Sign In to Admin"
                        : "Sign In to Portal"}
                </button>
              </form>
            </div>

            <div className="login-page__modal-footer">
              {portal.id === "admin" && (
                <>
                  Need access? <a href="#">Contact Superadmin →</a>
                </>
              )}

              {portal.id === "b2b" && (
                <>
                  New User? <button type="button" className="text-blue-600" onClick={() => setIsRegister(true)}>Register for access →</button>
                </>

                )}

              {portal.id === "demo" && (
                <>
                  Want full access? <button type="button" className="text-blue-600" onClick={() => setIsRegister(true)}>Register a Demo account →</button>
                </>

                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;