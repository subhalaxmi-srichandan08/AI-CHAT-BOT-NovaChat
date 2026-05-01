import styles from "./Theme.module.css";

export function Theme() {
  function handleValueChange(event) {
    let meta = document.querySelector('meta[name="color-scheme"]');

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "color-scheme";
      document.head.appendChild(meta);
    }

    meta.setAttribute("content", event.target.value);
  }

  return (
    <div className={styles.Theme}>
      <span>Theme:</span>
      <select defaultValue="light dark" onChange={handleValueChange}>
        <option value="light dark">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
