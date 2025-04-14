import type { CollectionConfig } from "payload";
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import {
  MetaTitleField,
  MetaDescriptionField,
} from "@payloadcms/plugin-seo/fields";
import { slugField } from "@/fields/slug";
import { Image } from "@/blocks/Image";
import { Advertising } from "@/blocks/Advertising";

export const Articles: CollectionConfig = {
  slug: "articles",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "publishedAt"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    ...slugField(),
    {
      name: "publishedAt",
      type: "date",
      defaultValue: () => new Date(),
      required: true,
      admin: {
        position: "sidebar",
        date: {
          displayFormat: "d MMMM yyyy",
        },
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "authors",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "cover",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              name: "coverColor",
              type: "text",
              required: true,
              validate: (value: string | null | undefined) => {
                const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
                if (typeof value === "string" && !hexRegex.test(value)) {
                  return "Please enter the correct HEX code for the color (e.g. #ff5733 or #abc)";
                }
                return true;
              },
              admin: {
                placeholder: "#E48002",
              },
            },
            {
              name: "content",
              type: "richText",
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
                  BlocksFeature({ blocks: [Image, Advertising] }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
              label: false,
              required: true,
            },
          ],
        },
        {
          label: "Meta",
          fields: [
            {
              name: "description",
              type: "textarea",
              required: true,
            },
            {
              name: "readingTime",
              type: "number",
              required: true,
            },
            {
              name: "tags",
              type: "relationship",
              hasMany: true,
              relationTo: "tags",
            },
            {
              name: "relatedArticles",
              type: "relationship",
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                };
              },
              hasMany: true,
              relationTo: "articles",
            },
            {
              name: "TitleForRelatedArticlesSection",
              type: "text",
            },
          ],
        },
        {
          name: "meta",
          label: "SEO",
          fields: [MetaTitleField({}), MetaDescriptionField({})],
        },
      ],
    },
  ],
};
