interface AuthSeparatorProps {
  text?: string;
  className?: string;
}

export function AuthSeparator({
  text = "Or continue with",
  className = "",
}: AuthSeparatorProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex-1 h-px bg-border" />
      <span className="px-4 text-xs uppercase text-muted-foreground">
        {text}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
