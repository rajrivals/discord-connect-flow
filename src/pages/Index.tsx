import { useState } from "react";
import { Trophy, Shield, Users, Gift, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

const stepVariants = {
  initial: { opacity: 0, y: 24, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  exit: { opacity: 0, y: -16, scale: 0.98, transition: { duration: 0.25, ease: "easeIn" as const } },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

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
        <AnimatePresence mode="wait">
          {/* Step 1 — Discord */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex flex-col items-center"
            >
              {/* Hero */}
              <motion.div
                className="text-center max-w-[640px] mb-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h1 className="text-[22px] sm:text-[30px] font-bold text-foreground leading-tight mb-3">
                  Unlock the Official Dota2Group Discord
                </h1>
                <p className="text-sm sm:text-[15px] text-secondary-foreground mb-2">
                  Link Discord, create your tournament profile, and verify Steam. Takes ~60 seconds.
                </p>
                <p className="text-xs text-[hsl(var(--microcopy))]">
                  No payments required. We will never ask you to send money to a person or moderator.
                </p>
              </motion.div>

              <StepCard>
                <StepLabel step={1} />
                <StepTitle>Link your Discord</StepTitle>
                <StepBody>Required to unlock the main server and tournament channels.</StepBody>
                <Button onClick={goNext} className="w-full h-12 rounded-xl text-sm font-bold tracking-wide btn-glow">
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
              <motion.div
                className="mt-8 max-w-[640px] w-full"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 text-center">
                  What you unlock
                </p>
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {UNLOCKS.map(({ icon: Icon, label }) => (
                    <motion.div
                      key={label}
                      variants={staggerItem}
                      className="flex items-center gap-2 rounded-lg glass px-3 py-2.5 hover-scale cursor-default"
                    >
                      <Icon className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-xs text-secondary-foreground">{label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Step 2 — Profile */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex flex-col items-center"
            >
              <StepCard>
                <StepLabel step={2} />
                <StepTitle>Create your tournament profile</StepTitle>
                <StepBody>This profile powers brackets, leaderboards, and match results.</StepBody>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  {[
                    { id: "username", label: "Username", type: "text" },
                    { id: "email", label: "Email", type: "email" },
                    { id: "password", label: "Password", type: "password" },
                  ].map((field, i) => (
                    <motion.div
                      key={field.id}
                      className="space-y-1.5"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + i * 0.07 }}
                    >
                      <Label htmlFor={field.id} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {field.label}
                      </Label>
                      <Input
                        id={field.id}
                        type={field.type}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={(e) => setFormData((d) => ({ ...d, [field.id]: e.target.value }))}
                        className="h-11 rounded-xl bg-muted/50 border-[hsl(var(--glass-border)/0.3)] backdrop-blur-sm focus:border-primary transition-all duration-200 focus:shadow-[0_0_12px_-4px_hsl(var(--primary)/0.3)]"
                      />
                      {formErrors[field.id] && (
                        <motion.p
                          className="text-xs text-destructive"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {formErrors[field.id]}
                        </motion.p>
                      )}
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.35 }}
                  >
                    <Button type="submit" className="w-full h-12 rounded-xl text-sm font-bold tracking-wide btn-glow">
                      Create profile &amp; continue →
                    </Button>
                  </motion.div>
                </form>
                <StepMicrocopy>Powered by Rivals Gaming. Your Discord and Steam stay linked to this profile.</StepMicrocopy>

                <Collapsible open={whyOpen} onOpenChange={setWhyOpen} className="mt-4">
                  <CollapsibleTrigger className="flex items-center gap-1 mx-auto text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors duration-200">
                    Why do I need this?
                    <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${whyOpen ? "rotate-180" : ""}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3 text-xs text-[hsl(var(--microcopy))] text-center leading-relaxed px-2">
                    We run tournaments using Rivals tooling. This account lets us manage brackets, verify players, and keep results consistent across events.
                  </CollapsibleContent>
                </Collapsible>
              </StepCard>
            </motion.div>
          )}

          {/* Step 3 — Steam */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex flex-col items-center"
            >
              <StepCard>
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
            </motion.div>
          )}

          {/* Step 4 — Done */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex flex-col items-center"
            >
              <StepCard>
                <StepLabel step={4} />
                <StepTitle>You're verified ✅</StepTitle>
                <StepBody>Return to Discord to access tournaments and unlocked channels.</StepBody>
                <Button asChild className="w-full h-12 rounded-xl text-sm font-bold tracking-wide btn-glow">
                  <a href="#">Return to Discord →</a>
                </Button>
                <StepMicrocopy>You can manage linked accounts anytime in your Rivals settings.</StepMicrocopy>
              </StepCard>
            </motion.div>
          )}
        </AnimatePresence>
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
