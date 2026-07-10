import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  icon?: ReactNode;
  target?: string;
  className?: string;
};

export default function Button({
  children,
  href,
  variant = "primary",
  icon,
  target,
  className = "",
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 sm:px-6 sm:text-base";

  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-[0_16px_45px_rgba(59,130,246,0.32)] hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(59,130,246,0.38)]"
      : "border border-white/15 bg-white/5 text-slate-100 hover:-translate-y-0.5 hover:border-sky-400/60 hover:bg-sky-400/10";

  const content = (
    <>
      <span>{children}</span>
      {icon ? <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span> : null}
    </>
  );

  if (href) {
    return (
      <a href={href} target={target} className={`${base} ${styles} ${className}`}>
        {content}
      </a>
    );
  }

  return <button className={`${base} ${styles} ${className}`}>{content}</button>;
}