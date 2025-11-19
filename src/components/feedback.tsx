import * as React from "react";
import { useState } from "react";
import { FeedbackAPI } from "../api/feedback";
import Toast from "./toast";

const Feedback: React.FC<{ siteId: string }> = ({ siteId }) => {
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
 const [toasts, setToasts] = useState<
   { id: number; message: string; success: boolean }[]
 >([]);

 const showToast = (message: string, success: boolean = true) => {
   const id = Date.now();
   setToasts((prev) => [...prev, { id, message, success }]);

   setTimeout(() => {
     setToasts((prev) => prev.filter((t) => t.id !== id));
   }, 3000);
 };

  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
    rating: 0,
  });

  const handleChange = (key: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const [open, setOpen] = useState(false);
  const [formStyles, setFormStyles] = useState({
    heading: "Feedback",
    namePlaceholder: "Ayush Saini",
    emailPlaceholder: "ayush.jslab@gmail.com",
    feedbackPlaceholder: "Tell us what you think...",
    labelFontSize: 12,
    labelFontColor: "#374151",
    inputBackground: "#ffffff",
    headingColor: "#10b981",
    primaryBackground: "#ffffff",
    secondaryBackground: "#ffffff",
    buttonText: "Send Feedback",
    primaryColor: "#10b981",
    secondaryColor: "#059669",
    borderRadius: 18,
    blurEffect: 12,
    shadowIntensity: 18,
    starColor: "#f59e0b",
    starInactiveColor: "#d1d5db",
  });

  const [buttonStyles, setButtonStyles] = useState({
    emoji: "💬",
    fontSize: 22,
    textColor: "#ffffff",
    gradientStart: "#10b981",
    gradientEnd: "#059669",
    borderRadius: 20,
    paddingX: 10,
    paddingY: 6,
    shadowIntensity: 35,
    blurAmount: 6,
    borderColor: "rgba(255,255,255,0.3)",
    bottom: 30,
    right: 30,
    zIndex: 9999,
    hoverBrightness: 110,
  });

 React.useEffect(() => {
   if (!siteId) return; 

   FeedbackAPI.validateSite(siteId)
     .then((res) => {
       if (!res.success) {
         showToast("This website is not recognized.", false);
       }
     })
     .catch((error) => console.error("Validation error:", error));

   FeedbackAPI.fetchStyles(siteId)
     .then((res) => {
       if (res.data?.buttonStyles) setButtonStyles(res.data.buttonStyles);
       if (res.data?.formStyles) setFormStyles(res.data.formStyles);
     })
     .catch((error) => console.error("Fetch styles error:", error));
 }, [siteId]);

  const hexToRgba = (hex: string, alpha = 1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };
const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault(); 
  setLoading(true)
  FeedbackAPI.saveFeedback(siteId, form)
    .then(() => {
      showToast("Feedback submitted successfully!", true);
      setSubmitted(true)
      setOpen(false)
    })
    .catch(() => {
      showToast("Failed to submit feedback.", false);
    }).finally(() => setLoading(false))
};

  return (
    <div>
      {/* Feedback Modal */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: `${buttonStyles.bottom + 70}px`,
            right: `${buttonStyles.right}px`,
            zIndex: buttonStyles.zIndex,
            maxWidth: "340px",
            width: "100%",
            padding: "18px",
            borderRadius: `${formStyles.borderRadius}px`,
            background: `linear-gradient(135deg, ${formStyles.primaryBackground}, ${formStyles.secondaryBackground})`,
            backdropFilter: `blur(${formStyles.blurEffect}px)`,
            boxShadow: `0 16px 50px rgba(0,0,0,${
              formStyles.shadowIntensity / 100
            })`,
            border: `1px solid ${hexToRgba(formStyles.primaryColor, 0.2)}`,
            fontFamily: "sans-serif",
            animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            transformOrigin: "bottom right",
          }}
        >
          <style>
            {`
              @keyframes slideUp {
                from {
                  opacity: 0;
                  transform: translateY(20px) scale(0.95);
                }
                to {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
              @keyframes successPulse {
                0%, 100% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.05);
                }
              }
            `}
          </style>

          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
            }}
          >
            <h2
              style={{
                color: formStyles.headingColor,
                fontSize: "22px",
                fontWeight: 700,
                margin: 0,
              }}
            >
              {formStyles.heading}
            </h2>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: "22px",
                cursor: "pointer",
                color: "#6b7280",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f3f4f6";
                e.currentTarget.style.transform = "rotate(90deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
                e.currentTarget.style.transform = "rotate(0deg)";
              }}
            >
              &times;
            </button>
          </div>

          {/* Form */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              color: "#111",
            }}
          >
            <label
              style={{
                fontSize: `${formStyles.labelFontSize}px`,
                fontWeight: 500,
                color: `${hexToRgba(formStyles.labelFontColor)}`,
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder={formStyles.namePlaceholder}
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              style={{
                padding: "10px 14px",
                borderRadius: `${formStyles.borderRadius - 6}px`,
                border: `1.5px solid ${hexToRgba(
                  formStyles.primaryColor,
                  0.3
                )}`,
                fontSize: "14px",
                transition: "all 0.3s ease",
                fontFamily: "inherit",
                background: `${formStyles.inputBackground}`,
                outline: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = formStyles.primaryColor;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${hexToRgba(
                  formStyles.primaryColor,
                  0.1
                )}`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = hexToRgba(
                  formStyles.primaryColor,
                  0.3
                );
                e.currentTarget.style.boxShadow = "none";
              }}
            />

            <label
              style={{
                fontSize: `${formStyles.labelFontSize}px`,
                fontWeight: 500,
                color: `${hexToRgba(formStyles.labelFontColor)}`,
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder={formStyles.emailPlaceholder}
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              style={{
                padding: "10px 14px",
                borderRadius: `${formStyles.borderRadius - 6}px`,
                border: `1.5px solid ${hexToRgba(
                  formStyles.primaryColor,
                  0.3
                )}`,
                fontSize: "14px",
                transition: "all 0.3s ease",
                fontFamily: "inherit",
                background: `${formStyles.inputBackground}`,
                outline: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = formStyles.primaryColor;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${hexToRgba(
                  formStyles.primaryColor,
                  0.1
                )}`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = hexToRgba(
                  formStyles.primaryColor,
                  0.3
                );
                e.currentTarget.style.boxShadow = "none";
              }}
            />

            <label
              style={{
                fontSize: `${formStyles.labelFontSize}px`,
                fontWeight: 500,
                color: `${hexToRgba(formStyles.labelFontColor)}`,
              }}
            >
              Your Feedback
            </label>
            <textarea
              required
              placeholder={formStyles.feedbackPlaceholder}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              style={{
                padding: "10px 14px",
                borderRadius: `${formStyles.borderRadius - 6}px`,
                border: `1.5px solid ${hexToRgba(
                  formStyles.primaryColor,
                  0.3
                )}`,
                resize: "none",
                minHeight: "60px",
                fontSize: "14px",
                transition: "all 0.3s ease",
                fontFamily: "inherit",
                background: `${formStyles.inputBackground}`,
                outline: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = formStyles.primaryColor;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${hexToRgba(
                  formStyles.primaryColor,
                  0.1
                )}`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = hexToRgba(
                  formStyles.primaryColor,
                  0.3
                );
                e.currentTarget.style.boxShadow = "none";
              }}
            ></textarea>

            <label
              style={{
                fontSize: `${formStyles.labelFontSize}px`,
                fontWeight: 500,
                color: `${hexToRgba(formStyles.labelFontColor)}`,
              }}
            >
              Rate Your experience
            </label>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "6px",
                padding: "4px 0",
              }}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    fontSize: "28px",
                    cursor: "pointer",
                    color:
                      star <= (hover || form.rating)
                        ? `${formStyles.starColor}`
                        : "#d1d5db",
                    marginRight: "6px",
                    transition: "all 0.2s ease",

                    display: "inline-block",
                  }}
                  onClick={() => handleChange("rating", star)}
                  onMouseEnter={(e) => {
                    setHover(star);
                    e.currentTarget.style.transform = "scale(1.2)";
                  }}
                  onMouseLeave={(e) => {
                    setHover(0);
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitted || loading}
              style={{
                background: submitted
                  ? "#10b981"
                  : `linear-gradient(135deg, ${formStyles.primaryColor} 0%, ${formStyles.secondaryColor} 100%)`,
                color: "#fff",
                padding: "12px",
                border: "none",
                borderRadius: `${formStyles.borderRadius - 4}px`,
                cursor: submitted ? "not-allowed" : "pointer",
                fontSize: "14px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: `0 6px 18px rgba(16,185,129,0.35)`,
                marginTop: "4px",
                position: "relative",
                overflow: "hidden",
                animation: submitted ? "successPulse 0.6s ease" : "none",
              }}
              onMouseEnter={(e) => {
                if (!submitted) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 8px 24px rgba(16,185,129,0.45)`;
                }
              }}
              onMouseLeave={(e) => {
                if (!submitted) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 6px 18px rgba(16,185,129,0.35)`;
                }
              }}
            >
              {submitted ? "✓ Submitted!" : loading ? "Sending..." : formStyles.buttonText}
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: `${buttonStyles.bottom}px`,
          right: `${buttonStyles.right}px`,
          zIndex: buttonStyles.zIndex,
          background: `linear-gradient(135deg, ${buttonStyles.gradientStart} 0%, ${buttonStyles.gradientEnd} 100%)`,
          color: buttonStyles.textColor,
          border: `1px solid ${buttonStyles.borderColor}`,
          borderRadius: `${buttonStyles.borderRadius}px`,
          padding: `${buttonStyles.paddingY + 4}px ${buttonStyles.paddingX}px`,
          fontSize: `${buttonStyles.fontSize}px`,
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: `0 10px 25px ${hexToRgba(
            "#000",
            buttonStyles.shadowIntensity / 100
          )}`,
          fontFamily: "'Inter', sans-serif",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          backdropFilter: `blur(${buttonStyles.blurAmount}px)`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1) rotate(5deg)";
          e.currentTarget.style.boxShadow = `0 15px 35px rgba(0,0,0,${
            (buttonStyles.shadowIntensity + 10) / 100
          })`;
          (
            e.currentTarget as HTMLButtonElement
          ).style.filter = `brightness(${buttonStyles.hoverBrightness}%)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1) rotate(0deg)";
          e.currentTarget.style.boxShadow = `0 10px 25px rgba(0,0,0,${
            buttonStyles.shadowIntensity / 100
          })`;
          (e.currentTarget as HTMLButtonElement).style.filter =
            "brightness(100%)";
        }}
      >
        {buttonStyles.emoji}
      </button>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          success={toast.success}
          onClose={() =>
            setToasts((prev) => prev.filter((t) => t.id !== toast.id))
          }
        />
      ))}
    </div>
  );
};

export { Feedback };
