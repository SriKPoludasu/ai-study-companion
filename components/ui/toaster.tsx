"use client";

import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
import { ToastStateProvider, useToast } from "@/components/ui/use-toast";

function ToastList() {
  const { toasts } = useToast();
  return (
    <ToastProvider>
      {toasts.map((toast) => (
        <Toast key={toast.id}>
          {toast.title ? <ToastTitle>{toast.title}</ToastTitle> : null}
          {toast.description ? <ToastDescription>{toast.description}</ToastDescription> : null}
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}

export function Toaster() {
  return (
    <ToastStateProvider>
      <ToastList />
    </ToastStateProvider>
  );
}
