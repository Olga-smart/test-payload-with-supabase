import type { CollectionConfig } from "payload";

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const Media: CollectionConfig = {
  slug: "media",
  fields: [
    {
      name: "alt",
      type: "text",
    },
    {
      name: "caption",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
    },
  ],
  upload: {
    imageSizes: [
      {
        name: "small",
        width: 479,
      },
      {
        name: "medium",
        width: 767,
      },
      {
        name: "large",
        width: 991,
      },
      {
        name: "xlarge",
        width: 1280,
      },
    ],
  },
  access: {
    read: () => true,
  },
};
