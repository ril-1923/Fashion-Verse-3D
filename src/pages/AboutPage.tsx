import { Link } from 'react-router-dom';

const HIGHLIGHTS = [
  {
    icon: 'bi-box',
    title: 'Real-time 3D',
    text: 'A procedural mannequin and garments rendered live with React Three Fiber — no downloads, no plugins.',
  },
  {
    icon: 'bi-palette',
    title: 'Endless customization',
    text: 'Four garments, six materials and patterns, and a full color picker. Every change updates the model instantly.',
  },
  {
    icon: 'bi-bookmark',
    title: 'Your personal library',
    text: 'Designs are saved to your browser, so your collection travels with you on this device.',
  },
];

const STATS = [
  { value: '4', label: 'Garment types' },
  { value: '6+', label: 'Colors & custom' },
  { value: '4', label: 'Materials' },
  { value: '∞', label: 'Saved designs' },
];

export default function AboutPage() {
  return (
    <div className="container fv-section">
      <div className="row g-5 align-items-center">
        <div className="col-lg-7">
          <div className="fv-eyebrow">About</div>
          <h1 className="fv-section-title mb-3">
            Fashion meets three dimensions
          </h1>
          <p className="fv-section-sub mb-4">
            FashionVerse 3D is a virtual atelier — a place to design, preview,
            and collect garments in an interactive 3D environment. Whether you
            are sketching a streetwear drop or imagining an evening dress, the
            studio lets you see your ideas take shape from every angle.
          </p>
          <p style={{ color: 'var(--fv-cream-dim)' }} className="mb-4">
            Everything runs in your browser. The mannequin and garments are
            built from procedural geometry, so there are no large model files to
            download — just fast, responsive 3D that works on desktop and
            tablet.
          </p>
          <Link to="/studio" className="btn btn-fv-gold">
            <i className="bi bi-box-arrow-in-right me-2" />
            Try the studio
          </Link>
        </div>
        <div className="col-lg-5">
          <div className="fv-glass p-4">
            <div className="row g-3 text-center">
              {STATS.map((s) => (
                <div className="col-6" key={s.label}>
                  <div className="fv-about-stat">{s.value}</div>
                  <div
                    style={{
                      color: 'var(--fv-cream-dim)',
                      fontSize: '0.82rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fv-divider my-5" />

      <div className="text-center mb-5">
        <div className="fv-eyebrow">What makes it different</div>
        <h2 className="fv-section-title mb-0">Three things to love</h2>
      </div>
      <div className="row g-4">
        {HIGHLIGHTS.map((h) => (
          <div className="col-md-4" key={h.title}>
            <div className="fv-feature-card">
              <div className="fv-feature-icon">
                <i className={`bi ${h.icon}`} />
              </div>
              <h4 style={{ color: 'var(--fv-cream)' }}>{h.title}</h4>
              <p className="mb-0" style={{ color: 'var(--fv-cream-dim)' }}>
                {h.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
