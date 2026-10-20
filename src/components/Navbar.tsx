import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/studio', label: 'Design Studio' },
  { to: '/collections', label: 'Collections' },
  { to: '/my-designs', label: 'My Designs' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fv-navbar sticky-top">
      <div className="container d-flex align-items-center justify-content-between">
        <NavLink to="/" className="fv-brand" onClick={() => setOpen(false)}>
          <i className="bi bi-gem fv-brand-mark" aria-hidden="true" />
          Fashion<span className="fv-brand-accent">Verse</span> 3D
        </NavLink>

        <button
          className="btn btn-fv-ghost d-lg-none"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <i className={`bi ${open ? 'bi-x-lg' : 'bi-list'}`} />
        </button>

        <ul className="d-none d-lg-flex list-unstyled mb-0 gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `fv-nav-link${isActive ? ' active' : ''}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <ul className="d-lg-none list-unstyled mb-0 px-3 pt-2 pb-3 gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `fv-nav-link d-block${isActive ? ' active' : ''}`
                }
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
