"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { FiAlertTriangle, FiCheck, FiInfo, FiX } from "react-icons/fi";

type ToastType = "success" | "error" | "info" | "warning";

type ToastItem = {
  id: number;
  title: string;
  description?: string;
  type?: ToastType;
};

type ToastContextType = {
  showToast: (toast: Omit<ToastItem, "id">) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (toast: Omit<ToastItem, "id">) => {
      const id = Date.now() + Math.random();

      setToasts((current) => {
        const next = [...current, { ...toast, id }];
        return next.slice(-3);
      });

      setTimeout(() => {
        removeToast(id);
      }, 4500);
    },
    [removeToast]
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="toast-container">
        <style>
          {`
            .toast-container {
              position: fixed;
              left: 20px;
              bottom: 20px;
              z-index: 999999;
              display: flex;
              flex-direction: column;
              gap: 10px;
              width: 340px;
              max-width: calc(100vw - 24px);
              pointer-events: none;
            }

            @media (max-width: 768px) {
              .toast-container {
                left: 50%;
                bottom: 16px;
                transform: translateX(-50%);
                width: calc(100vw - 24px);
              }
            }

            @keyframes toast-enter {
              from {
                opacity: 0;
                transform: translateY(12px) scale(0.98);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
          `}
        </style>

        {toasts.map((toast) => (
          <ToastCard
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({
  toast,
  onClose,
}: {
  toast: ToastItem;
  onClose: () => void;
}) {
  const type = toast.type || "info";

  const config = {
    success: {
      icon: <FiCheck />,
      color: "#22c55e",
      border: "rgba(34,197,94,0.20)",
      iconBg: "rgba(34,197,94,0.14)",
    },
    info: {
      icon: <FiInfo />,
      color: "#3b82f6",
      border: "rgba(59,130,246,0.20)",
      iconBg: "rgba(59,130,246,0.14)",
    },
    warning: {
      icon: <FiAlertTriangle />,
      color: "#eab308",
      border: "rgba(234,179,8,0.20)",
      iconBg: "rgba(234,179,8,0.14)",
    },
    error: {
      icon: <FiX />,
      color: "#ef4444",
      border: "rgba(239,68,68,0.20)",
      iconBg: "rgba(239,68,68,0.14)",
    },
  };

  const current = config[type];

  return (
    <div
      style={{
        pointerEvents: "auto",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        borderRadius: 16,
        border: `1px solid ${current.border}`,
        background:
          "linear-gradient(180deg, rgba(19,22,26,0.98) 0%, rgba(12,14,18,0.98) 100%)",
        padding: "12px 14px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        animation: "toast-enter 0.22s ease-out",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          minWidth: 36,
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: current.iconBg,
          color: current.color,
          fontSize: 18,
          marginTop: 1,
        }}
      >
        {current.icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p
        className=" font-redHat"
          style={{
            margin: 0,
            color: "#F9FAFB",
            fontSize: 15,
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
          }}
        >
          {toast.title}
        </p>

        {toast.description ? (
          <p
          className=" font-dmSans"
            style={{
              margin: "4px 0 0 0",
              color: "#D1D5DB",
              fontSize: 13,
              lineHeight: 1.45,
              fontWeight: 500,
            }}
          >
            {toast.description}
          </p>
        ) : null}
      </div>

      <button
        onClick={onClose}
        aria-label="Fechar notificação"
        style={{
          border: "none",
          background: "transparent",
          color: "#9CA3AF",
          cursor: "pointer",
          padding: 0,
          marginTop: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          lineHeight: 1,
        }}
      >
        <FiX />
      </button>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}