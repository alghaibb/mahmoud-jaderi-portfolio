"use client";

import { motion } from "motion/react";
import { Mail, MapPin, Clock, Phone } from "lucide-react";
import { contactInfo } from "@/lib/constants";

export default function ContactContent() {
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold tracking-tight">
          Let&apos;s Work Together
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          I&apos;m always excited to hear about new projects and opportunities.
          Whether you have a specific project in mind or just want to chat about
          possibilities, I&apos;d love to hear from you.
        </p>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Email */}
        <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg border border-border bg-card">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Email</h3>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {contactInfo.email}
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg border border-border bg-card">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Location</h3>
            <p className="text-muted-foreground">{contactInfo.location}</p>
          </div>
        </div>

        {/* Availability */}
        <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg border border-border bg-card">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Availability</h3>
            <p className="text-muted-foreground">{contactInfo.availability}</p>
          </div>
        </div>

        {/* Response Time */}
        <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg border border-border bg-card">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Phone className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Response Time</h3>
            <p className="text-muted-foreground">Within 24 hours</p>
          </div>
        </div>
      </motion.div>

      {/* What I Can Help With */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center">
          What I Can Help You With
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Full-stack web applications",
            "Progressive Web Apps (PWA)",
            "AI-powered features",
            "Database design & optimization",
            "API development",
            "Performance optimization",
            "Mobile-responsive design",
            "Authentication systems",
            "Real-time features",
          ].map((service, index) => (
            <div
              key={service}
              className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <p className="text-sm text-muted-foreground">{service}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
