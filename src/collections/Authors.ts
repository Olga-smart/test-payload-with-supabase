import type { CollectionConfig } from "payload";

import { slugField } from "@/fields/slug";

export const Authors: CollectionConfig = {
  slug: "authors",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "duty",
      type: "text",
    },
    ...slugField("name"),
  ],
};
