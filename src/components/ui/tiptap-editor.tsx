"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { ListItem } from "@tiptap/extension-list-item";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { forwardRef, useImperativeHandle } from "react";

interface TiptapEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export interface TiptapEditorRef {
  getHTML: () => string;
  getText: () => string;
  setContent: (content: string) => void;
  focus: () => void;
  clear: () => void;
}

const TiptapEditor = forwardRef<TiptapEditorRef, TiptapEditorProps>(
  (
    { content = "", onChange, placeholder, className, disabled = false },
    ref
  ) => {
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          bulletList: false,
          orderedList: false,
          listItem: false,
        }),
        BulletList.configure({
          HTMLAttributes: {
            class: "tiptap-bullet-list",
          },
        }),
        OrderedList.configure({
          HTMLAttributes: {
            class: "tiptap-ordered-list",
          },
        }),
        ListItem,
        TextStyle,
        Color,
        Placeholder.configure({
          placeholder: placeholder || "Start typing...",
        }),
      ],
      content,
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML());
      },
      editable: !disabled,
      immediatelyRender: false,
    });

    useImperativeHandle(ref, () => ({
      getHTML: () => editor?.getHTML() || "",
      getText: () => editor?.getText() || "",
      setContent: (content: string) => editor?.commands.setContent(content),
      focus: () => editor?.commands.focus(),
      clear: () => editor?.commands.clearContent(),
    }));

    if (!editor) {
      return null;
    }

    const ToolbarButton = ({
      onClick,
      isActive,
      disabled,
      children,
      title,
    }: {
      onClick: () => void;
      isActive?: boolean;
      disabled?: boolean;
      children: React.ReactNode;
      title?: string;
    }) => (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={cn(
          "h-8 w-8 p-0 rounded-md transition-all duration-200 hover:scale-105",
          isActive
            ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
            : "hover:bg-primary/10 hover:text-primary"
        )}
      >
        {children}
      </Button>
    );

    return (
      <div
        className={cn(
          "border border-border/50 rounded-xl bg-gradient-to-br from-background to-muted/20 shadow-sm hover:shadow-md transition-shadow duration-200",
          "focus-within:border-primary/50 focus-within:shadow-lg focus-within:shadow-primary/10",
          className
        )}
      >
        {/* Modern Toolbar */}
        <div className="border-b border-border/30 p-3 flex flex-wrap items-center gap-1 bg-gradient-to-r from-muted/30 to-muted/50 rounded-t-xl backdrop-blur-sm">
          {/* Text Formatting Group */}
          <div className="flex items-center gap-0.5 p-1 bg-background/50 rounded-lg border border-border/30">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive("bold")}
              disabled={disabled}
              title="Bold (Ctrl+B)"
            >
              <Bold className="h-4 w-4" />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive("italic")}
              disabled={disabled}
              title="Italic (Ctrl+I)"
            >
              <Italic className="h-4 w-4" />
            </ToolbarButton>
          </div>

          {/* Lists Group */}
          <div className="flex items-center gap-0.5 p-1 bg-background/50 rounded-lg border border-border/30">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive("bulletList")}
              disabled={disabled}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive("orderedList")}
              disabled={disabled}
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive("blockquote")}
              disabled={disabled}
              title="Quote"
            >
              <Quote className="h-4 w-4" />
            </ToolbarButton>
          </div>

          {/* History Group */}
          <div className="flex items-center gap-0.5 p-1 bg-background/50 rounded-lg border border-border/30">
            <ToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo() || disabled}
              title="Undo (Ctrl+Z)"
            >
              <Undo className="h-4 w-4" />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo() || disabled}
              title="Redo (Ctrl+Y)"
            >
              <Redo className="h-4 w-4" />
            </ToolbarButton>
          </div>
        </div>

        {/* Modern Editor Content */}
        <EditorContent
          editor={editor}
          className={cn(
            "prose prose-sm max-w-none p-6 min-h-[120px] focus-within:outline-none",
            // Modern typography
            "prose-headings:text-foreground prose-p:text-foreground prose-p:leading-relaxed",
            "prose-strong:text-foreground prose-strong:font-semibold",
            "prose-em:text-foreground prose-em:italic",
            // Modern blockquotes
            "prose-blockquote:text-muted-foreground prose-blockquote:border-l-primary/50 prose-blockquote:border-l-4",
            "prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic",
            // Modern lists
            "prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground",
            "prose-ul:space-y-1 prose-ol:space-y-1",
            // Modern links (if any)
            "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
            // Placeholder styling
            "[&_.ProseMirror]:focus:outline-none",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      </div>
    );
  }
);

TiptapEditor.displayName = "TiptapEditor";

export { TiptapEditor };
