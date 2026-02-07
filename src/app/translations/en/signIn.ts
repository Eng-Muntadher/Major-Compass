const signIn = {
  header: {
    title: "Welcome Back",
    text: "Continue your journey to finding the perfect major",
  },

  form: {
    ariaLabel: "Sign in form",
    email: {
      label: "Email",
    },
    password: {
      label: "Password",
      placeholder: "••••••••",
    },
    submitButton: "Sign In",
    divider: "or",
    googleButton: "Continue with Google",
    switchToSignUp: {
      text: "Don't have an account?",
      link: "Sign Up",
    },
  },
};

export type SignInTranslationTypes = typeof signIn;

export default signIn;
