import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { seoPlugin } from "@payloadcms/plugin-seo";

import { Tags } from "@/collections/Tags";
import { Authors } from "@/collections/Authors";
import { Articles } from "@/collections/Articles";
import { Media } from "@/collections/Media";

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Tags, Authors, Articles, Media],
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  sharp,
  plugins: [seoPlugin({})],
});
