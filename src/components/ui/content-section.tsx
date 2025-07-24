import ReactMarkdown from "react-markdown";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/components/ui/typography";

interface ContentSectionProps {
  content: string;
}

export function ContentSection({ content }: ContentSectionProps) {
  if (!content.trim()) return null;

  return (
    <article className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none" role="main">
      <ReactMarkdown
        components={{
          h1: (props) => (
            <TypographyH1 {...props} className="mb-4 text-center" />
          ),
          h2: (props) => (
            <TypographyH2 {...props} className="mb-3 text-center" />
          ),
          p: (props) => <TypographyP {...props} className="mb-4 leading-relaxed" />,
          ul: (props) => (
            <ul {...props} className="list-disc pl-6 mb-4 space-y-1" />
          ),
          ol: (props) => (
            <ol {...props} className="list-decimal pl-6 mb-4 space-y-1" />
          ),
          li: (props) => <li {...props} className="leading-relaxed" />,
          a: (props) => (
            <a {...props} className="text-primary underline hover:text-primary/80 transition-colors" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}