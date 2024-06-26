import React from "react";

interface MagicButtonProps {
  otherClasses?: string;
  title: string;
}

const MagicButton = ({ otherClasses, title }: MagicButtonProps) => {
  return (
    <button
      className={`relative inline-flex h-12 overflow-hidden rounded-full focus:outline-none ${otherClasses}`}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-primary px-8 py-1 text-sm text-stone-100 backdrop-blur-3xl">
        {title}
      </span>
    </button>
  );
};

export default MagicButton;
