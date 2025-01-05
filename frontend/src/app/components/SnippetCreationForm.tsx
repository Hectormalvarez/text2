"use client";

import { useState } from "react";
import styles from "./CommonStyles.module.css";

export default function SnippetForm() {
  const [snippet, setSnippet] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (snippet.trim() === "") {
      setError("Please enter a snippet");
      return;
    }

    setError("");
    try {
      const response = await fetch("/api/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: snippet }),
      });

      if (!response.ok) {
        throw new Error("Failed to create snippet");
      }

      const data = await response.json();
      setSuccessMessage(`Snippet created successfully! ID: ${data.id}`);
      setSnippet("");
    } catch (error) {
      setError("Failed to create snippet. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <textarea
          aria-label="Enter your snippet"
          placeholder="Enter your snippet here"
          value={snippet}
          onChange={(e) => setSnippet(e.target.value)}
          className={styles.textarea}
        />
      </div>
      <button type="submit" className={styles.button}>
        Create Snippet
      </button>
      <div className={styles.errorContainer}>
        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
      </div>
    </form>
  );
}
