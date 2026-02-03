import React, { createContext, useContext, useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAContextValue {
  showInstallPrompt: boolean;
  installApp: () => Promise<void>;
  hidePrompt: () => void;
}

const PWAContext = createContext<PWAContextValue | undefined>(undefined);

declare global {
  interface Window {
    deferredPrompt: BeforeInstallPromptEvent | null;
  }
}

export const PWAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Handler for the event
    const handleBeforeInstallPrompt = (e: Event) => {
      const promptEvent = e as BeforeInstallPromptEvent;
      promptEvent.preventDefault();
      setDeferredPrompt(promptEvent);
      
      if (!window.matchMedia('(display-mode: standalone)').matches) {
        setShowInstallPrompt(true);
      }
    };

    // Check for globally captured event
    if (window.deferredPrompt) {
      handleBeforeInstallPrompt(window.deferredPrompt);
      // Don't clear it immediately to be safe with React Strict Mode
      // window.deferredPrompt = null; 
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    
    await deferredPrompt.prompt();
    
    await deferredPrompt.userChoice;
    
    // Always hide the prompt after choice, as the event cannot be reused
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
  };

  const hidePrompt = () => {
    setShowInstallPrompt(false);
  };

  return (
    <PWAContext.Provider value={{ showInstallPrompt, installApp, hidePrompt }}>
      {children}
    </PWAContext.Provider>
  );
};

export const usePWA = (): PWAContextValue => {
  const ctx = useContext(PWAContext);
  if (!ctx) throw new Error('usePWA must be used within PWAProvider');
  return ctx;
};
