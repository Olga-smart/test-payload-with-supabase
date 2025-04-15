import { RichText } from "@payloadcms/richtext-lexical/react";
import styles from "./block.module.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LeadBlock(props: any) {
  return <RichText data={props.text} className={styles.block} />;
}
