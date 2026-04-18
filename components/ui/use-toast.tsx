"use client";

import * as React from "react";

type Toast = {
  id: string;
  title?: string;
  description?: string;
};

const ToastContext = React.createContext<{
  toasts: Toast[];
  toast: (toast: Omit<Toast, "id">) => void;
}>({ toasts: [], toast: () => null });

export function ToastStateProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const toast = React.useCallback((input: Omit<Toast, "id">) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, ...input }]);
    setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 3500);
  }, []);

  return <ToastContext.Provider value={{ toasts, toast }}>{children}</ToastContext.Provider>;
}

export function useToast() {
  return React.useContext(ToastContext);
}
