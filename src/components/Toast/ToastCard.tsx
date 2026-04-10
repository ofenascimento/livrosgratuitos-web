import { FiCheck, FiInfo, FiAlertTriangle, FiX } from "react-icons/fi";
import { ToastItem } from "./ToastItem";

export function ToastCard({
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
            bg: "#16A34A",
        },
        info: {
            icon: <FiInfo />,
            bg: "#2563EB",
        },
        warning: {
            icon: <FiAlertTriangle />,
            bg: "#D97706",
        },
        error: {
            icon: <FiX />,
            bg: "#DC2626",
        },
    };

    const current = config[type];

    return (
        <div
            style={{
                pointerEvents: "auto",
                display: "flex",
                alignItems: "center",
                gap: 12,
                borderRadius: 14,
                background: current.bg,
                padding: "12px 14px",
                color: "#fff",
                animation: "toast-enter 0.22s ease-out",
                boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            }}
        >
            <div
                style={{
                    fontSize: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {current.icon}
            </div>

            <div style={{ flex: 1 }}>
                <p
                className="font-redRat"
                    style={{
                        margin: 0,
                        fontSize: 15,
                        fontWeight: 700,
                    }}
                >
                    {toast.title}
                </p>

                {toast.description && (
                    <p
                    className=" font-lexend font-medium"
                        style={{
                            fontSize: 13,
                            opacity: 0.9,
                        }}
                    >
                        {toast.description}
                    </p>
                )}
            </div>

            <button
                onClick={onClose}
                style={{
                    border: "none",
                    background: "transparent",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: 16,
                    opacity: 0.9,
                }}
            >
                <FiX />
            </button>
        </div>
    );
}