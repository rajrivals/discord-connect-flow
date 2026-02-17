import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Discord", "Profile", "Steam", "Done"] as const;

interface StepperProps {
  currentStep: number;
}

const Stepper = ({ currentStep }: StepperProps) => {
  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
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
                      "hidden sm:block h-px w-8 md:w-12 transition-colors duration-200",
                      isCompleted ? "bg-[hsl(var(--success))]" : "bg-border"
                    )}
                  />
                )}
                <div className="flex items-center gap-1.5">
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium transition-all duration-200",
                      isCompleted && "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]",
                      isActive && "border-2 border-primary text-primary",
                      isUpcoming && "border border-border text-muted-foreground"
                    )}
                  >
                    {isCompleted ? <Check className="h-3.5 w-3.5" /> : stepNum}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium transition-colors duration-200 hidden sm:inline",
                      isActive && "text-foreground",
                      isCompleted && "text-[hsl(var(--success))]",
                      isUpcoming && "text-muted-foreground"
                    )}
                  >
                    {label}
                  </span>
                  {/* Mobile: show label only for active step */}
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
