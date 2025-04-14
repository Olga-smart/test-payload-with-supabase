import hljs from "highlight.js";
import "./theme.css";
import styles from "./block.module.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CodeBlock(props: any) {
  const highlighted = hljs.highlightAuto(props.code).value;

  return (
    <div className={styles.block}>
      <pre className={styles.pre}>
        <code
          className="hljs"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
}
