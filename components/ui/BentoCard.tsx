import * as motion from "motion/react-client";

type BentoCardProps = {
  children: React.ReactNode;

  className?: string;

  interactive?: boolean;
};

export function BentoCard({
  children,
  className = "",
  interactive = true,
}: BentoCardProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={
        interactive
          ? {
              y: -3,
            }
          : undefined
      }
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className={[
        "relative overflow-hidden",
        "rounded-[var(--radius-card)]",
        "border border-border",
        "bg-surface",
        "shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_30px_rgba(16,24,40,0.04)]",
        interactive
          ? "transition-shadow hover:shadow-[0_10px_40px_rgba(16,24,40,0.09)]"
          : "",
        className,
      ].join(" ")}
    >
      {children}
    </motion.article>
  );
}
