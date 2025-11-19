import * as React from "react"
import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  success?: boolean;
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  success = true,
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);

    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, duration - 300);

    const removeTimer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [message, duration, onClose]);

  const successIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        minWidth: "24px",
        animation: "checkmark 0.6s ease-in-out",
      }}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );

  const errorIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        minWidth: "24px",
        animation: "shake 0.5s ease-in-out",
      }}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  );

  const colors = success
    ? {
        bg: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        shadow: "rgba(16,185,129,0.4)",
        border: "rgba(255,255,255,0.3)",
      }
    : {
        bg: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
        shadow: "rgba(239,68,68,0.4)",
        border: "rgba(255,255,255,0.3)",
      };

  if (!visible && !exiting) return null;

  return (
    <>
      <style>
        {`
          @keyframes slideInRight {
            from {
              transform: translateX(400px) scale(0.9);
              opacity: 0;
            }
            to {
              transform: translateX(0) scale(1);
              opacity: 1;
            }
          }
          
          @keyframes slideOutRight {
            from {
              transform: translateX(0) scale(1);
              opacity: 1;
            }
            to {
              transform: translateX(400px) scale(0.9);
              opacity: 0;
            }
          }
          
          @keyframes checkmark {
            0% {
              transform: scale(0) rotate(-45deg);
              opacity: 0;
            }
            50% {
              transform: scale(1.1) rotate(5deg);
            }
            100% {
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
          }
          
          @keyframes shake {
            0%, 100% {
              transform: translateX(0) rotate(0deg);
            }
            25% {
              transform: translateX(-5px) rotate(-5deg);
            }
            75% {
              transform: translateX(5px) rotate(5deg);
            }
          }
          
          @keyframes progressBar {
            from {
              transform: scaleX(1);
            }
            to {
              transform: scaleX(0);
            }
          }
        `}
      </style>
      <div
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          minWidth: "320px",
          maxWidth: "420px",
          padding: "10px 20px",
          borderRadius: "16px",
          background: colors.bg,
          color: "#fff",
          boxShadow: `0 12px 35px ${colors.shadow}, 0 0 0 1px ${colors.border} inset`,
          fontWeight: 600,
          fontFamily: "sans-serif" ,
          fontSize: "15px",
          backdropFilter: "blur(10px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "14px",
          animation: exiting
            ? "slideOutRight 0.3s ease-in-out forwards"
            : "slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          transformOrigin: "right center",
          overflow: "hidden",
        }}
      >
        {/* Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            flexShrink: 0,
          }}
        >
          {success ? successIcon : errorIcon}
        </div>

        {/* Message */}
        <div
          style={{
            flex: 1,
            lineHeight: "1.5",
          }}
        >
          {message}
        </div>

        {/* Progress Bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "rgba(255,255,255,0.3)",
            transformOrigin: "left",
            animation: `progressBar ${duration}ms linear forwards`,
          }}
        />
      </div>
    </>
  );
};

export default Toast