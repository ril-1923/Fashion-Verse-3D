import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="fv-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-5">
            <h5>
              <i className="bi bi-gem" style={{ color: 'var(--fv-gold)' }} />{' '}
              FashionVerse 3D
            </h5>
            <p className="mb-0" style={{ maxWidth: 360 }}>
              A virtual fashion design studio where you sculpt garments in 3D,
              customize every detail, and curate your own collection.
            </p>
          </div>
          <div className="col-6 col-md-3">
            <h5>Explore</h5>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/studio">Design Studio</Link>
              </li>
              <li>
                <Link to="/collections">Collections</Link>
              </li>
              <li>
                <Link to="/my-designs">My Designs</Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-4">
            <h5>Crafted in 3D</h5>
            <p className="mb-0" style={{ color: 'var(--fv-muted)' }}>
              Built with React Three Fiber and procedural geometry. No external
              models required.
            </p>
          </div>
        </div>
        <div className="fv-divider" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <span style={{ color: 'var(--fv-muted)' }}>
            © {new Date().getFullYear()} FashionVerse 3D. A design concept.
          </span>
          <span style={{ color: 'var(--fv-muted)' }}>
            Interactive 3D · Custom Designs · Virtual Fashion
          </span>
        </div>
      </div>
    </footer>
  );
}
