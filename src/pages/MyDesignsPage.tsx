import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDesigns } from '@/hooks/useDesigns';
import { useToast } from '@/components/Toast';
import { resolveColorHex, PRESET_COLORS } from '@/types';
import type { SavedDesign } from '@/types';

const GARMENT_ICON: Record<string, string> = {
  tshirt: 'bi-caret-up',
  hoodie: 'bi-cloud',
  jacket: 'bi-bag',
  dress: 'bi-star',
};

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '—';
  }
}

export default function MyDesignsPage() {
  const { designs, deleteDesign, updateDesign } = useDesigns();
  const { show } = useToast();
  const navigate = useNavigate();

  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const openInStudio = (d: SavedDesign) => {
    navigate(`/studio?design=${d.id}`, { state: { design: { ...d } } });
  };

  const startRename = (d: SavedDesign) => {
    setRenamingId(d.id);
    setRenameValue(d.name);
  };

  const commitRename = () => {
    if (!renamingId) return;
    const trimmed = renameValue.trim() || 'Untitled Design';
    updateDesign(renamingId, { name: trimmed });
    setRenamingId(null);
    show('Design renamed');
  };

  const handleDelete = (id: string) => {
    deleteDesign(id);
    setConfirmId(null);
    show('Design deleted');
  };

  return (
    <div className="container fv-section">
      <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-3">
        <div>
          <div className="fv-eyebrow">Your library</div>
          <h1 className="fv-section-title mb-1">My Designs</h1>
          <p className="fv-section-sub mb-0">
            Every design you save is stored locally on this device. Open one to
            keep customizing.
          </p>
        </div>
        <Link to="/studio" className="btn btn-fv-gold">
          <i className="bi bi-plus-lg me-1" /> New Design
        </Link>
      </div>

      {designs.length === 0 ? (
        <div className="fv-empty">
          <i className="bi bi-bookmark d-block" />
          <h4 style={{ color: 'var(--fv-cream)' }}>No designs yet</h4>
          <p className="mb-3">
            Head to the Design Studio to create your first garment.
          </p>
          <Link to="/studio" className="btn btn-fv-outline">
            Enter Studio
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {designs.map((d) => {
            const hex = resolveColorHex(d.color, d.customColor);
            const isConfirming = confirmId === d.id;
            const isRenaming = renamingId === d.id;
            return (
              <div className="col-md-6 col-lg-4" key={d.id}>
                <div className="fv-design-card">
                  <div
                    className="fv-design-cover"
                    style={{
                      background: `linear-gradient(135deg, ${hex} 0%, ${PRESET_COLORS.black} 140%)`,
                    }}
                  >
                    <i className={`bi ${GARMENT_ICON[d.garment] ?? 'bi-gem'}`} />
                  </div>
                  <div className="p-3">
                    {isRenaming ? (
                      <div className="d-flex gap-2 mb-2">
                        <input
                          className="fv-input"
                          value={renameValue}
                          autoFocus
                          maxLength={60}
                          onChange={(e) => setRenameValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') commitRename();
                            if (e.key === 'Escape') setRenamingId(null);
                          }}
                        />
                        <button
                          className="btn btn-fv-gold btn-sm"
                          onClick={commitRename}
                        >
                          <i className="bi bi-check-lg" />
                        </button>
                      </div>
                    ) : (
                      <h6
                        style={{ color: 'var(--fv-cream)' }}
                        className="mb-1 text-truncate"
                      >
                        {d.name}
                      </h6>
                    )}
                    <div className="fv-design-meta mb-2">
                      {d.garment} · {d.material} · {d.pattern}
                    </div>
                    {d.description && (
                      <p
                        style={{
                          color: 'var(--fv-cream-dim)',
                          fontSize: '0.82rem',
                          marginBottom: 8,
                        }}
                        className="text-truncate"
                      >
                        {d.description}
                      </p>
                    )}
                    <div className="fv-design-meta mb-3">
                      <i className="bi bi-calendar3 me-1" />
                      {formatDate(d.createdAt)}
                    </div>

                    {isConfirming ? (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-fv-gold btn-sm flex-fill"
                          onClick={() => handleDelete(d.id)}
                        >
                          Confirm delete
                        </button>
                        <button
                          className="btn btn-fv-outline btn-sm"
                          onClick={() => setConfirmId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-fv-gold btn-sm flex-fill"
                          onClick={() => openInStudio(d)}
                        >
                          <i className="bi bi-box-arrow-in-right me-1" />
                          Open
                        </button>
                        <button
                          className="btn btn-fv-outline btn-sm"
                          onClick={() => startRename(d)}
                          aria-label="Rename design"
                        >
                          <i className="bi bi-pencil" />
                        </button>
                        <button
                          className="btn btn-fv-outline btn-sm"
                          onClick={() => setConfirmId(d.id)}
                          aria-label="Delete design"
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
