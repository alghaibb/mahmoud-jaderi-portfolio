import { Metadata } from "next";
import OfflinePage from "./OfflinePage";

export const metadata: Metadata = {
  title: "Offline",
  description:
    "You are currently offline. Please check your internet connection.",
};

export default function Page() {
  return <OfflinePage />;
}
