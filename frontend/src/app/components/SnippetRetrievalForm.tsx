"use client";

import { useState } from "react";
import styles from "./CommonStyles.module.css";

export default function SnippetRetrievalForm() {
  const [snippetID, setSnippetID] = useState("");
  const [error, setError] = useState("");
  const [snippetContent, setSnippetContent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (snippetID.trim() === "") {
      setError("Please enter a Snippet ID");
      return;
    }

    setError("");
    try {
      const response = await fetch(`/api/snippets/${snippetID}`, {
        method: 'GET',
      });

      if (!response.ok) {
        if (response.status === 404) {
          setError("Snippet not found");
        } else {
          throw new Error('Failed to retrieve snippet');
        }
        return;
      }

      const data = await response.json();
      setSnippetContent(data.text);
    } catch (err) {
      setError("Failed to retrieve snippet");
    }
    setSnippetID("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          aria-label="Enter Snippet ID"
          placeholder="Enter Snippet ID"
          value={snippetID}
          onChange={(e) => setSnippetID(e.target.value)}
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.button}>Retrieve Snippet</button>
      <div className={styles.errorContainer}>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      {snippetContent && (
        <div className={styles.snippetContent}>
          <p>{snippetContent}</p>
        </div>
      )}
    </form>
  );
}
