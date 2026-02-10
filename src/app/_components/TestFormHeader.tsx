interface TestFormHeaderProps {
  header: {
    title: string;
    description: string;
  };
}

export default function TestFormHeader({ header }: TestFormHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl mb-2 font-semibold">
        {header.title}
      </h1>
      <p className="text-sm sm:text-base text-gray-600">{header.description}</p>
    </header>
  );
}
