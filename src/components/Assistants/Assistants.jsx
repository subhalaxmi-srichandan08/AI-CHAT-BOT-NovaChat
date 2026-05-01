import { useEffect, useState } from "react";
import { Assistant as GoogleAIAssistant } from "../../assistants/googleai";
import styles from "./Assistants.module.css";

const assistantMap = {
  googleai: GoogleAIAssistant,
};

export function Assistant({ onAssistantChange }) {
  const [value, setValue] = useState("googleai:gemini-flash-latest");

  function handleValueChange(event) {
    setValue(event.target.value);
  }

  useEffect(() => {
    if (!value) return;

    const [assistant, model] = value.split(":");
    const AssistantClass = assistantMap[assistant];

    if (!AssistantClass) {
      throw new Error(`Unknown assistant: ${assistant} or model: ${model}`);
    }

    onAssistantChange(new AssistantClass(model));
  }, [value]);

  return (
    <div className={styles.Assistant}>
      <span>Model:</span>
      <select value={value} onChange={handleValueChange}>
        <option value="googleai:gemini-2.0-flash">Gemini 2.0 Flash</option>
        <option value="googleai:gemini-2.0-flash-lite">
          Gemini 2.0 Flash-Lite
        </option>
        <option value="googleai:gemini-flash-latest">Gemini Flash Latest</option>
      </select>
    </div>
  );
}
