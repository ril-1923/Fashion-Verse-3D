import { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import GarmentScene from '@/components/GarmentScene';
import CustomizationPanel from '@/components/CustomizationPanel';
import { useDesigns } from '@/hooks/useDesigns';
import { useToast } from '@/components/Toast';
import { COLLECTIONS } from '@/data/collections';
import { DEFAULT_DESIGN } from '@/types';
import type { DesignConfig } from '@/types';

export default function DesignStudio() {
  const { saveDesign, getDesign } = useDesigns();
  const { show } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [config, setConfig] = useState<DesignConfig>(() => {
    // Initialize from collection or saved design query params.
    const collectionId = searchParams.get('collection');
    const designId = searchParams.get('design');
    if (collectionId) {
      const col = COLLECTIONS.find((c) => c.id === collectionId);
      if (col) {
        return {
          name: `${col.name} Inspiration`,
          description: col.description,
          garment: col.garment,
          color: col.color,
          customColor: col.customColor,
          material: col.material,
          pattern: col.pattern,
        };
      }
    }
    if (designId) {
      // resolve via location state (passed from My Designs) or localStorage
      const fromState = (location.state as { design?: DesignConfig } | null)
        ?.design;
      if (fromState) return { ...fromState };
      const saved = getDesign(designId);
      if (saved) {
        const { id: _id, createdAt: _c, ...rest } = saved;
        return { ...rest };
      }
    }
    return { ...DEFAULT_DESIGN };
  });

  const [resetSignal, setResetSignal] = useState(0);
  const [rotateSignal, setRotateSignal] = useState(0);

  const onChange = useCallback((patch: Partial<DesignConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  }, []);

  const onReset = useCallback(() => {
    setConfig({ ...DEFAULT_DESIGN });
    setResetSignal((s) => s + 1);
    show('Design reset to defaults');
  }, [show]);

  const onResetCamera = useCallback(() => {
    setResetSignal((s) => s + 1);
  }, []);

  const onRotate = useCallback(() => {
    setRotateSignal((s) => s + 1);
  }, []);

  const onSave = useCallback(() => {
    const trimmed = config.name.trim() || 'Untitled Design';
    const saved = saveDesign({ ...config, name: trimmed });
    show(`Saved "${saved.name}"`);
  }, [config, saveDesign, show]);

  const headerHint = useMemo(() => {
    const collectionId = searchParams.get('collection');
    const designId = searchParams.get('design');
    if (collectionId) {
      const col = COLLECTIONS.find((c) => c.id === collectionId);
      return col ? `Collection: ${col.name}` : null;
    }
    if (designId) return 'Loaded from My Designs';
    return null;
  }, [searchParams]);

  return (
    <div className="container fv-section">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-2">
        <div>
          <div className="fv-eyebrow">Design Studio</div>
          <h1 className="fv-section-title mb-1">Sculpt your garment in 3D</h1>
          <p className="fv-section-sub mb-0">
            Pick a garment, tune the color, material and pattern, then save it
            to your collection. Drag to orbit, scroll to zoom.
          </p>
        </div>
        {headerHint && (
          <span
            className="fv-canvas-badge"
            style={{ pointerEvents: 'auto', position: 'static' }}
          >
            <i className="bi bi-stars me-1" />
            {headerHint}
          </span>
        )}
      </div>

      <div className="fv-studio-grid">
        <div className="fv-canvas-wrap">
          <div className="fv-canvas-overlay">
            <span className="fv-canvas-badge">
              <i className="bi bi-arrows-move me-1" />
              Drag to orbit · Scroll to zoom
            </span>
            <span className="fv-canvas-badge">
              {config.garment} · {config.color}
            </span>
          </div>
          <div className="fv-canvas-controls">
            <button
              className="btn btn-fv-ghost"
              title="Reset camera"
              onClick={onResetCamera}
              aria-label="Reset camera"
            >
              <i className="bi bi-camera" />
            </button>
            <button
              className="btn btn-fv-ghost"
              title="Back to home"
              onClick={() => navigate('/')}
              aria-label="Back to home"
            >
              <i className="bi bi-house" />
            </button>
          </div>
          <GarmentScene
            config={config}
            resetSignal={resetSignal}
            rotateSignal={rotateSignal}
          />
        </div>

        <CustomizationPanel
          config={config}
          onChange={onChange}
          onReset={onReset}
          onSave={onSave}
          onRotate={onRotate}
          onResetCamera={onResetCamera}
        />
      </div>
    </div>
  );
}
