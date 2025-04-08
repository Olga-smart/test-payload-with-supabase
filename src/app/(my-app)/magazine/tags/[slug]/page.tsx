import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import styles from "./page.module.css";

export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page) || 1;
  const payload = await getPayload({ config });

  const tags = await payload.find({
    collection: "tags",
    sort: "name",
    pagination: false,
  });

  if (!tags.docs.find((tag) => tag.slug === slug)) {
    notFound();
  }

  const articles = await payload.find({
    collection: "articles",
    sort: "-publishedAt",
    limit: 6,
    depth: 1,
    page: currentPage,
    where: {
      "tags.slug": {
        contains: slug,
      },
    },
  });

  const pages = [];
  for (let i = 1; i <= articles.totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="container">
      <h1 className={styles.pageTitle}>Sharing needed important</h1>
      <div className={styles.tags}>
        {tags.docs.map((tag) => (
          <Link
            key={tag.id}
            href={`/magazine/tags/${tag.slug}`}
            className={`${styles.tag} ${tag.slug === slug ? styles.currentTag : ""}`}
          >
            #{tag.name}
          </Link>
        ))}
      </div>
      <div className={styles.articles}>
        {articles.docs.map((article) => (
          <div key={article.id} className={styles.articleCard}>
            <Image
              className={styles.articleImage}
              src={article.cover.url}
              alt={article.title}
              width="400"
              height="300"
            />
            <h2 className={styles.articleTitle}>
              <Link href={`/magazine/article/${article.slug}`}>
                {article.title}
              </Link>
            </h2>
            <div className={styles.articleAuthor}>{article.author.name}</div>
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
            </div>
          </div>
        ))}
      </div>
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
