import React from "react";

interface MagicButtonProps {
  otherClasses?: string;
  title: string;
}

const MagicButton = ({ otherClasses, title }: MagicButtonProps) => {
  return (
    <button
      className={`relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none ${otherClasses}`}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFD700_0%,#FF8C00_50%,#FFD700_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-primary px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        {title}
      </span>
    </button>
  );
};

export default MagicButton;
