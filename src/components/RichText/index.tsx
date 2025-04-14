import { ImageBlock } from "@/blocks/Image/Component";
import { AdvertisingBlock } from "@/blocks/Advertising/Component";
import { QuoteBlock } from "@/blocks/Quote/Component";
import { CodeBlock } from "@/blocks/Code/Component";
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  type DefaultTypedEditorState,
} from "@payloadcms/richtext-lexical";
import {
  JSXConvertersFunction,
  RichText as ConvertRichText,
} from "@payloadcms/richtext-lexical/react";
import type { Block } from "payload";
import { clsx } from "clsx";

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<Block>;

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  blocks: {
    image: ({
      node,
    }: {
      node: SerializedBlockNode<Block> & { fields: Record<string, unknown> };
    }) => <ImageBlock {...node.fields} />,
    advertising: ({
      node,
    }: {
      node: SerializedBlockNode<Block> & { fields: Record<string, unknown> };
    }) => <AdvertisingBlock {...node.fields} />,
    quote: ({
      node,
    }: {
      node: SerializedBlockNode<Block> & { fields: Record<string, unknown> };
    }) => <QuoteBlock {...node.fields} />,
    code: ({
      node,
    }: {
      node: SerializedBlockNode<Block> & { fields: Record<string, unknown> };
    }) => <CodeBlock {...node.fields} />,
  },
});

type Props = {
  data: DefaultTypedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function RichText(props: Props) {
  const { className, ...rest } = props;
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={clsx("payload-richtext", className)}
      {...rest}
    />
  );
}
