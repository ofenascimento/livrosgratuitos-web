"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import { FiAlertTriangle, FiCheck, FiInfo, FiX } from "react-icons/fi";
import { ToastCard } from "./ToastCard";
import { ToastItem } from "./ToastItem";




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



export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast must be used within ToastProvider");
    }

    return context;
}