import type { Block } from "payload";

export const Advertising: Block = {
  slug: "advertising",
  imageURL: "../../../admin/blocks/advertising.svg",
  fields: [
    {
      name: "width",
      type: "radio",
      options: ["content", "screen"],
      defaultValue: "screen",
      hidden: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "textarea",
      required: true,
    },
    {
      name: "linkText",
      type: "text",
      required: true,
    },
    {
      name: "linkUrl",
      type: "text",
      required: true,
    },
  ],
};
