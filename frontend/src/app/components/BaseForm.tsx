"use client";

import React, { useState, FormEvent } from 'react';
import styles from './BaseForm.module.css';

interface BaseFormProps {
  onSubmit: (data: string) => void;
  buttonText: string;
  inputType: 'input' | 'textarea';
  placeholder: string;
  ariaLabel: string;
}

export default function BaseForm({ onSubmit, buttonText, inputType, placeholder, ariaLabel }: BaseFormProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === "") {
      setError("This field cannot be empty");
    } else {
      setError("");
      onSubmit(value);
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        {inputType === 'textarea' ? (
          <textarea
            aria-label={ariaLabel}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={styles.textarea}
          />
        ) : (
          <input
            type="text"
            aria-label={ariaLabel}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={styles.input}
          />
        )}
      </div>
      <button type="submit" className={styles.button}>{buttonText}</button>
      <div className={styles.errorContainer}>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </form>
  );
}