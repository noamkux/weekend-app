import { useState } from "react";
import { useLang } from "../../i18n/useLang";

interface FormFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  value: string;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
  onChange: (val: string) => void;
}

export function FormField({
  id,
  label,
  type = "text",
  value,
  placeholder,
  error,
  autoComplete,
  onChange,
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { lang } = useLang();
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-slate-800/50
            text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500
            text-sm transition-all duration-150 outline-none
            ${error ? "border-red-400 dark:border-red-500 focus:ring-2 focus:ring-red-400/30" : "border-slate-200 dark:border-slate-700 focus:border-violet-400 dark:focus:border-violet-500 focus:ring-2 focus:ring-violet-400/20"}
            ${isPassword ? "pr-4 pl-10" : ""}
          `}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label={
              lang === "he"
                ? showPassword
                  ? "הסתר סיסמה"
                  : "הצג סיסמה"
                : showPassword
                  ? "Hide password"
                  : "Show password"
            }
          >
            {showPassword ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <p
          className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1"
          role="alert"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
