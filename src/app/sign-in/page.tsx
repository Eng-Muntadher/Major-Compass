import SignInForm from "../_components/SignInForm";
import SignUpHeader from "../_components/SignUpHeader";

export default function SignIn() {
  return (
    <div className="min-h-screen flex justify-center p-4">
      <div className="w-full max-w-md">
        <SignUpHeader
          title="Welcome Back"
          text="Continue your journey to finding the perfect major"
        />

        <SignInForm />
      </div>
    </div>
  );
}
