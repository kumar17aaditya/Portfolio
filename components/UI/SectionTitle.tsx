type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mb-12">
      {subtitle && (
        <p className="mb-3 text-blue-400 uppercase tracking-widest">
          {subtitle}
        </p>
      )}

      <h2 className="text-5xl font-bold">{title}</h2>
    </div>
  );
}