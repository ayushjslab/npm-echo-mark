import * as React from "react"
import { useState } from "react";

const Feedback: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Feedback Form</h2>

        <label style={styles.label}>Full Name</label>
        <input
          type="text"
          required
          placeholder="Enter your name"
          style={styles.input}
        />

        <label style={styles.label}>Email</label>
        <input
          type="email"
          required
          placeholder="Enter your email"
          style={styles.input}
        />

        <label style={styles.label}>Description</label>
        <textarea
          required
          placeholder="Write your feedback"
          style={styles.textarea}
        ></textarea>

        <label style={styles.label}>Rating</label>
        <div style={styles.ratingBox}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                fontSize: "28px",
                cursor: "pointer",
                color: star <= (hover || rating) ? "#059669" : "#d1d5db",
                marginRight: "6px",
                transition: "0.2s",
              }}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>

        <button type="submit" style={styles.button}>
          Submit
        </button>

        {submitted && <p style={styles.success}>✔ Feedback submitted!</p>}
      </form>
    </div>
  );
};

export default Feedback;

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ecfdf5",
    padding: "20px",
  },
  card: {
    width: "380px",
    padding: "25px",
    borderRadius: "18px",
    background: "white",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#065f46",
    fontSize: "22px",
    fontWeight: 700,
  },
  label: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#064e3b",
    fontWeight: 600,
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "4px",
    borderRadius: "8px",
    border: "1px solid #d1fae5",
    background: "#f0fdf4",
    fontSize: "14px",
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginTop: "4px",
    borderRadius: "8px",
    border: "1px solid #d1fae5",
    background: "#f0fdf4",
    resize: "vertical",
    height: "90px",
    fontSize: "14px",
    outline: "none",
  },
  ratingBox: {
    display: "flex",
    marginTop: "6px",
    marginBottom: "10px",
  },
  button: {
    marginTop: "12px",
    padding: "12px",
    background: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 600,
    transition: "0.2s",
  },
  success: {
    marginTop: "12px",
    background: "#d1fae5",
    padding: "10px",
    textAlign: "center",
    borderRadius: "8px",
    color: "#065f46",
    fontWeight: 600,
  },
};
