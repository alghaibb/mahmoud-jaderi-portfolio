/**
 * PWA utility functions for installation and service worker management
 */

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
  interface Navigator {
    standalone?: boolean;
  }
}

/**
 * Check if the app is running as a PWA
 */
export const isPWA = (): boolean => {
  if (typeof window === 'undefined') return false;

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true ||
    document.referrer.includes('android-app://')
  );
};

/**
 * Check if the browser supports PWA installation
 */
export const canInstallPWA = (): boolean => {
  if (typeof window === 'undefined') return false;

  return 'serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window;
};

/**
 * Check if the app is installable
 */
export const isInstallable = (deferredPrompt: BeforeInstallPromptEvent | null): boolean => {
  return deferredPrompt !== null && !isPWA();
};

/**
 * Install the PWA
 */
export const installPWA = async (deferredPrompt: BeforeInstallPromptEvent | null): Promise<boolean> => {
  if (!deferredPrompt) return false;

  try {
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    return outcome === 'accepted';
  } catch (error) {
    console.error('PWA installation failed:', error);
    return false;
  }
};

/**
 * Register service worker
 */
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('Service Worker registered successfully:', registration);
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
};

/**
 * Unregister service worker
 */
export const unregisterServiceWorker = async (): Promise<boolean> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      const result = await registration.unregister();
      console.log('Service Worker unregistered:', result);
      return result;
    }
    return false;
  } catch (error) {
    console.error('Service Worker unregistration failed:', error);
    return false;
  }
};

/**
 * Check if service worker is supported
 */
export const isServiceWorkerSupported = (): boolean => {
  return typeof window !== 'undefined' && 'serviceWorker' in navigator;
};

/**
 * Get service worker registration
 */
export const getServiceWorkerRegistration = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!isServiceWorkerSupported()) return null;

  try {
    return (await navigator.serviceWorker.getRegistration()) || null;
  } catch (error) {
    console.error('Failed to get service worker registration:', error);
    return null;
  }
};

/**
 * Update service worker
 */
export const updateServiceWorker = async (): Promise<boolean> => {
  const registration = await getServiceWorkerRegistration();

  if (!registration) return false;

  try {
    await registration.update();
    console.log('Service Worker updated successfully');
    return true;
  } catch (error) {
    console.error('Service Worker update failed:', error);
    return false;
  }
};

/**
 * Check for service worker updates
 */
export const checkForUpdates = async (): Promise<boolean> => {
  const registration = await getServiceWorkerRegistration();

  if (!registration) return false;

  return new Promise((resolve) => {
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            resolve(true);
          }
        });
      }
    });

    // Check for updates immediately
    registration.update().catch(() => resolve(false));
  });
};
