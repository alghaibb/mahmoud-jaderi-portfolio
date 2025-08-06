"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, X, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BeforeInstallPromptEvent,
  isPWA,
  isInstallable,
  installPWA,
} from "@/lib/pwa";
import { Label } from "./label";

interface PWAInstallProps {
  className?: string;
  showAsButton?: boolean;
  autoShow?: boolean;
}

const PWA_DISMISS_KEY = "pwa-install-dismissed";

export function PWAInstall({
  className,
  showAsButton = false,
  autoShow = true,
}: PWAInstallProps) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [dontRemindAgain, setDontRemindAgain] = useState(false);

  useEffect(() => {
    // Check if already running as PWA
    if (isPWA()) {
      return;
    }

    // Check if user has dismissed the prompt permanently
    const isDismissed = localStorage.getItem(PWA_DISMISS_KEY) === "true";
    if (isDismissed) {
      return;
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      setDeferredPrompt(e);

      if (autoShow && !showAsButton) {
        setShowInstallPrompt(true);
      }
    };

    const handleAppInstalled = () => {
      console.log("PWA was installed");
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
      // Clear the dismiss flag since app is now installed
      localStorage.removeItem(PWA_DISMISS_KEY);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [autoShow, showAsButton]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    setIsInstalling(true);

    try {
      const installed = await installPWA(deferredPrompt);

      if (installed) {
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      }
    } catch (error) {
      console.error("Installation failed:", error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    if (dontRemindAgain) {
      localStorage.setItem(PWA_DISMISS_KEY, "true");
    }
    setShowInstallPrompt(false);
  };

  // Don't show anything if not installable
  if (!isInstallable(deferredPrompt)) {
    return null;
  }

  // Button variant
  if (showAsButton) {
    return (
      <Button
        onClick={handleInstall}
        disabled={isInstalling}
        className={cn("gap-2", className)}
        variant="outline"
      >
        <Download className="h-4 w-4" />
        {isInstalling ? "Installing..." : "Install App"}
      </Button>
    );
  }

  // Banner variant
  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div
      data-pwa-install
      className={cn(
        "fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm",
        "rounded-lg border bg-background/95 backdrop-blur-sm p-4 shadow-xl",
        "animate-in slide-in-from-bottom-4 duration-200",
        "transform-gpu will-change-transform",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <Smartphone className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold">Install App</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Install this app on your device for a better experience
          </p>

          <div className="flex items-center space-x-2 mt-3 mb-3">
            <Checkbox
              id="dont-remind"
              checked={dontRemindAgain}
              onCheckedChange={(checked) =>
                setDontRemindAgain(checked === true)
              }
            />
            <Label
              htmlFor="dont-remind"
              className="text-xs text-muted-foreground cursor-pointer"
            >
              Don&apos;t remind me again
            </Label>
          </div>

          <div className="flex gap-2 flex-col sm:flex-row">
            <Button
              onClick={handleInstall}
              disabled={isInstalling}
              className="flex-1"
            >
              <Download className="h-3 w-3 mr-1" />
              {isInstalling ? "Installing..." : "Install"}
            </Button>
            <Button
              variant="outline"
              onClick={handleDismiss}
            >
              Later
            </Button>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={handleDismiss}
          className="flex-shrink-0 h-6 w-6 p-0"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  );
}
