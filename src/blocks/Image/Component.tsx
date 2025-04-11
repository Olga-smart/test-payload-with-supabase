import { clsx } from "clsx";
import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";
import styles from "./block.module.css";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export function ImageBlock(props: any) {
  return (
    <figure className={clsx(styles.block)}>
      <div
        className={clsx(
          styles.imageWrapper,
          props.padding && styles.imageWrapperWithPadding
        )}
        style={{ backgroundColor: props.backgroundColor }}
      >
        <Image
          className={clsx(styles.image, props.stretch && styles.imageStretched)}
          src={props.image.url}
          alt={props.image.alt || ""}
          width={props.image.width}
          height={props.image.height}
        />
      </div>
      <RichText data={props.image.caption} className={styles.caption} />
    </figure>
  );
}
