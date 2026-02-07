interface TestFormHeaderProps {
  header: {
    title: string;
    description: string;
  };
}

export default function TestFormHeader({ header }: TestFormHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-4xl mb-2 font-semibold">{header.title}</h1>
      <p className="text-gray-600">{header.description}</p>
    </header>
  );
}
