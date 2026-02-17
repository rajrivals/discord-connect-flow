import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Discord", "Profile", "Steam", "Done"] as const;

interface StepperProps {
  currentStep: number;
}

const Stepper = ({ currentStep }: StepperProps) => {
  return (
    <div className="sticky top-0 z-40 glass border-b border-[hsl(var(--glass-border)/0.2)]">
      <div className="mx-auto max-w-[640px] px-4 py-3">
        <div className="flex items-center justify-between">
          {STEPS.map((label, i) => {
            const stepNum = i + 1;
            const isCompleted = stepNum < currentStep;
            const isActive = stepNum === currentStep;
            const isUpcoming = stepNum > currentStep;

            return (
              <div key={label} className="flex items-center gap-2">
                {i > 0 && (
                  <div
                    className={cn(
                      "hidden sm:block h-px w-8 md:w-12 transition-all duration-500",
                      isCompleted ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
                <div className="flex items-center gap-1.5">
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium transition-all duration-300",
                      isCompleted && "bg-primary text-primary-foreground shadow-[0_0_10px_-2px_hsl(var(--primary)/0.5)]",
                      isActive && "border-2 border-primary text-primary shadow-[0_0_12px_-3px_hsl(var(--primary)/0.4)]",
                      isUpcoming && "border border-border text-muted-foreground"
                    )}
                  >
                    {isCompleted ? <Check className="h-3.5 w-3.5" /> : stepNum}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium transition-colors duration-300 hidden sm:inline",
                      isActive && "text-foreground",
                      isCompleted && "text-primary",
                      isUpcoming && "text-muted-foreground"
                    )}
                  >
                    {label}
                  </span>
                  {isActive && (
                    <span className="text-xs font-medium text-foreground sm:hidden">
                      {label}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
