// Translation system for actions (toasts, messages, errors) for both Arabic and English

export const translations = {
  en: {
    passwordMismatch: "Please make sure passwords match in both fields!",
    errorOccurred: "An error occurred. Please try again.",
    emailExists:
      "An account with this email already exists. Please log in instead.",
    confirmationSent: "A confirmation link is sent to your email",
    emailOrUsernameTaken: "This email or username is already taken.",
    profileSetupFailed:
      "Account created but profile setup failed. Please contact support.",
    fillAllFields: "Please fill in all fields.",
    invalidEmail: "Please enter a valid email address.",
    passwordTooShort: "Password must be at least 6 characters long.",
    invalidCredentials: "Invalid email or password. Please try again.",
    emailNotConfirmed: "Please confirm your email address before signing in.",
    signInFailed: "Sign in failed. Please try again.",
    notAuthenticated: "Not authenticated",
    updateSuccess: "Profile updated successfully",
    listAvatarsFailed: "Failed to list existing avatars",
    deleteAvatarFailed: "Failed to delete old avatar",
    uploadAvatarFailed: "Failed to upload avatar",
    aiError: "Sorry, I encountered an error. Please try again.",
  },
  ar: {
    passwordMismatch: "يرجى التأكد من تطابق كلمات المرور في كلا الحقلين!",
    errorOccurred: "حدث خطأ. يرجى المحاولة مرة أخرى.",
    emailExists:
      "يوجد حساب بهذا البريد الإلكتروني بالفعل. يرجى تسجيل الدخول بدلاً من ذلك.",
    confirmationSent: "تم إرسال رابط التأكيد إلى بريدك الإلكتروني",
    emailOrUsernameTaken: "البريد الإلكتروني أو اسم المستخدم مستخدم بالفعل.",
    profileSetupFailed:
      "تم إنشاء الحساب ولكن فشل إعداد الملف الشخصي. يرجى الاتصال بالدعم.",
    fillAllFields: "يرجى ملء جميع الحقول.",
    invalidEmail: "يرجى إدخال عنوان بريد إلكتروني صالح.",
    passwordTooShort: "يجب أن تكون كلمة المرور 6 أحرف على الأقل.",
    invalidCredentials:
      "البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.",
    emailNotConfirmed: "يرجى تأكيد عنوان بريدك الإلكتروني قبل تسجيل الدخول.",
    signInFailed: "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.",
    notAuthenticated: "غير مصادق عليه",
    updateSuccess: "تم تحديث الملف الشخصي بنجاح",
    listAvatarsFailed: "فشل في عرض الصور الرمزية الموجودة",
    deleteAvatarFailed: "فشل في حذف الصورة الرمزية القديمة",
    uploadAvatarFailed: "فشل في تحميل الصورة الرمزية",
    aiError: "عذراً، واجهت خطأ. يرجى المحاولة مرة أخرى.",
  },
} as const;

export type Lang = keyof typeof translations;

export function t(lang: Lang, key: keyof typeof translations.en): string {
  return translations[lang][key];
}
