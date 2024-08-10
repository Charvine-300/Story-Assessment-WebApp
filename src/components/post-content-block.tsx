import {ImageContent, TextContent} from "@/lib/types";
import Image from "next/image";

type PostContentBlockProps = {
    item: TextContent | ImageContent;
};

/**
 * Renders a block of post content, either text or image.
 *
 * Props:
 * - item: Content item with type "text" or "image".
 *   - TextContent: Renders a paragraph of text.
 *   - ImageContent: Renders an image with a caption.
 *
 * Usage:
 * Use this component to dynamically display post content
 * based on its type within a post page.
 */
export default function PostContentBlock({ item }: PostContentBlockProps) {
    if (item.type === "text") {
        return <p className="text-muted-foreground">{item.content}</p>;
    }

    if (item.type === "image") {
        return (
            <div className="pb-2">
                <Image
                    src={item.url}
                    alt={item.caption}
                    width={600}
                    height={400}
                    className="aspect-[16/9] rounded-md object-cover"
                />
                <p className="text-left text-sm text-muted-foreground mt-2">{item.caption}</p>
            </div>
        );
    }
    return null;
}
