"use client";

import { useState } from "react";
import styles from "./CommonStyles.module.css";

export default function SnippetID() {
  const [snippetID, setSnippetID] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (snippetID.trim() === "") {
      setError("Please enter a Snippet ID");
    } else {
      setError("");
      console.log("Retrieving Snippet ID:", snippetID);
      // Add logic to retrieve the snippet
      setSnippetID("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          aria-label="Snippet ID"
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
    </form>
  );
}
