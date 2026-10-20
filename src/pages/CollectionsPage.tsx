import { Link } from 'react-router-dom';
import { COLLECTIONS } from '@/data/collections';

export default function CollectionsPage() {
  return (
    <div className="container fv-section">
      <div className="text-center mb-5">
        <div className="fv-eyebrow">Collections</div>
        <h1 className="fv-section-title mb-2">Explore signature styles</h1>
        <p className="fv-section-sub mx-auto mb-0">
          Six curated collections, each tuned with a default garment, color,
          and material. Open any in the studio and make it your own.
        </p>
      </div>

      <div className="row g-4">
        {COLLECTIONS.map((c) => (
          <div className="col-md-6 col-lg-4" key={c.id}>
            <div className="fv-collection-card">
              <div
                className="fv-collection-cover"
                style={{ background: c.gradient }}
              >
                <i className={`bi ${c.icon}`} />
                <span
                  className="fv-canvas-badge"
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    left: 12,
                    pointerEvents: 'auto',
                  }}
                >
                  {c.garment} · {c.material}
                </span>
              </div>
              <div className="fv-collection-body">
                <h5 style={{ color: 'var(--fv-cream)' }}>{c.name}</h5>
                <p
                  style={{
                    color: 'var(--fv-cream-dim)',
                    fontSize: '0.9rem',
                    minHeight: 56,
                  }}
                >
                  {c.description}
                </p>
                <Link
                  to={`/studio?collection=${c.id}`}
                  className="btn btn-fv-gold btn-sm"
                >
                  <i className="bi bi-arrow-right-circle me-1" />
                  Explore Collection
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
