import React, { FC, useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

interface CustomMessageProps {
  type: "success" | "error" | "info" | "custom";
  message: string;
  customText?: string;
  onClose?: () => void;
}

const CustomMessage: FC<CustomMessageProps> = ({
  type,
  message,
  customText,
  onClose,
}) => {
  const getStyles = () => {
    switch (type) {
      case "success":
        return "text-green-700 bg-green-300/70 dark:bg-green-200 dark:text-green-800";
      case "error":
        return "text-red-700 bg-red-300/70 dark:bg-red-200 dark:text-red-800";
      case "info":
        return "text-blue-700 bg-blue-300/70 dark:bg-blue-200 dark:text-blue-800";
      case "custom":
        return "text-yellow-700 bg-yellow-300/70 dark:bg-yellow-200 dark:text-yellow-800";
      default:
        return "";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="mr-2 h-5 w-5" />;
      case "error":
        return <XCircleIcon className="mr-2 h-5 w-5" />;
      case "info":
        return <InformationCircleIcon className="mr-2 h-5 w-5" />;
      case "custom":
        return <span className="font-bold">{customText}</span>;
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative mb-4 flex items-center p-4 text-sm ${getStyles()}`}
      role="alert"
    >
      {getIcon()}
      <div>
        <span className="font-medium">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="absolute right-1 top-1 text-muted-foreground duration-200 hover:text-primary"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CustomMessage;
