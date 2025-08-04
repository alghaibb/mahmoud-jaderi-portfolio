import { Metadata } from "next";
import ContactContent from "./_components/ContactContent";
import ContactForm from "./_components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with me for project inquiries, collaborations, or just to say hello. I'm always excited to hear about new opportunities.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Server-rendered content */}
          <ContactContent />

          {/* Contact Form Section */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">
                Send Me a Message
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Fill out the form below and I&apos;ll get back to you as soon as
                possible. I typically respond within 24 hours.
              </p>
            </div>

            {/* Client-rendered form */}
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
