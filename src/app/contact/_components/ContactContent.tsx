"use client";

import { motion } from "motion/react";
import {
  Mail,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Briefcase,
  GraduationCap,
  Code2,
  Zap,
  Calendar,
} from "lucide-react";
import { contactInfo } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ContactContent() {
  return (
    <div className="space-y-16">
      {/* Enhanced Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8"
      >
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
            <MessageCircle className="w-4 h-4" />
            Let&apos;s Connect
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            Ready to Start Your Next Project?
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I&apos;m a passionate full-stack developer eager to bring your ideas
            to life. Whether you&apos;re looking for a fresh graduate with
            modern skills or someone to collaborate on an exciting project,
            I&apos;d love to hear from you!
          </p>
        </div>

        {/* Status Indicators */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
            <span className="hidden xs:inline">
              Available for opportunities
            </span>
            <span className="xs:hidden">Available</span>
          </Badge>
          <Badge
            variant="outline"
            className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm"
          >
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            <span className="hidden xs:inline">Quick responder</span>
            <span className="xs:hidden">Fast reply</span>
          </Badge>
          <Badge
            variant="outline"
            className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm"
          >
            <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            <span className="hidden sm:inline">Recent bootcamp graduate</span>
            <span className="sm:hidden">Bootcamp grad</span>
          </Badge>
        </div>
      </motion.div>

      {/* Enhanced Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {/* Email */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="h-full border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 hover:shadow-xl transition-all duration-300">
            <CardContent className="flex flex-col items-center text-center space-y-4 p-6">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                <Mail className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  Email Me
                </h3>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium"
                >
                  {contactInfo.email}
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Location */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="h-full border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 hover:shadow-xl transition-all duration-300">
            <CardContent className="flex flex-col items-center text-center space-y-4 p-6">
              <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/20">
                <MapPin className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-green-900 dark:text-green-100">
                  Location
                </h3>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                  {contactInfo.location}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Availability */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="h-full border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 hover:shadow-xl transition-all duration-300">
            <CardContent className="flex flex-col items-center text-center space-y-4 p-6">
              <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20">
                <Calendar className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-purple-900 dark:text-purple-100">
                  Availability
                </h3>
                <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                  {contactInfo.availability}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Response Time */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="h-full border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/30 hover:shadow-xl transition-all duration-300">
            <CardContent className="flex flex-col items-center text-center space-y-4 p-6">
              <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20">
                <Zap className="w-7 h-7 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-orange-900 dark:text-orange-100">
                  Response Time
                </h3>
                <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">
                  Within 24 hours
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* What I Can Help You With */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            What I Can Help You With
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            As a recent bootcamp graduate with modern skills, I&apos;m ready to
            contribute to your next project
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              service: "Full-stack web applications",
              icon: Code2,
              color: "blue",
            },
            {
              service: "Progressive Web Apps (PWA)",
              icon: Phone,
              color: "green",
            },
            {
              service: "Modern React applications",
              icon: Zap,
              color: "purple",
            },
            {
              service: "Database design & integration",
              icon: MapPin,
              color: "orange",
            },
            {
              service: "API development & integration",
              icon: MessageCircle,
              color: "teal",
            },
            { service: "Mobile-responsive design", icon: Phone, color: "pink" },
            { service: "Authentication systems", icon: Mail, color: "indigo" },
            { service: "Real-time features", icon: Clock, color: "red" },
            {
              service: "Modern UI/UX implementation",
              icon: Briefcase,
              color: "yellow",
            },
          ].map((item, index) => (
            <motion.div
              key={item.service}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="h-full p-6 border-0 bg-gradient-to-br from-background to-muted/20 hover:shadow-xl transition-all duration-300 group hover:from-primary/5 hover:to-primary/10">
                <CardContent className="p-0 space-y-4">
                  <div
                    className={`w-12 h-12 bg-${item.color}-500/10 rounded-xl flex items-center justify-center border border-${item.color}-500/20 group-hover:bg-${item.color}-500/20 transition-colors`}
                  >
                    <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.service}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Why Work With Me */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Why Work With Me?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Fresh expertise, modern development practices, and a results-driven
            approach to building scalable web solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="text-center space-y-4"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Fresh Expertise</h3>
              <p className="text-muted-foreground">
                Recent intensive training in current industry standards and
                modern development practices
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="text-center space-y-4"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Modern Tech Stack</h3>
              <p className="text-muted-foreground">
                Proficient in Next.js, TypeScript, React, and modern development
                tools
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="text-center space-y-4"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Eager to Learn</h3>
              <p className="text-muted-foreground">
                Passionate about continuous learning and staying up-to-date with
                industry trends
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
