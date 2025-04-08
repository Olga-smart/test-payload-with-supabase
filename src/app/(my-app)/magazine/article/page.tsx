import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import { formatDate } from "@/lib/utils";
import styles from "./page.module.css";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const payload = await getPayload({ config });
  const params = await props.searchParams;
  const currentPage =
    typeof params.page === "string" ? parseInt(params.page) : 1;

  const articles = await payload.find({
    collection: "articles",
    sort: "-publishedAt",
    depth: 1,
    page: currentPage,
  });

  const pages = [];
  for (let i = 1; i <= articles.totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="container">
      <h1 className={styles.heading}>All materials</h1>
      {articles.docs.map((article) => (
        <div key={article.id} className={styles.articleCard}>
          <Image
            className={styles.articleImage}
            src={article.cover.url}
            alt={article.title}
            width="500"
            height="300"
          />
          <div className={styles.articleMeta}>
            <span className={styles.articleType}>Articles</span>
            {article.tags.map(
              (tag: {
                slug: any;
                id: Key | null | undefined;
                name:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
              }) => (
                <Link
                  href={`/magazine/tags/${tag.slug}`}
                  key={tag.id}
                  className={styles.articleTag}
                >
                  #{tag.name}
                </Link>
              )
            )}
            <span className={styles.articleDate}>
              {formatDate(article.publishedAt)}
            </span>
          </div>
          <h2 className={styles.articleTitle}>
            <Link href={`/magazine/article/${article.slug}`}>
              {article.title}
            </Link>
          </h2>
          <div className={styles.articleDescription}>{article.description}</div>
          <div className={styles.articleAuthor}>{article.author.name}</div>
        </div>
      ))}
      {articles.totalPages > 1 && (
        <div className={styles.pagination}>
          {pages.map((page) => (
            <a
              href={`?page=${page}`}
              key={page}
              className={`${styles.page} ${
                currentPage === page ? styles.currentPage : ""
              }`}
            >
              {page}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
