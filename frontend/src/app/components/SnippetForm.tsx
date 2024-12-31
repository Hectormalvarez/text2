"use client";

import { useState } from "react";
import styles from "./SnippetForm.module.css";

export default function SnippetForm() {
  const [snippet, setSnippet] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (snippet.trim() === "") {
      setError("Please enter a snippet");
    } else {
      setError("");
      console.log("Snippet submitted:", snippet);
      setSnippet("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        aria-label="Enter your snippet"
        placeholder="Enter your snippet here"
        value={snippet}
        onChange={(e) => setSnippet(e.target.value)}
        className={styles.textarea}
      />
      <button type="submit" className={styles.button}>Submit</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}