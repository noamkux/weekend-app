import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import type { AuthMode } from "../types/auth.types";
import { useLang } from "../../i18n/useLang";

function PlaneIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-violet-500"
    >
      <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0011 2v0a1.5 1.5 0 00-1.5 1.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
}

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const { t, toggleLang, lang, dir } = useLang();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/40 to-slate-100 dark:from-slate-950 dark:via-violet-950/20 dark:to-slate-900 flex items-center justify-center p-4"
      dir={dir}
    >
      <button
        onClick={toggleLang}
        className="fixed top-4 left-4 z-50 px-3 py-1.5 rounded-lg bg-white/70 backdrop-blur border border-slate-200 text-sm font-medium text-slate-600 hover:bg-white transition-all shadow-sm"
      >
        {lang === "he" ? "EN" : "עב"}
      </button>

      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-violet-300/20 dark:bg-violet-700/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-indigo-300/20 dark:bg-indigo-700/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-violet-900/10 dark:shadow-violet-900/30 border border-white/60 dark:border-slate-700/50 p-8">
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center shadow-inner shadow-violet-200 dark:shadow-violet-900">
              <PlaneIcon />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                WeekendCrew
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {mode === "login" ? t.appSubLogin : t.appSubRegister}
              </p>
            </div>
          </div>

          <div className="relative flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-7">
            <div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-white dark:bg-slate-700 shadow-sm shadow-slate-200 dark:shadow-slate-900 transition-all duration-300 ease-in-out"
              style={{
                [dir === "rtl" ? "right" : "left"]:
                  mode === "login" ? "4px" : "calc(50%)",
              }}
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`relative flex-1 py-2 text-sm font-medium rounded-lg transition-colors duration-200 z-10 ${
                mode === "login"
                  ? "text-slate-900 dark:text-slate-50"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              {t.tabLogin}
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`relative flex-1 py-2 text-sm font-medium rounded-lg transition-colors duration-200 z-10 ${
                mode === "register"
                  ? "text-slate-900 dark:text-slate-50"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              {t.tabRegister}
            </button>
          </div>

          <div key={mode} className="animate-fade-in">
            {mode === "login" ? (
              <LoginForm onSwitchToRegister={() => setMode("register")} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setMode("login")} />
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-6">
          © 2025 WeekendCrew
        </p>
      </div>
    </div>
  );
}
