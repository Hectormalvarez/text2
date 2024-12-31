import styles from "./page.module.css";
import SnippetForm from "@/app/components/SnippetForm";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to TextShare!</h1>
      <SnippetForm />
    </div>
  );
}