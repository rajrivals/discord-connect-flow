import { cn } from "@/lib/utils";

interface StepCardProps {
  children: React.ReactNode;
  className?: string;
}

const StepCard = ({ children, className }: StepCardProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-[640px] rounded-xl border border-border bg-card p-5 sm:p-6 shadow-lg shadow-black/20 transition-all duration-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export const StepLabel = ({ step, total = 4 }: { step: number; total?: number }) => (
  <p className="text-xs font-medium text-muted-foreground mb-1">
    Step {step} of {total}
  </p>
);

export const StepTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl sm:text-2xl font-semibold text-card-foreground mb-2">{children}</h2>
);

export const StepBody = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm sm:text-[15px] text-secondary-foreground leading-relaxed mb-5">{children}</p>
);

export const StepMicrocopy = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs text-[hsl(var(--microcopy))] mt-3 text-center">{children}</p>
);

export default StepCard;
