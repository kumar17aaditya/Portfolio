type GlassCardProps = {
  children: React.ReactNode;
};

export default function GlassCard({
  children,
}: GlassCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
      {children}
    </div>
  );
}