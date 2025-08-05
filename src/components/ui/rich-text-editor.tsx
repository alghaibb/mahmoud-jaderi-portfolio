"use client";

import React from "react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Type your message...",
  className,
  disabled = false,
}: RichTextEditorProps) {
  const handleChange = (val?: string) => {
    onChange(val || "");
  };

  return (
    <div className={cn("rich-text-editor", className)} data-color-mode="light">
      <MDEditor
        value={value}
        onChange={handleChange}
        preview="edit"
        hideToolbar={false}
        visibleDragbar={false}
        textareaProps={{
          placeholder,
          disabled,
          style: {
            fontSize: "14px",
            lineHeight: "1.5",
            minHeight: "120px",
          },
        }}
        height={200}
      />

      <style jsx global>{`
        .rich-text-editor .w-md-editor {
          background: hsl(var(--background));
        }

        .rich-text-editor .w-md-editor-text-container,
        .rich-text-editor .w-md-editor-text-input,
        .rich-text-editor .w-md-editor-text-textarea {
          background: hsl(var(--background)) !important;
          color: hsl(var(--foreground)) !important;
          border: 1px solid hsl(var(--border)) !important;
          border-radius: 0.5rem;
        }

        .rich-text-editor .w-md-editor-toolbar {
          background: hsl(var(--background));
          border: 1px solid hsl(var(--border));
          border-bottom: none;
          border-radius: 0.5rem 0.5rem 0 0;
          padding: 8px;
        }

        .rich-text-editor .w-md-editor-toolbar ul li button {
          color: hsl(var(--foreground));
          background: transparent;
          border: none;
          padding: 4px 8px;
          border-radius: 0.25rem;
          margin: 0 2px;
        }

        .rich-text-editor .w-md-editor-toolbar ul li button:hover {
          background: hsl(var(--accent));
        }

        .rich-text-editor .w-md-editor-text-container {
          border-top: none !important;
          border-radius: 0 0 0.5rem 0.5rem !important;
        }

        /* Mobile responsive */
        @media (max-width: 640px) {
          .rich-text-editor .w-md-editor-toolbar {
            padding: 6px;
          }

          .rich-text-editor .w-md-editor-toolbar ul li button {
            padding: 6px;
            margin: 0 1px;
            min-width: 32px;
            min-height: 32px;
          }

          .rich-text-editor .w-md-editor-text-textarea {
            font-size: 16px !important; /* Prevent zoom on iOS */
            min-height: 100px !important;
          }
        }

        /* Touch-friendly spacing */
        @media (pointer: coarse) {
          .rich-text-editor .w-md-editor-toolbar ul li button {
            min-width: 36px;
            min-height: 36px;
          }
        }

        /* Dark mode support */
        .dark .rich-text-editor {
          --color-canvas-default: hsl(var(--background));
          --color-fg-default: hsl(var(--foreground));
          --color-border-default: hsl(var(--border));
        }

        .dark .rich-text-editor .w-md-editor {
          background: hsl(var(--background));
          color: hsl(var(--foreground));
        }

        .dark .rich-text-editor .w-md-editor-toolbar {
          background: hsl(var(--background));
          border-color: hsl(var(--border));
        }

        .dark .rich-text-editor .w-md-editor-text-container,
        .dark .rich-text-editor .w-md-editor-text-input,
        .dark .rich-text-editor .w-md-editor-text-textarea {
          background: hsl(var(--background)) !important;
          color: hsl(var(--foreground)) !important;
          border-color: hsl(var(--border)) !important;
        }
      `}</style>
    </div>
  );
}
