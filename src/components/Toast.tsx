import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ToastContextValue {
  show: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const show = useCallback((msg: string) => {
    setMessage(msg);
    window.clearTimeout((show as unknown as { _t?: number })._t);
    (show as unknown as { _t?: number })._t = window.setTimeout(
      () => setMessage(null),
      2400
    );
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {message && (
        <div className="fv-toast-wrap" role="status" aria-live="polite">
          <div className="fv-toast">{message}</div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
