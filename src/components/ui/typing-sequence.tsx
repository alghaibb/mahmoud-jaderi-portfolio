"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface TypingSequenceProps {
  lines: string[];
  speed?: number;
  delayBetweenLines?: number;
  className?: string;
  onComplete?: () => void;
}

export default function TypingSequence({
  lines,
  speed = 50,
  delayBetweenLines = 300,
  className = "",
  onComplete,
}: TypingSequenceProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      if (onComplete) onComplete();
      return;
    }

    const currentLine = lines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayText(currentLine.slice(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      // Move to next line after delay
      const nextLineTimer = setTimeout(() => {
        setCurrentLineIndex(currentLineIndex + 1);
        setCurrentCharIndex(0);
        setDisplayText("");
      }, delayBetweenLines);

      return () => clearTimeout(nextLineTimer);
    }
  }, [
    currentLineIndex,
    currentCharIndex,
    lines,
    speed,
    delayBetweenLines,
    onComplete,
  ]);

  // Function to render syntax highlighted text
  const renderHighlightedText = (text: string) => {
    const parts = [];
    let currentIndex = 0;

    // Keywords
    const keywordMatch = text.match(/\b(const|let|var)\b/);
    if (keywordMatch) {
      const before = text.slice(0, keywordMatch.index);
      if (before) parts.push(<span key="before">{before}</span>);
      parts.push(
        <span key="keyword" className="text-purple-500">
          {keywordMatch[0]}
        </span>
      );
      currentIndex = (keywordMatch.index || 0) + keywordMatch[0].length;
    }

    // Variable names
    const varMatch = text
      .slice(currentIndex)
      .match(/\b(developer|name|role|passion)\b/);
    if (varMatch) {
      const before = text.slice(
        currentIndex,
        currentIndex + (varMatch.index || 0)
      );
      if (before) parts.push(<span key="before-var">{before}</span>);
      parts.push(
        <span key="variable" className="text-green-500">
          {varMatch[0]}
        </span>
      );
      currentIndex += (varMatch.index || 0) + varMatch[0].length;
    }

    // Operators
    const operatorMatch = text.slice(currentIndex).match(/(\{|\}|,|;|=|:)/);
    if (operatorMatch) {
      const before = text.slice(
        currentIndex,
        currentIndex + (operatorMatch.index || 0)
      );
      if (before) parts.push(<span key="before-op">{before}</span>);
      parts.push(
        <span key="operator" className="text-blue-500">
          {operatorMatch[0]}
        </span>
      );
      currentIndex += (operatorMatch.index || 0) + operatorMatch[0].length;
    }

    // Strings
    const stringMatch = text.slice(currentIndex).match(/"([^"]*)"/);
    if (stringMatch) {
      const before = text.slice(
        currentIndex,
        currentIndex + (stringMatch.index || 0)
      );
      if (before) parts.push(<span key="before-str">{before}</span>);
      parts.push(
        <span key="string" className="text-orange-500">
          "{stringMatch[1]}"
        </span>
      );
      currentIndex += (stringMatch.index || 0) + stringMatch[0].length;
    }

    // Add remaining text
    const remaining = text.slice(currentIndex);
    if (remaining) parts.push(<span key="remaining">{remaining}</span>);

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className={className}>
      {/* Completed lines */}
      {lines.slice(0, currentLineIndex).map((line, index) => (
        <div key={index} className="text-blue-500">
          {renderHighlightedText(line)}
        </div>
      ))}

      {/* Currently typing line */}
      {isTyping && (
        <div className="text-blue-500">
          {renderHighlightedText(displayText)}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-0.5 h-5 bg-primary ml-1"
          />
        </div>
      )}
    </div>
  );
}
