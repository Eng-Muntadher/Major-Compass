import { SignUpTranslationTypes } from "../en/signUp";

const signUp: SignUpTranslationTypes = {
  header: {
    title: "إنشاء حسابك",
    text: "ابدأ في استكشاف إمكانيات مستقبلك المهني",
  },
  form: {
    ariaLabel: "نموذج التسجيل",
    fullName: {
      label: "الاسم الكامل",
      placeholder: "أحمد علي",
    },
    email: {
      label: "البريد الإلكتروني",
      placeholder: "student@example.com",
    },

    grade: {
      label: "الصف الدراسي",
    },

    password: {
      label: "كلمة المرور",
      placeholder: "••••••••",
    },
    confirmPassword: {
      label: "تأكيد كلمة المرور",
      placeholder: "••••••••",
    },
    submitButton: "إنشاء حساب",
    divider: "أو",
    googleButton: "التسجيل باستخدام Google",
    switchToSignIn: {
      text: "لديك حساب بالفعل؟",
      link: "تسجيل الدخول",
    },
  },
};

export default signUp;
