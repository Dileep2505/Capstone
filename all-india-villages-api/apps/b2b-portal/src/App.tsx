import "./index.css";

const metrics = [
  { label: "Monthly quota", value: "100,000", detail: "API requests remaining" },
  { label: "API keys", value: "4", detail: "2 active, 2 rotating" },
  { label: "Request success", value: "99.96%", detail: "Last 30 days" },
  { label: "Alerts", value: "3", detail: "Quota and billing notices" },
];

const requests = [
  { endpoint: "/v1/states", method: "GET", status: "200", latency: "82 ms" },
  { endpoint: "/v1/search?q=bangalore", method: "GET", status: "200", latency: "104 ms" },
  { endpoint: "/v1/api-keys", method: "POST", status: "201", latency: "140 ms" },
];

const notifications = [
  "Quota usage crossed 75% on your production key.",
  "Billing renewal is due in 4 days.",
  "New API version notes are available in the docs.",
];

const billLines = [
  { label: "Current plan", value: "Growth" },
  { label: "Included quota", value: "100,000 / month" },
  { label: "Overage", value: "$0.01 / request" },
];

export default function App() {
  return (
    <main className="b2b-shell">
      <aside className="b2b-sidebar">
        <div>
          <div className="brand-lockup">
            <span className="brand-mark">AI</span>
            <div>
              <h1>All India Villages</h1>
              <p>B2B Portal</p>
            </div>
          </div>

          <nav className="sidebar-nav">
            <a href="#overview" className="nav-item active">Overview</a>
            <a href="#keys" className="nav-item">API Keys</a>
            <a href="#analytics" className="nav-item">Analytics</a>
            <a href="#billing" className="nav-item">Billing</a>
            <a href="#playground" className="nav-item">Playground</a>
            <a href="#docs" className="nav-item">Docs</a>
          </nav>
        </div>

        <div className="sidebar-panel">
          <div className="eyebrow">Client status</div>
          <strong>Enterprise-ready access</strong>
          <p>JWT auth, keys, quotas, analytics, and notifications in one place.</p>
        </div>
      </aside>

      <section className="b2b-main">
        <header className="hero-card" id="overview">
          <div>
            <p className="eyebrow">B2B client dashboard</p>
            <h2>Give companies secure API access with quotas, billing, and analytics.</h2>
            <p className="hero-copy">
              Built for logistics, mapping, and government systems that need reliable access, usage visibility, and controlled key management.
            </p>
          </div>

          <div className="hero-actions">
            <button>Generate API Key</button>
            <button className="secondary">Open Playground</button>
          </div>
        </header>

        <section className="metric-grid">
          {metrics.map((metric) => (
            <article key={metric.label} className="metric-card">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.detail}</small>
            </article>
          ))}
        </section>

        <section className="content-grid">
          <article className="panel panel-large" id="analytics">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Analytics</p>
                <h3>Usage report and request history</h3>
              </div>
              <span className="pill success">Live</span>
            </div>

            <div className="chart-shell" aria-label="usage chart">
              {[44, 58, 36, 68, 52, 74, 62].map((bar, index) => (
                <div key={index} className="chart-bar-wrap">
                  <div className="chart-bar" style={{ height: `${bar}%` }} />
                  <span>W{index + 1}</span>
                </div>
              ))}
            </div>

            <div className="request-table">
              <div className="request-row request-head">
                <span>Endpoint</span>
                <span>Method</span>
                <span>Status</span>
                <span>Latency</span>
              </div>
              {requests.map((request) => (
                <div key={request.endpoint} className="request-row">
                  <span>{request.endpoint}</span>
                  <span>{request.method}</span>
                  <span>{request.status}</span>
                  <span>{request.latency}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel" id="keys">
            <div className="panel-head">
              <div>
                <p className="eyebrow">API access</p>
                <h3>Key and secret</h3>
              </div>
              <span className="pill">Secure</span>
            </div>

            <div className="secret-card">
              <span>API key</span>
              <strong>ai_2f7c91c8d4</strong>
              <span>API secret</span>
              <strong>••••••••••••••••</strong>
            </div>

            <ul className="bullet-list">
              <li>Quota tracking for each key</li>
              <li>Revocation and rotation controls</li>
              <li>Environment-specific access</li>
            </ul>
          </article>

          <article className="panel" id="billing">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Billing</p>
                <h3>Subscription and plan limits</h3>
              </div>
              <span className="pill">Growth</span>
            </div>

            <div className="stack-list">
              {billLines.map((line) => (
                <div key={line.label} className="stack-row">
                  <span>{line.label}</span>
                  <strong>{line.value}</strong>
                </div>
              ))}
            </div>

            <button className="secondary wide">Manage billing</button>
          </article>

          <article className="panel" id="playground">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Playground</p>
                <h3>Test the API before shipping</h3>
              </div>
            </div>

            <div className="code-card">
              <pre>{`GET /v1/search?q=delhi
Authorization: Bearer <token>

{
  "success": true,
  "data": [
    { "name": "Delhi", "type": "state" }
  ]
}`}</pre>
            </div>
          </article>

          <article className="panel" id="docs">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Notifications</p>
                <h3>Alerts and API updates</h3>
              </div>
            </div>

            <div className="notification-list">
              {notifications.map((note) => (
                <div key={note} className="notification-item">{note}</div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}