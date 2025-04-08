import Image from "next/image";
import Link from "next/link";
import { getPayload, PaginatedDocs } from "payload";
import config from "@payload-config";
import type { Article } from "@payload-types";
import { formatDate } from "@/lib/utils";
import styles from "./page.module.css";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const payload = await getPayload({ config });
  const params = await props.searchParams;
  const currentPage =
    typeof params.page === "string" ? parseInt(params.page) : 1;

  const articles: PaginatedDocs<Article> = await payload.find({
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
          {typeof article.cover === "object" &&
            typeof article.cover.url === "string" && (
              <Image
                className={styles.articleImage}
                src={article.cover.url}
                alt={article.title}
                width="500"
                height="300"
              />
            )}
          <div className={styles.articleMeta}>
            <span className={styles.articleType}>Articles</span>
            {article.tags?.map(
              (tag) =>
                typeof tag !== "number" && (
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
              {formatDate(new Date(article.publishedAt))}
            </span>
          </div>
          <h2 className={styles.articleTitle}>
            <Link href={`/magazine/article/${article.slug}`}>
              {article.title}
            </Link>
          </h2>
          <div className={styles.articleDescription}>{article.description}</div>
          {typeof article.author === "object" && (
            <div className={styles.articleAuthor}>{article.author.name}</div>
          )}
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
