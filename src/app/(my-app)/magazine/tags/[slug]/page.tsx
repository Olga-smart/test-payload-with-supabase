import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload, PaginatedDocs } from "payload";
import config from "@payload-config";
import type { Tag } from "@payload-types";
import styles from "./page.module.css";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await props.params;
  const { page } = await props.searchParams;
  const currentPage = typeof page === "string" ? parseInt(page) : 1;
  const payload = await getPayload({ config });

  const tags: PaginatedDocs<Tag> = await payload.find({
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
            className={`${styles.tag} ${
              tag.slug === slug ? styles.currentTag : ""
            }`}
          >
            #{tag.name}
          </Link>
        ))}
      </div>
      <div className={styles.articles}>
        {articles.docs.map((article) => (
          <div key={article.id} className={styles.articleCard}>
            {typeof article.cover === "object" &&
              typeof article.cover.url === "string" && (
                <Image
                  className={styles.articleImage}
                  src={article.cover.url}
                  alt={article.title}
                  width="400"
                  height="300"
                />
              )}
            <h2 className={styles.articleTitle}>
              <Link href={`/magazine/article/${article.slug}`}>
                {article.title}
              </Link>
            </h2>
            {typeof article.author === "object" && (
              <div className={styles.articleAuthor}>{article.author.name}</div>
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
