import SnippetRetrievalForm from "./components/SnippetRetrievalForm";
import SnippetCreationForm from "./components/SnippetCreationForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to TextShare!</h1>
      <div className={styles.snippetActions}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Retrieve a Snippet</h2>
          <SnippetRetrievalForm />
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Create a New Snippet</h2>
          <SnippetCreationForm />
        </div>
      </div>
    </div>
  );
}