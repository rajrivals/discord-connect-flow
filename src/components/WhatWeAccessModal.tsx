import { Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

interface WhatWeAccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "discord" | "steam";
}

const AccessItem = ({ allowed, children }: { allowed: boolean; children: React.ReactNode }) => (
  <div className="flex items-start gap-2 py-1">
    {allowed ? (
      <Check className="h-4 w-4 mt-0.5 shrink-0 text-[hsl(var(--success))]" />
    ) : (
      <X className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
    )}
    <span className="text-sm text-card-foreground">{children}</span>
  </div>
);

const TabContent = ({ tab }: { tab: "discord" | "steam" }) => {
  if (tab === "discord") {
    return (
      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">We can access</p>
          <AccessItem allowed>Discord User ID</AccessItem>
          <AccessItem allowed>Server membership status</AccessItem>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">We cannot access</p>
          <AccessItem allowed={false}>Your DMs or private messages</AccessItem>
          <AccessItem allowed={false}>Your password</AccessItem>
          <AccessItem allowed={false}>Your email</AccessItem>
          <AccessItem allowed={false}>Private account data</AccessItem>
        </div>
        <p className="text-xs text-[hsl(var(--microcopy))] pt-2 border-t border-border">
          <span className="font-medium text-muted-foreground">Why Discord?</span> We run tournaments and verification inside our Discord server. Linking confirms your identity and unlocks tournament channels.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">We can access</p>
        <AccessItem allowed>Steam ID (public)</AccessItem>
        <AccessItem allowed>Public Dota 2 rank and match data</AccessItem>
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">We cannot access</p>
        <AccessItem allowed={false}>Purchases or payment details</AccessItem>
        <AccessItem allowed={false}>Inventory or items</AccessItem>
        <AccessItem allowed={false}>Friends list or messages</AccessItem>
        <AccessItem allowed={false}>Steam Wallet balance</AccessItem>
      </div>
      <p className="text-xs text-[hsl(var(--microcopy))] pt-2 border-t border-border">
        <span className="font-medium text-muted-foreground">Why Steam?</span> Steam verifies your Dota account, assigns correct roles, and helps prevent duplicate or fake accounts in competitions.
      </p>
    </div>
  );
};

const ModalBody = ({ defaultTab }: { defaultTab: string }) => (
  <Tabs defaultValue={defaultTab} className="w-full">
    <TabsList className="w-full bg-muted">
      <TabsTrigger value="discord" className="flex-1">Discord</TabsTrigger>
      <TabsTrigger value="steam" className="flex-1">Steam</TabsTrigger>
    </TabsList>
    <TabsContent value="discord" className="mt-4">
      <TabContent tab="discord" />
    </TabsContent>
    <TabsContent value="steam" className="mt-4">
      <TabContent tab="steam" />
    </TabsContent>
  </Tabs>
);

const WhatWeAccessModal = ({ open, onOpenChange, defaultTab = "discord" }: WhatWeAccessModalProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>What we access</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6">
            <ModalBody defaultTab={defaultTab} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>What we access</DialogTitle>
        </DialogHeader>
        <ModalBody defaultTab={defaultTab} />
      </DialogContent>
    </Dialog>
  );
};

export default WhatWeAccessModal;
