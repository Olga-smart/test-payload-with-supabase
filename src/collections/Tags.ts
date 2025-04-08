import type { CollectionConfig } from "payload";

import { slugField } from "@/fields/slug";

export const Tags: CollectionConfig = {
  slug: "tags",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    ...slugField("name"),
  ],
};
