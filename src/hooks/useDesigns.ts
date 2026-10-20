import { useCallback, useEffect, useState } from 'react';
import type { SavedDesign } from '@/types';

const STORAGE_KEY = 'fashionverse.designs.v1';

function readStore(): SavedDesign[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidDesign);
  } catch {
    return [];
  }
}

function isValidDesign(value: unknown): value is SavedDesign {
  if (!value || typeof value !== 'object') return false;
  const d = value as Record<string, unknown>;
  return (
    typeof d.id === 'string' &&
    typeof d.name === 'string' &&
    typeof d.garment === 'string' &&
    typeof d.color === 'string' &&
    typeof d.material === 'string' &&
    typeof d.pattern === 'string' &&
    typeof d.createdAt === 'string'
  );
}

function writeStore(designs: SavedDesign[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
  } catch {
    // storage full or unavailable — ignore silently
  }
}

export function useDesigns() {
  const [designs, setDesigns] = useState<SavedDesign[]>([]);

  useEffect(() => {
    setDesigns(readStore());
  }, []);

  const persist = useCallback((next: SavedDesign[]) => {
    setDesigns(next);
    writeStore(next);
  }, []);

  const saveDesign = useCallback(
    (design: Omit<SavedDesign, 'id' | 'createdAt'>): SavedDesign => {
      const newDesign: SavedDesign = {
        ...design,
        id:
          (typeof crypto !== 'undefined' && 'randomUUID' in crypto
            ? crypto.randomUUID()
            : `d-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
        createdAt: new Date().toISOString(),
      };
      const next = [newDesign, ...readStore()];
      persist(next);
      return newDesign;
    },
    [persist]
  );

  const updateDesign = useCallback(
    (id: string, patch: Partial<SavedDesign>) => {
      const next = readStore().map((d) =>
        d.id === id ? { ...d, ...patch } : d
      );
      persist(next);
    },
    [persist]
  );

  const deleteDesign = useCallback(
    (id: string) => {
      const next = readStore().filter((d) => d.id !== id);
      persist(next);
    },
    [persist]
  );

  const getDesign = useCallback((id: string): SavedDesign | undefined => {
    return readStore().find((d) => d.id === id);
  }, []);

  return { designs, saveDesign, updateDesign, deleteDesign, getDesign };
}
