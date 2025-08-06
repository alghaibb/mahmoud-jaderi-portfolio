import { Metadata } from "next";
import { WifiOff, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Offline",
  description:
    "You are currently offline. Please check your internet connection.",
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <WifiOff className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-3xl font-bold mb-4">You're Offline</h1>
          <p className="text-muted-foreground text-lg mb-6">
            It looks like you've lost your internet connection. Don't worry,
            some content may still be available.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => window.location.reload()}
            className="w-full gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Button>

          <Button asChild variant="outline" className="w-full gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Go to Homepage
            </Link>
          </Button>
        </div>

        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h2 className="font-semibold mb-2">While you're offline:</h2>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Previously viewed pages may still work</li>
            <li>• Your data is safe and will sync when you're back online</li>
            <li>• Check your internet connection and try again</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
