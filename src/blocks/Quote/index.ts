import type { Block } from "payload";

export const Quote: Block = {
  slug: "quote",
  imageURL: "../../../admin/blocks/quote.svg",
  fields: [
    {
      name: "text",
      type: "richText",
      required: true,
    },
    {
      name: "authorName",
      type: "richText",
      required: true,
    },
    {
      name: "authorDuty",
      type: "richText",
    },
    {
      name: "width",
      type: "radio",
      options: ["content", "screen"],
      defaultValue: "screen",
    },
    {
      name: "type",
      type: "radio",
      options: ["small", "medium", "big", "with photo"],
      defaultValue: "medium",
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
  ],
};
