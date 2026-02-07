const signUp = {
  header: {
    title: "Create Your Account",
    text: "Start exploring your future career possibilities",
  },
  form: {
    ariaLabel: "Sign up form",
    fullName: {
      label: "Full Name",
      placeholder: "Ahmed Ali",
    },
    email: {
      label: "Email",
      placeholder: "student@example.com",
    },
    grade: {
      label: "Grade",
    },
    password: {
      label: "Password",
      placeholder: "••••••••",
    },
    confirmPassword: {
      label: "Confirm Password",
      placeholder: "••••••••",
    },
    submitButton: "Sign Up",
    divider: "or",
    googleButton: "Sign up with Google",
    switchToSignIn: {
      text: "Already have an account?",
      link: "Sign In",
    },
  },
};

export type SignUpTranslationTypes = typeof signUp;

export default signUp;
