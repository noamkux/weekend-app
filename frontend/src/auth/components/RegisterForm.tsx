import type { FormEvent } from "react";
import { FormField } from "./FormField";
import { useRegisterForm } from "../hooks/useAuthForm";
import { useAuth } from "../context/useAuth";
import { useLang } from "../../i18n/useLang";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const { register, isLoading } = useAuth();
  const { formData, errors, validate, handleChange } = useRegisterForm();
  const { t, dir } = useLang();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await register(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      noValidate
      dir={dir}
    >
      <FormField
        id="register-name"
        label={t.fullName}
        type="text"
        value={formData.fullName}
        placeholder={dir === "rtl" ? "ישראל ישראלי" : "John Doe"}
        error={errors.fullName}
        autoComplete="name"
        onChange={(v) => handleChange("fullName", v)}
      />
      <FormField
        id="register-email"
        label={t.email}
        type="email"
        value={formData.email}
        placeholder="you@example.com"
        error={errors.email}
        autoComplete="email"
        onChange={(v) => handleChange("email", v)}
      />
      <FormField
        id="register-phone"
        label={t.phone}
        type="text"
        value={formData.phone}
        placeholder="05X-XXXXXXX"
        error={errors.phone}
        autoComplete="tel"
        onChange={(v) => handleChange("phone", v)}
      />
      <FormField
        id="register-password"
        label={t.password}
        type="password"
        value={formData.password}
        placeholder="••••••••"
        error={errors.password}
        autoComplete="new-password"
        onChange={(v) => handleChange("password", v)}
      />
      <FormField
        id="register-confirm-password"
        label={t.confirmPassword}
        type="password"
        value={formData.confirmPassword}
        placeholder="••••••••"
        error={errors.confirmPassword}
        autoComplete="new-password"
        onChange={(v) => handleChange("confirmPassword", v)}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 shadow-sm shadow-violet-600/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40 mt-1"
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
          t.submitRegister
        )}
      </button>
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        {t.switchToLogin}{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-violet-600 dark:text-violet-400 font-medium hover:underline underline-offset-2"
        >
          {t.switchLoginLink}
        </button>
      </p>
    </form>
  );
}
