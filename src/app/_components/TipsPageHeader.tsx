interface TipsPageHeaderProps {
  header: {
    title: string;
    subtitle: string;
  };
}

function TipsPageHeader({ header }: TipsPageHeaderProps) {
  return (
    <section
      aria-labelledby="tips-heading"
      className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white"
    >
      <h1 id="tips-heading" className="text-3xl mb-3 font-semibold">
        {header.title}
      </h1>

      <p className="text-lg opacity-90">{header.subtitle}</p>
    </section>
  );
}

export default TipsPageHeader;
