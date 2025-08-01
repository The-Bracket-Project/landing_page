interface ContinueButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export default function ContinueButton({
  onClick,
  disabled = false,
  loading = false,
  children,
  fullWidth = false,
  className = ""
}: ContinueButtonProps) {
  const baseClasses = "px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed";
  const widthClasses = fullWidth ? "w-full max-w-sm" : "";
  const loadingClasses = loading ? "flex items-center justify-center gap-2" : "";
  
  const combinedClasses = `${baseClasses} ${widthClasses} ${loadingClasses} ${className}`.trim();

  return (
    <div className="flex justify-center pt-4 pb-2">
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={combinedClasses}
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            {children}
          </>
        ) : (
          children
        )}
      </button>
    </div>
  );
}