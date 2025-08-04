"use client";

import { useState } from "react";
import { motion } from "motion/react";
import TypingSequence from "./typing-sequence";

interface DeveloperInfoProps {
  className?: string;
}

export default function DeveloperInfo({ className = "" }: DeveloperInfoProps) {
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const developer = {
    name: "Mahmoud Jaderi",
    role: "Full Stack Developer",
    passion: "Building amazing apps",
  };

  const typingLines = [
    `const developer = {`,
    `  name: "${developer.name}",`,
    `  role: "${developer.role}",`,
    `  passion: "${developer.passion}"`,
    `};`,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`font-mono text-sm ${className}`}
    >
      <div className="bg-muted/50 rounded-lg p-4 border border-border">
        <TypingSequence
          lines={typingLines}
          speed={80}
          delayBetweenLines={500}
          onComplete={() => setIsTypingComplete(true)}
          className="space-y-1"
        />

        {isTypingComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-xs text-muted-foreground"
          >
            // Ready to build something amazing together?
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
