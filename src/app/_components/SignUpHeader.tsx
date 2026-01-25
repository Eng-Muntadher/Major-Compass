interface SignUpHeaderProps {
  title: string;
  text: string;
}

export default function SignUpHeader({ title, text }: SignUpHeaderProps) {
  return (
    <header className="text-center mb-8">
      <div
        className="w-20 h-20 bg-linear-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
        aria-hidden="true"
      >
        <span className="text-4xl">🎓</span>
      </div>
      <h1 className="text-3xl font-semibold mb-2">{title}</h1>
      <p className="text-gray-600">{text}</p>
    </header>
  );
}
