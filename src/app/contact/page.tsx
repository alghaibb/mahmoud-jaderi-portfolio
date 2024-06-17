import { Metadata } from "next";
import ContactFormPage from "./ContactFormPage";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function Page() {
  return <ContactFormPage />;
}
