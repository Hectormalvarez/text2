"use client";

import { useState } from "react";
import BaseForm from "./BaseForm";
import styles from "./SnippetRetrievalForm.module.css";

export default function SnippetRetrievalForm() {
  const [snippetContent, setSnippetContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (snippetID: string) => {
    setError("");
    setSnippetContent("");

    try {
      const response = await fetch(`/api/snippets/${snippetID}`, {
        method: 'GET',
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Snippet not found");
        }
        throw new Error("Failed to retrieve snippet");
      }

      const data = await response.json();
      setSnippetContent(data.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  return (
    <div className={styles.container}>
      <BaseForm
        onSubmit={handleSubmit}
        buttonText="Retrieve Snippet"
        inputType="input"
        placeholder="Enter Snippet ID"
        ariaLabel="Enter Snippet ID"
      />
      {error && <p className={styles.error}>{error}</p>}
      {snippetContent && (
        <div className={styles.snippetContent}>
          <p>{snippetContent}</p>
        </div>
      )}
    </div>
  );
}