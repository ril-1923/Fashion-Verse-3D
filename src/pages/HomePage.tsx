import { Link } from 'react-router-dom';
import { COLLECTIONS } from '@/data/collections';

const FEATURES = [
  {
    icon: 'bi-box',
    title: 'Interactive 3D',
    text: 'Rotate, zoom, and inspect every angle of your garment in a real-time 3D studio.',
  },
  {
    icon: 'bi-palette',
    title: 'Custom Designs',
    text: 'Tune color, material, and pattern. Save unlimited designs to your personal collection.',
  },
  {
    icon: 'bi-stars',
    title: 'Virtual Fashion',
    text: 'Visualize styles before they exist — a digital atelier for modern creators.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="fv-hero">
        <div className="fv-hero-bg" />
        <div className="container position-relative">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <div className="fv-hero-eyebrow">FashionVerse 3D · Virtual Atelier</div>
              <h1>
                Design Your Style.
                <br />
                Experience It in <span className="fv-gold-text">3D.</span>
              </h1>
              <p className="lead mt-4">
                Step into a virtual fashion studio where you sculpt garments in
                three dimensions, customize every detail, and curate a
                collection that is unmistakably yours.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="/studio" className="btn btn-fv-gold">
                  <i className="bi bi-box-arrow-in-right me-2" />
                  Enter Design Studio
                </Link>
                <Link to="/collections" className="btn btn-fv-outline">
                  Browse Collections
                </Link>
              </div>
            </div>

            {/* Visual preview card */}
            <div className="col-lg-5">
              <div
                className="fv-glass p-4 position-relative"
                style={{ minHeight: 360 }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 18,
                    background:
                      'radial-gradient(400px 300px at 60% 20%, rgba(201,162,75,0.22), transparent 60%)',
                  }}
                />
                <div className="position-relative text-center">
                  <div
                    style={{
                      fontSize: '7rem',
                      color: 'var(--fv-gold)',
                      lineHeight: 1,
                    }}
                  >
                    <i className="bi bi-gem" />
                  </div>
                  <h3
                    style={{ color: 'var(--fv-cream)', marginTop: 8 }}
                    className="mb-1"
                  >
                    Your digital mannequin
                  </h3>
                  <p style={{ color: 'var(--fv-cream-dim)' }}>
                    A live 3D preview of every garment you design.
                  </p>
                  <Link
                    to="/studio"
                    className="btn btn-fv-outline btn-sm mt-2"
                  >
                    Try it now <i className="bi bi-arrow-right ms-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="fv-section">
        <div className="container">
          <div className="text-center mb-5">
            <div className="fv-eyebrow">Why FashionVerse</div>
            <h2 className="fv-section-title">A studio built for imagination</h2>
          </div>
          <div className="row g-4">
            {FEATURES.map((f) => (
              <div className="col-md-4" key={f.title}>
                <div className="fv-feature-card">
                  <div className="fv-feature-icon">
                    <i className={`bi ${f.icon}`} />
                  </div>
                  <h4 style={{ color: 'var(--fv-cream)' }}>{f.title}</h4>
                  <p className="mb-0" style={{ color: 'var(--fv-cream-dim)' }}>
                    {f.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured collections */}
      <section className="fv-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <div className="fv-eyebrow">Featured</div>
              <h2 className="fv-section-title mb-0">Curated collections</h2>
            </div>
            <Link to="/collections" className="btn btn-fv-outline btn-sm">
              View all <i className="bi bi-arrow-right ms-1" />
            </Link>
          </div>
          <div className="row g-4">
            {COLLECTIONS.slice(0, 3).map((c) => (
              <div className="col-md-4" key={c.id}>
                <div className="fv-collection-card">
                  <div
                    className="fv-collection-cover"
                    style={{ background: c.gradient }}
                  >
                    <i className={`bi ${c.icon}`} />
                  </div>
                  <div className="fv-collection-body">
                    <h5 style={{ color: 'var(--fv-cream)' }}>{c.name}</h5>
                    <p
                      style={{
                        color: 'var(--fv-cream-dim)',
                        fontSize: '0.9rem',
                      }}
                    >
                      {c.description}
                    </p>
                    <Link
                      to={`/studio?collection=${c.id}`}
                      className="btn btn-fv-outline btn-sm"
                    >
                      Explore <i className="bi bi-arrow-right ms-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="fv-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            className="fv-glass p-5 text-center"
            style={{
              background:
                'linear-gradient(135deg, rgba(201,162,75,0.12), rgba(20,20,20,0.6))',
            }}
          >
            <h2 className="fv-section-title">Ready to design?</h2>
            <p className="fv-section-sub mx-auto mb-4">
              Open the studio and bring your first garment to life in under a
              minute.
            </p>
            <Link to="/studio" className="btn btn-fv-gold">
              <i className="bi bi-box-arrow-in-right me-2" />
              Enter Design Studio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
