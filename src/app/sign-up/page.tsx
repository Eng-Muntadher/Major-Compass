import SignUpHeader from "../_components/SignUpHeader";
import SignUpForm from "../_components/SignUpForm";

export default function SignUp() {
  return (
    <div className="min-h-screen flex justify-center p-4">
      <div className="w-full max-w-md">
        <SignUpHeader
          title="Create Your Account"
          text="Start exploring your future career possibilities"
        />
        <SignUpForm />
      </div>
    </div>
  );
}
