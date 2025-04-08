import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import styles from "./page.module.css";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const payload = await getPayload({ config });
  const params = await props.searchParams;
  const currentPage =
    typeof params.page === "string" ? parseInt(params.page) : 1;

  const tags = await payload.find({
    collection: "tags",
    sort: "name",
    page: currentPage,
  });

  const pages = [];
  for (let i = 1; i <= tags.totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="container">
      <h1 className={styles.heading}>All tags</h1>
      {tags.docs.map((tag) => (
        <Link
          key={tag.id}
          href={`/magazine/tags/${tag.slug}`}
          className={styles.tag}
        >
          #{tag.name}
        </Link>
      ))}
      {tags.totalPages > 1 && (
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
