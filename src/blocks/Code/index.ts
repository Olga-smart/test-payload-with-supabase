import type { Block } from "payload";

export const Code: Block = {
  slug: "code",
  imageURL: "../../../admin/blocks/code.svg",
  fields: [
    {
      name: "width",
      type: "radio",
      options: ["content", "screen"],
      defaultValue: "screen",
      hidden: true,
    },
    {
      name: "code",
      type: "code",
      required: true,
    },
  ],
};
