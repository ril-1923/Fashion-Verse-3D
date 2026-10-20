import type { DesignConfig, GarmentType, MaterialType, PatternType, PresetColor } from '@/types';
import { PRESET_COLORS } from '@/types';

interface Props {
  config: DesignConfig;
  onChange: (patch: Partial<DesignConfig>) => void;
  onReset: () => void;
  onSave: () => void;
  onRotate: () => void;
  onResetCamera: () => void;
}

const GARMENTS: { id: GarmentType; label: string; icon: string }[] = [
  { id: 'tshirt', label: 'T-Shirt', icon: 'bi-caret-up' },
  { id: 'hoodie', label: 'Hoodie', icon: 'bi-cloud' },
  { id: 'jacket', label: 'Jacket', icon: 'bi-bag' },
  { id: 'dress', label: 'Dress', icon: 'bi-star' },
];

const MATERIALS: { id: MaterialType; label: string }[] = [
  { id: 'cotton', label: 'Cotton' },
  { id: 'denim', label: 'Denim' },
  { id: 'leather', label: 'Leather' },
  { id: 'satin', label: 'Satin' },
];

const PATTERNS: { id: PatternType; label: string }[] = [
  { id: 'solid', label: 'Solid' },
  { id: 'stripes', label: 'Stripes' },
  { id: 'dots', label: 'Dots' },
];

const SWATCHES: Exclude<PresetColor, 'custom'>[] = [
  'black',
  'white',
  'red',
  'blue',
  'purple',
  'emerald',
];

export default function CustomizationPanel({
  config,
  onChange,
  onReset,
  onSave,
  onRotate,
  onResetCamera,
}: Props) {
  return (
    <div className="fv-glass p-4">
      {/* Garment name */}
      <div className="fv-control-group">
        <label className="fv-control-label" htmlFor="design-name">
          Design name
        </label>
        <input
          id="design-name"
          className="fv-input"
          value={config.name}
          maxLength={60}
          placeholder="Untitled Design"
          onChange={(e) => onChange({ name: e.target.value })}
        />
      </div>

      {/* Garment type */}
      <div className="fv-control-group">
        <span className="fv-control-label">Garment</span>
        <div className="fv-pill-group">
          {GARMENTS.map((g) => (
            <button
              key={g.id}
              type="button"
              className={`fv-pill${config.garment === g.id ? ' active' : ''}`}
              onClick={() => onChange({ garment: g.id })}
              aria-pressed={config.garment === g.id}
            >
              <i className={`bi ${g.icon} me-1`} /> {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="fv-control-group">
        <span className="fv-control-label">Color</span>
        <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
          {SWATCHES.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={c}
              className={`fv-swatch${config.color === c ? ' active' : ''}`}
              style={{ background: PRESET_COLORS[c] }}
              onClick={() => onChange({ color: c })}
              aria-pressed={config.color === c}
            />
          ))}
          <button
            type="button"
            aria-label="Custom color"
            className={`fv-swatch${config.color === 'custom' ? ' active' : ''}`}
            style={{
              background:
                'conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
            }}
            onClick={() => onChange({ color: 'custom' })}
            aria-pressed={config.color === 'custom'}
          />
        </div>
        {config.color === 'custom' && (
          <input
            type="color"
            className="fv-color-input"
            value={config.customColor}
            aria-label="Pick custom color"
            onChange={(e) => onChange({ customColor: e.target.value })}
          />
        )}
      </div>

      {/* Material */}
      <div className="fv-control-group">
        <span className="fv-control-label">
          Material <span style={{ color: 'var(--fv-muted)' }}>(visual sim)</span>
        </span>
        <div className="fv-pill-group">
          {MATERIALS.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`fv-pill${config.material === m.id ? ' active' : ''}`}
              onClick={() => onChange({ material: m.id })}
              aria-pressed={config.material === m.id}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pattern */}
      <div className="fv-control-group">
        <span className="fv-control-label">Pattern</span>
        <div className="fv-pill-group">
          {PATTERNS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`fv-pill${config.pattern === p.id ? ' active' : ''}`}
              onClick={() => onChange({ pattern: p.id })}
              aria-pressed={config.pattern === p.id}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="fv-control-group">
        <label className="fv-control-label" htmlFor="design-desc">
          Description
        </label>
        <textarea
          id="design-desc"
          className="fv-textarea"
          value={config.description}
          maxLength={280}
          placeholder="Notes about this design…"
          onChange={(e) => onChange({ description: e.target.value })}
        />
      </div>

      <div className="fv-divider" />

      {/* Actions */}
      <div className="d-grid gap-2">
        <button type="button" className="btn btn-fv-gold" onClick={onSave}>
          <i className="bi bi-bookmark-plus me-2" />
          Save Design
        </button>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-fv-outline flex-fill"
            onClick={onRotate}
          >
            <i className="bi bi-arrow-repeat me-1" /> Rotate
          </button>
          <button
            type="button"
            className="btn btn-fv-outline flex-fill"
            onClick={onResetCamera}
          >
            <i className="bi bi-camera me-1" /> Camera
          </button>
        </div>
        <button type="button" className="btn btn-fv-ghost" onClick={onReset}>
          <i className="bi bi-arrow-counterclockwise me-1" /> Reset design
        </button>
      </div>
    </div>
  );
}
