import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

import { api } from "../services/api";
import { useAuthStore } from "../store/authStore";

type PortalId = "admin" | "b2b" | "demo";

type PortalCard = {
  id: PortalId;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
};

const portalCards: PortalCard[] = [
  {
    id: "admin",
    tag: "Admin User",
    title: "Admin Portal",
    subtitle: "React SPA · Internal",
    description:
      "Full platform control — user approvals, API key management, analytics, and village master data.",
  },
  {
    id: "b2b",
    tag: "B2B Client",
    title: "B2B Client Portal",
    subtitle: "React SPA · Business",
    description:
      "For registered businesses — manage API keys, view usage analytics, access Swagger docs and integration guides.",
  },
  {
    id: "demo",
    tag: "Demo Client",
    title: "Demo Client",
    subtitle: "Contact Form · Public",
    description:
      "Try the live address autocomplete and village search API with a restricted demo key. No signup required.",
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
  const [twoFactor, setTwoFactor] = useState("");
  const [demoEmail, setDemoEmail] = useState("demo@example.com");
  const [demoUseCase, setDemoUseCase] = useState("");
  const [loading, setLoading] = useState(false);

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
      setPassword("");
      setTwoFactor("");
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

    const loginEmail = activePortal === "demo" ? demoEmail || "demo@example.com" : email;
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
            Access the <em>Client Layer</em>
          </h1>

          <p className="login-page__subtitle">
            India&apos;s most complete village data platform · 6,40,930 villages · Census 2011
          </p>
        </header>

        <div className="login-page__layer-label">Client Layer — React SPA</div>

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

              <div className={`login-page__icon login-page__icon--${card.id}`}>
                <PortalIcon portal={card.id} />
              </div>

              <h2>{card.title}</h2>
              <div className="login-page__portal-subtitle">{card.subtitle}</div>
              <p>{card.description}</p>

              <span className={`login-page__cta login-page__cta--${card.id}`}>
                {card.id === "admin"
                  ? "Sign in as Admin"
                  : card.id === "b2b"
                    ? "Business Sign In"
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

              <div className="login-page__modal-title">
                <h3>{portal.title}</h3>
                <p>{portal.subtitle}</p>
              </div>

              <button type="button" className="login-page__close" onClick={closePortal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="login-page__modal-body">
              <form onSubmit={signIn} className="login-page__form">
                {portal.id === "admin" && (
                  <>
                    <div className="login-page__field">
                      <label>Admin Email</label>
                      <input
                        type="email"
                        placeholder="admin@villageapi.in"
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

                    <div className="login-page__field">
                      <label>2FA Code</label>
                      <input
                        type="text"
                        placeholder="6-digit OTP"
                        maxLength={6}
                        value={twoFactor}
                        onChange={(event) => setTwoFactor(event.target.value)}
                      />
                    </div>

                    <div className="login-page__remember-row">
                      <label className="login-page__check-label">
                        <input type="checkbox" />
                        Stay signed in
                      </label>
                      <a href="#">Forgot password?</a>
                    </div>
                  </>
                )}

                {portal.id === "b2b" && (
                  <>
                    <button type="button" className="login-page__oauth-btn">
                      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Continue with Google
                    </button>

                    <div className="login-page__divider">or sign in with email</div>

                    <div className="login-page__field">
                      <label>Business Email</label>
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

                {portal.id === "demo" && (
                  <>
                    <div className="login-page__demo-note">
                      Demo key is rate-limited to 50 requests/day. For full access, register a B2B account.
                    </div>

                    <div className="login-page__field-row">
                      <div className="login-page__field">
                        <label>First Name</label>
                        <input type="text" placeholder="Priya" />
                      </div>

                      <div className="login-page__field">
                        <label>Last Name</label>
                        <input type="text" placeholder="Sharma" />
                      </div>
                    </div>

                    <div className="login-page__field">
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="demo@example.com"
                        value={demoEmail}
                        onChange={(event) => setDemoEmail(event.target.value)}
                      />
                    </div>

                    <div className="login-page__field">
                      <label>Use Case <span>(optional)</span></label>
                      <input
                        type="text"
                        placeholder="e.g. Address validation, geo-tagging…"
                        value={demoUseCase}
                        onChange={(event) => setDemoUseCase(event.target.value)}
                      />
                    </div>
                  </>
                )}

                <button type="submit" className="login-page__submit" disabled={loading}>
                  {loading
                    ? "Loading..."
                    : portal.id === "admin"
                      ? "Sign In to Admin"
                      : portal.id === "b2b"
                        ? "Sign In to Portal"
                        : "Launch Demo"}
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
                  New business? <a href="#">Register for access →</a>
                </>
              )}

              {portal.id === "demo" && (
                <>
                  Want full access? <a href="#">Register a business account →</a>
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