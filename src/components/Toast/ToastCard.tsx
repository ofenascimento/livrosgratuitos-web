import { FiCheck, FiInfo, FiAlertTriangle, FiX, FiBellOff } from "react-icons/fi";
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
      icon: <FiCheck size={17} />,
      iconColor: "text-emerald-600",
      bg: "bg-gradient-to-br from-emerald-100 to-emerald-200",
      shadow: "shadow-emerald-500/25",
      iconShadow: "shadow-emerald-500/25",
    },
    info: {
      icon: <FiInfo size={17} />,
      iconColor: "text-blue-600",
      bg: "bg-gradient-to-br from-blue-100 to-blue-200",
      shadow: "shadow-blue-500/25",
      iconShadow: "shadow-blue-500/25",
    },
    neutralBlue: {
      icon: <FiBellOff size={17} />,
      iconColor: "text-indigo-600",
      bg: "bg-gradient-to-br from-indigo-100 to-indigo-200",
      shadow: "shadow-indigo-500/25",
      iconShadow: "shadow-indigo-500/25",
    },
    warning: {
      icon: <FiAlertTriangle size={17} />,
      iconColor: "text-amber-600",
      bg: "bg-gradient-to-br from-amber-100 to-amber-200",
      shadow: "shadow-amber-500/30",
      iconShadow: "shadow-amber-500/30",
    },
    error: {
      icon: <FiX size={17} />,
      iconColor: "text-red-600",
      bg: "bg-gradient-to-br from-red-100 to-red-200",
      shadow: "shadow-red-500/30",
      iconShadow: "shadow-red-500/30",
    },
  };

  const current = config[type as keyof typeof config] || config.info;

  return (
    <div
      className={`
        toast-enter
        pointer-events-auto flex items-center gap-3.5 rounded-[18px]
        border border-white/60 px-[18px] py-4
        min-w-[320px] max-w-[420px]
        shadow-lg ${current.shadow} ${current.bg}
      `}
    >
      <div
        className={`
          flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center
          rounded-[13px] bg-white shadow-md ${current.iconShadow} ${current.iconColor}
        `}
      >
        {current.icon}
      </div>

      <div className="flex-1">
        <p className="font-raleway m-0 text-[15px] font-bold text-black">
          {toast.title}
        </p>
        {toast.description && (
          <p className="font-dmSans font-medium m-0 mt-0.5 text-[13px] text-gray-800">
            {toast.description}
          </p>
        )}
      </div>

      <button
        onClick={onClose}
        className={`
          flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center
          rounded-lg border-none bg-white/50 ${current.iconColor}
          transition-all duration-150 hover:scale-[1.08] hover:bg-white
        `}
      >
        <FiX size={14} />
      </button>
    </div>
  );
}