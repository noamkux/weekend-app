import { createContext, useState } from "react";
import { translations } from "./translations";
import type { Lang } from "./translations";

export type T = typeof translations.he;

export interface LangContextType {
  lang: Lang;
  t: T;
  toggleLang: () => void;
  dir: "rtl" | "ltr";
}
// eslint-disable-next-line react-refresh/only-export-components
export const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("he");
  const toggleLang = () => setLang((l) => (l === "he" ? "en" : "he"));

  return (
    <LangContext.Provider
      value={{
        lang,
        t: translations[lang as Lang] as T,
        toggleLang,
        dir: lang === "he" ? "rtl" : "ltr",
      }}
    >
      {children}
    </LangContext.Provider>
  );
}
