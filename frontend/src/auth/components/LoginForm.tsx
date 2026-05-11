import type { FormEvent } from "react";
import { FormField } from "./FormField";
import { useLoginForm } from "../hooks/useAuthForm";
import { useAuth } from "../context/useAuth";
import { useLang } from "../../i18n/useLang";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const { login, isLoading } = useAuth();
  const { formData, errors, validate, handleChange } = useLoginForm();
  const { t, dir } = useLang();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await login(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
      noValidate
      dir={dir}
    >
      <FormField
        id="login-email"
        label={t.email}
        type="email"
        value={formData.email}
        placeholder="you@example.com"
        error={errors.email}
        autoComplete="email"
        onChange={(v) => handleChange("email", v)}
      />
      <FormField
        id="login-password"
        label={t.password}
        type="password"
        value={formData.password}
        placeholder="••••••••"
        error={errors.password}
        autoComplete="current-password"
        onChange={(v) => handleChange("password", v)}
      />
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) => handleChange("rememberMe", e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 accent-violet-500"
          />
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {t.rememberMe}
          </span>
        </label>
        <button
          type="button"
          className="text-sm text-violet-600 dark:text-violet-400 hover:underline underline-offset-2 transition-colors"
        >
          {t.forgotPassword}
        </button>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="relative w-full py-3 rounded-xl font-semibold text-sm text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 shadow-sm shadow-violet-600/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
            </svg>
            {t.loading}
          </span>
        ) : (
          t.submitLogin
        )}
      </button>
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        {t.switchToRegister}{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-violet-600 dark:text-violet-400 font-medium hover:underline underline-offset-2"
        >
          {t.switchRegisterLink}
        </button>
      </p>
    </form>
  );
}
