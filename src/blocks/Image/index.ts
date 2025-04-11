import type { Block } from "payload";

export const Image: Block = {
  slug: "image",
  imageURL: "../../../admin/blocks/image.svg",
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "width",
      type: "radio",
      options: ["content", "screen"],
      defaultValue: "content",
    },
    {
      name: "padding",
      type: "checkbox",
      admin: {
        description:
          "Select this option if the image is on a plain background, but the edges of the image stick strongly to the borders",
      },
    },
    {
      name: "stretch",
      type: "checkbox",
      admin: {
        description:
          "The image is automatically stretched if its width is less than the container up to 80 pixels. If you want to stretch an image that has a smaller size, enable this checkbox. Be careful - this degrades the quality!",
      },
    },
    {
      name: "backgroundColor",
      type: "text",
      validate: (value: string | null | undefined) => {
        const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
        if (value && typeof value === "string" && !hexRegex.test(value)) {
          return "Please enter the correct HEX code for the color (e.g. #ff5733 or #abc)";
        }
        return true;
      },
      admin: {
        placeholder: "#E48002",
        description:
          "Choose a color that will fill the empty space of the container.",
      },
    },
  ],
};
