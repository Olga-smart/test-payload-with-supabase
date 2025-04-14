import Link from "next/link";
import styles from "./block.module.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AdvertisingBlock(props: any) {
  return (
    <div className={styles.block}>
      <div className={styles.column}>
        <div className={styles.title}>{props.title}</div>
        <Link className={styles.link} href={props.linkUrl}>
          {props.linkText}
        </Link>
      </div>
      <div className={styles.column}>
        <div className={styles.content}>{props.content}</div>
      </div>
    </div>
  );
}
