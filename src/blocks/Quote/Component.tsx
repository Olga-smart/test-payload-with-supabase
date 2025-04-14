import { clsx } from "clsx";
import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";
import styles from "./block.module.css";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export function QuoteBlock(props: any) {
  return (
    <div
      className={clsx(
        styles.block,
        props.type === "small" && styles.block_type_small,
        props.type === "medium" && styles.block_type_medium,
        props.type === "big" && styles.block_type_big,
        props.type === "with photo" && styles.block_type_withPhoto
      )}
    >
      <div className={styles.container}>
        {props.type === "with photo" && props.photo?.url && (
          <div className={styles.photoWrapper}>
            <Image
              src={props.photo.url}
              alt=""
              width={250}
              height={250}
              className={styles.photo}
            />
          </div>
        )}
        <div>
          <blockquote className={styles.text}>
            <RichText data={props.text} />
          </blockquote>
          <div className={styles.author}>
            <RichText data={props.authorName} />
          </div>
          {props.authorDuty && (
            <div className={styles.duty}>
              <RichText data={props.authorDuty} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
