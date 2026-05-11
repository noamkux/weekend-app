import { useState, useCallback } from "react";
import type { LoginFormData, RegisterFormData } from "../types/auth.types";

type FormErrors<T> = Partial<Record<keyof T, string>>;

// ─── Login Hook ─────────────────────────────────────────────────────────────

export function useLoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors<LoginFormData>>({});

  const validate = useCallback((): boolean => {
    const errs: FormErrors<LoginFormData> = {};
    if (!formData.email) errs.email = "נדרש אימייל";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "אימייל לא תקין";
    if (!formData.password) errs.password = "נדרשת סיסמה";
    else if (formData.password.length < 6)
      errs.password = "סיסמה חייבת להכיל לפחות 6 תווים";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [formData]);

  const handleChange = useCallback(
    (field: keyof LoginFormData, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [],
  );

  return { formData, errors, validate, handleChange };
}

// ─── Register Hook ───────────────────────────────────────────────────────────

export function useRegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors<RegisterFormData>>({});

  const validate = useCallback((): boolean => {
    const errs: FormErrors<RegisterFormData> = {};
    if (!formData.fullName.trim()) errs.fullName = "נדרש שם מלא";
    if (!formData.email) errs.email = "נדרש אימייל";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "אימייל לא תקין";
    if (!formData.phone) errs.phone = "נדרש מספר טלפון";
    else if (!/^0[5][0-9]{8}$/.test(formData.phone.replace(/\D/g, "")))
      errs.phone = "מספר טלפון לא תקין";
    if (!formData.password) errs.password = "נדרשת סיסמה";
    else if (formData.password.length < 6)
      errs.password = "סיסמה חייבת להכיל לפחות 6 תווים";
    if (!formData.confirmPassword) errs.confirmPassword = "אנא אמת/י את הסיסמה";
    else if (formData.password !== formData.confirmPassword)
      errs.confirmPassword = "הסיסמאות אינן תואמות";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [formData]);

  const handleChange = useCallback(
    (field: keyof RegisterFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [],
  );

  return { formData, errors, validate, handleChange };
}
