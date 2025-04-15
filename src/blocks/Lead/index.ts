import type { Block } from "payload";

export const Lead: Block = {
  slug: "lead",
  imageURL: "../../../admin/blocks/lead.svg",
  fields: [
    {
      name: "width",
      type: "radio",
      options: ["content", "screen"],
      defaultValue: "content",
      hidden: true,
    },
    {
      name: "text",
      type: "richText",
      required: true,
    },
  ],
};
