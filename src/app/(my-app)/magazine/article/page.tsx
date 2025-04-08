import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import { formatDate } from "@/lib/utils";
import styles from "./page.module.css";

export default async function Page({ searchParams }) {
  const payload = await getPayload({ config });
  const params = await searchParams;
  const currentPage = parseInt(params.page) || 1;

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
            {article.tags.map((tag) => (
              <Link
                href={`/magazine/tags/${tag.slug}`}
                key={tag.id}
                className={styles.articleTag}
              >
                #{tag.name}
              </Link>
            ))}
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
              className={`${styles.page} ${currentPage === page ? styles.currentPage : ""}`}
            >
              {page}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
