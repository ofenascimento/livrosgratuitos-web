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
      icon: <FiCheck size={15} />,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.12)",
    },
    info: {
      icon: <FiInfo size={15} />,
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.12)",
    },
    warning: {
      icon: <FiAlertTriangle size={15} />,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.12)",
    },
    error: {
      icon: <FiX size={15} />,
      color: "#f87171",
      bg: "rgba(248,113,113,0.12)",
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
        background: "#111113",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "12px 14px",
        color: "#fff",
        animation: "toast-enter 0.22s ease-out",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        minWidth: 280,
        maxWidth: 360,
      }}
    >
      {/* Ícone */}
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          background: current.bg,
          border: `1px solid ${current.color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: current.color,
          flexShrink: 0,
        }}
      >
        {current.icon}
      </div>

      {/* Texto */}
      <div style={{ flex: 1 }}>
        <p
          className="font-redRat"
          style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#fff" }}
        >
          {toast.title}
        </p>
        {toast.description && (
          <p
            className="font-dmSans font-medium"
            style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.8)" }}
          >
            {toast.description}
          </p>
        )}
      </div>

      {/* Botão fechar */}
      <button
        onClick={onClose}
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.04)",
          color: "rgba(255,255,255,0.4)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget.style.background = "rgba(255,255,255,0.08)");
          (e.currentTarget.style.color = "#fff");
        }}
        onMouseLeave={(e) => {
          (e.currentTarget.style.background = "rgba(255,255,255,0.04)");
          (e.currentTarget.style.color = "rgba(255,255,255,0.4)");
        }}
      >
        <FiX size={13} />
      </button>
    </div>
  );
}