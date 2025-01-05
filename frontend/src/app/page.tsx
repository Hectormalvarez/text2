import SnippetID from "./components/SnippetRetrievalForm";
import SnippetForm from "./components/SnippetForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to TextShare!</h1>
      <div className={styles.snippetActions}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Retrieve a Snippet</h2>
          <SnippetID />
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Create a New Snippet</h2>
          <SnippetForm />
        </div>
      </div>
    </div>
  );
}