import "./index.css";

const sampleResponse = {
  success: true,
  data: [
    { name: "Bengaluru", district: "Bengaluru Urban", state: "Karnataka" },
    { name: "Mysuru", district: "Mysuru", state: "Karnataka" },
  ],
};

const features = [
  "Public landing page with no login required",
  "Limited quota demo endpoints",
  "Sample API response previews",
  "Contact form for business inquiries",
];

const pricing = [
  { plan: "Starter", price: "Free", quota: "250 requests", highlight: false },
  { plan: "Growth", price: "$29", quota: "10,000 requests", highlight: true },
  { plan: "Enterprise", price: "Custom", quota: "Unlimited", highlight: false },
];

export default function App() {
  return (
    <main className="demo-shell">
      <header className="demo-hero">
        <nav className="demo-nav">
          <strong>VillageAPI</strong>
          <div>
            <a href="#features">Features</a>
            <a href="#demo">Demo API</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="demo-hero-grid">
          <div>
            <p className="demo-eyebrow">Public / demo client</p>
            <h1>Try the API without login and see how the platform works.</h1>
            <p className="demo-copy">
              A public-facing experience for prospective customers to explore the API, understand features, and request access.
            </p>
            <div className="demo-actions">
              <button>Try Demo</button>
              <button className="secondary">Request Access</button>
            </div>
          </div>

          <div className="demo-feature-card">
            <div className="demo-card-top">
              <span>Sample API</span>
              <strong>Autocomplete</strong>
            </div>
            <div className="demo-sample-code">
              <pre>{`GET /v1/autocomplete?q=del

Response:
{
  "success": true,
  "data": ["Delhi", "Delfgaon"]
}`}</pre>
            </div>
          </div>
        </div>
      </header>

      <section className="demo-section" id="features">
        <div className="demo-section-head">
          <p className="demo-eyebrow">Required features</p>
          <h2>Public access, demo APIs, contact, and marketing content</h2>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature} className="feature-card">
              <div className="feature-badge">Included</div>
              <h3>{feature}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="demo-section demo-grid" id="demo">
        <article className="demo-panel">
          <p className="demo-eyebrow">Sample responses</p>
          <h2>Preview the API payload before you sign up</h2>
          <div className="code-window">
            <pre>{JSON.stringify(sampleResponse, null, 2)}</pre>
          </div>
        </article>

        <article className="demo-panel" id="contact">
          <p className="demo-eyebrow">Public contact</p>
          <h2>Business inquiries and API access requests</h2>
          <form className="contact-form">
            <input placeholder="Company name" />
            <input placeholder="Work email" />
            <textarea placeholder="Tell us about your use case" rows={5} />
            <button type="button">Send request</button>
          </form>
        </article>
      </section>

      <section className="demo-section" id="pricing">
        <div className="demo-section-head">
          <p className="demo-eyebrow">Pricing</p>
          <h2>Simple plans for public demo and production onboarding</h2>
        </div>

        <div className="pricing-grid">
          {pricing.map((item) => (
            <article key={item.plan} className={`pricing-card ${item.highlight ? "highlight" : ""}`}>
              <h3>{item.plan}</h3>
              <strong>{item.price}</strong>
              <p>{item.quota}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}