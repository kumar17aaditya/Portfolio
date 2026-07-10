type BadgeProps = {
  text: string;
};

export default function Badge({ text }: BadgeProps) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.65rem] font-medium tracking-wide text-slate-300">
      {text}
    </span>
  );
}