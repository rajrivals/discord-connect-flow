import { useState } from "react";
import { Trophy, Shield, Users, Gift, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Stepper from "@/components/Stepper";
import StepCard, { StepLabel, StepTitle, StepBody, StepMicrocopy } from "@/components/StepCard";
import WhatWeAccessModal from "@/components/WhatWeAccessModal";

const UNLOCKS = [
  { icon: Trophy, label: "Weekly prize tournaments" },
  { icon: Shield, label: "Auto-assigned rank roles" },
  { icon: Users, label: "Team finder, scrims & coaching" },
  { icon: Gift, label: "Giveaways & event alerts" },
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"discord" | "steam">("discord");
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [whyOpen, setWhyOpen] = useState(false);

  const openAccessModal = (tab: "discord" | "steam") => {
    setModalTab(tab);
    setModalOpen(true);
  };

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, 4));

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.username.trim()) errors.username = "Username is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Enter a valid email";
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 8) errors.password = "Must be at least 8 characters";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) goNext();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background ambient-bg">
      {/* Header */}
      <header className="border-b border-[hsl(var(--glass-border)/0.2)] glass relative z-50">
        <div className="mx-auto max-w-[960px] px-4 h-14 flex items-center justify-between">
          <span className="text-lg font-bold text-foreground tracking-tight">Dota2Group</span>
          <nav className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors duration-200">Support</a>
            <a href="#" className="hover:text-foreground transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors duration-200">Terms</a>
          </nav>
          <a href="#" className="sm:hidden text-xs text-muted-foreground hover:text-foreground">Support</a>
        </div>
      </header>

      {/* Stepper */}
      <Stepper currentStep={currentStep} />

      {/* Main */}
      <main className="flex-1 flex flex-col items-center px-4 py-8 sm:py-12 relative z-10">
        {/* Hero (Step 1 only) */}
        {currentStep === 1 && (
          <div className="text-center max-w-[640px] mb-8 animate-fade-in">
            <h1 className="text-[22px] sm:text-[30px] font-bold text-foreground leading-tight mb-3">
              Unlock the Official Dota2Group Discord
            </h1>
            <p className="text-sm sm:text-[15px] text-secondary-foreground mb-2">
              Link Discord, create your tournament profile, and verify Steam. Takes ~60 seconds.
            </p>
            <p className="text-xs text-[hsl(var(--microcopy))]">
              No payments required. We will never ask you to send money to a person or moderator.
            </p>
          </div>
        )}

        {/* Step 1 — Discord */}
        {currentStep === 1 && (
          <>
            <StepCard key="step-1">
              <StepLabel step={1} />
              <StepTitle>Link your Discord</StepTitle>
              <StepBody>Required to unlock the main server and tournament channels.</StepBody>
              <Button
                onClick={goNext}
                className="w-full h-12 rounded-xl text-sm font-bold tracking-wide btn-glow"
              >
                Link Discord &amp; continue →
              </Button>
              <StepMicrocopy>Takes 30–60 seconds. You can disconnect anytime.</StepMicrocopy>
              <button
                onClick={() => openAccessModal("discord")}
                className="block mx-auto mt-3 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors duration-200"
              >
                What we access
              </button>
            </StepCard>

            {/* Unlock row */}
            <div className="mt-8 max-w-[640px] w-full animate-slide-up" style={{ animationDelay: "200ms" }}>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 text-center">
                What you unlock
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 stagger-children">
                {UNLOCKS.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-lg glass px-3 py-2.5 hover-scale cursor-default"
                  >
                    <Icon className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-xs text-secondary-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Step 2 — Profile */}
        {currentStep === 2 && (
          <StepCard key="step-2">
            <StepLabel step={2} />
            <StepTitle>Create your tournament profile</StepTitle>
            <StepBody>This profile powers brackets, leaderboards, and match results.</StepBody>
            <form onSubmit={handleProfileSubmit} className="space-y-4 stagger-children">
              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Username
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData((d) => ({ ...d, username: e.target.value }))}
                  className="h-11 rounded-xl bg-muted/50 border-[hsl(var(--glass-border)/0.3)] backdrop-blur-sm focus:border-primary transition-all duration-200 focus:shadow-[0_0_12px_-4px_hsl(var(--primary)/0.3)]"
                />
                {formErrors.username && <p className="text-xs text-destructive animate-fade-in">{formErrors.username}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                  className="h-11 rounded-xl bg-muted/50 border-[hsl(var(--glass-border)/0.3)] backdrop-blur-sm focus:border-primary transition-all duration-200 focus:shadow-[0_0_12px_-4px_hsl(var(--primary)/0.3)]"
                />
                {formErrors.email && <p className="text-xs text-destructive animate-fade-in">{formErrors.email}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData((d) => ({ ...d, password: e.target.value }))}
                  className="h-11 rounded-xl bg-muted/50 border-[hsl(var(--glass-border)/0.3)] backdrop-blur-sm focus:border-primary transition-all duration-200 focus:shadow-[0_0_12px_-4px_hsl(var(--primary)/0.3)]"
                />
                {formErrors.password && <p className="text-xs text-destructive animate-fade-in">{formErrors.password}</p>}
              </div>
              <Button type="submit" className="w-full h-12 rounded-xl text-sm font-bold tracking-wide btn-glow">
                Create profile &amp; continue →
              </Button>
            </form>
            <StepMicrocopy>Powered by Rivals Gaming. Your Discord and Steam stay linked to this profile.</StepMicrocopy>

            <Collapsible open={whyOpen} onOpenChange={setWhyOpen} className="mt-4">
              <CollapsibleTrigger className="flex items-center gap-1 mx-auto text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors duration-200">
                Why do I need this?
                <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${whyOpen ? "rotate-180" : ""}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3 text-xs text-[hsl(var(--microcopy))] text-center leading-relaxed px-2 animate-fade-in">
                We run tournaments using Rivals tooling. This account lets us manage brackets, verify players, and keep results consistent across events.
              </CollapsibleContent>
            </Collapsible>
          </StepCard>
        )}

        {/* Step 3 — Steam */}
        {currentStep === 3 && (
          <StepCard key="step-3">
            <StepLabel step={3} />
            <StepTitle>Verify your Dota account</StepTitle>
            <StepBody>Required for rank-based tournaments and fair seeding.</StepBody>
            <Button onClick={goNext} className="w-full h-12 rounded-xl text-sm font-bold tracking-wide btn-glow">
              Link Steam &amp; verify →
            </Button>
            <StepMicrocopy>We only store your SteamID and public Dota data.</StepMicrocopy>
            <button
              onClick={() => openAccessModal("steam")}
              className="block mx-auto mt-3 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors duration-200"
            >
              What we access
            </button>
          </StepCard>
        )}

        {/* Step 4 — Done */}
        {currentStep === 4 && (
          <StepCard key="step-4">
            <StepLabel step={4} />
            <StepTitle>You're verified ✅</StepTitle>
            <StepBody>Return to Discord to access tournaments and unlocked channels.</StepBody>
            <Button asChild className="w-full h-12 rounded-xl text-sm font-bold tracking-wide btn-glow">
              <a href="#">Return to Discord →</a>
            </Button>
            <StepMicrocopy>You can manage linked accounts anytime in your Rivals settings.</StepMicrocopy>
          </StepCard>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--glass-border)/0.2)] py-6 relative z-10">
        <div className="mx-auto max-w-[960px] px-4 text-center">
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mb-2">
            <a href="#" className="hover:text-foreground transition-colors duration-200">Privacy Policy</a>
            <span className="text-border">·</span>
            <a href="#" className="hover:text-foreground transition-colors duration-200">Terms</a>
            <span className="text-border">·</span>
            <a href="#" className="hover:text-foreground transition-colors duration-200">Support</a>
          </div>
          <p className="text-xs text-[hsl(var(--microcopy))]">
            No payments required to join the server. Never send money to a person or moderator.
          </p>
        </div>
      </footer>

      <WhatWeAccessModal open={modalOpen} onOpenChange={setModalOpen} defaultTab={modalTab} />
    </div>
  );
};

export default Index;
