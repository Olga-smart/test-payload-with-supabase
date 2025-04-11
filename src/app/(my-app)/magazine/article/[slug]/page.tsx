import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Article } from "@payload-types";
import { RichText } from "@/components/RichText";
import type { SerializedBlockNode } from "@payloadcms/richtext-lexical";
import { clsx } from "clsx";
import { formatDate } from "@/lib/utils";
import styles from "./page.module.css";

type Params = Promise<{ slug: string }>;

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "articles",
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const article: Article = result.docs[0];

  if (!article) {
    notFound();
  }

  return (
    <>
      <div className="container">
        <h1 className={styles.pageTitle}>{article.title}</h1>
      </div>
      <div
        className={styles.cover}
        style={{ backgroundColor: article.coverColor }}
      >
        <div className={styles.coverImageWrapper}>
          {typeof article.cover === "object" &&
            typeof article.cover.url === "string" && (
              <Image
                className={styles.coverImage}
                src={article.cover.url}
                alt={article.title}
                width={1200}
                height={700}
              />
            )}
          <div
            className={styles.coverLeftGradient}
            style={{ backgroundColor: article.coverColor }}
          ></div>
          <div
            className={styles.coverRightGradient}
            style={{ backgroundColor: article.coverColor }}
          ></div>
        </div>
      </div>
      <div className="container">
        <div className={styles.articleContainer}>
          <div className={styles.metaHeader}>
            {typeof article.author === "object" && (
              <div className={styles.author}>
                <span className={styles.authorName}>{article.author.name}</span>
                <span className={styles.authorDuty}>{article.author.duty}</span>
              </div>
            )}
            <span className={styles.publishedDate}>
              {formatDate(new Date(article.publishedAt))}
            </span>
            <span className={styles.readingTime}>
              Read for {article.readingTime} minutes
            </span>
          </div>
        </div>
      </div>
      <div className={clsx("container", styles.articleBody)}>
        {article.content.root.children.map((node, index) => {
          const blockNode = node as SerializedBlockNode<
            Record<string, unknown>
          >;
          const isFullWidthBlock =
            node.type === "block" && blockNode.fields?.width === "screen";
          return (
            <div
              key={index}
              className={clsx(
                !isFullWidthBlock && styles.articleContainer,
                isFullWidthBlock && "js-fullWidthSection"
              )}
            >
              <RichText
                data={{ root: { ...article.content.root, children: [node] } }}
              />
            </div>
          );
        })}
      </div>
      <div className="container">
        <div className={styles.articleContainer}>
          <div className={styles.metaFooter}>
            {typeof article.author === "object" && (
              <div className={styles.author}>
                <span className={styles.authorName}>{article.author.name}</span>
                <span className={styles.authorDuty}>{article.author.duty}</span>
              </div>
            )}
            <span className={styles.publishedDate}>
              {formatDate(new Date(article.publishedAt))}
            </span>
            <span className={styles.tags}>
              {article.tags?.map(
                (tag) =>
                  typeof tag !== "number" && (
                    <Link
                      href={`/magazine/tags/${tag.slug}`}
                      key={tag.id}
                      className={styles.tag}
                    >
                      #{tag.name}
                    </Link>
                  )
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
