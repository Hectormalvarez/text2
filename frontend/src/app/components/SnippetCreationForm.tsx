"use client";

import { useState } from "react";
import BaseForm from "./BaseForm";
import styles from "./SnippetCreationForm.module.css";

export default function SnippetCreationForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (snippet: string) => {
    setSuccessMessage("");
    setErrorMessage("");

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
    } catch (error) {
      setErrorMessage("Failed to create snippet. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <BaseForm
        onSubmit={handleSubmit}
        buttonText="Create Snippet"
        inputType="textarea"
        placeholder="Enter your snippet here"
        ariaLabel="Enter your snippet"
      />
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
}