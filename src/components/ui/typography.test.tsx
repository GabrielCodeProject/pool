import { render, screen } from '@testing-library/react';
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyH6,
  TypographyP,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyBlockquote,
  TypographyInlineCode,
  TypographyList,
  TypographyCaption,
  TypographySubtle,
} from './typography';

describe('Typography Components', () => {
  describe('Heading Components', () => {
    it('renders TypographyH1 with correct HTML element and styles', () => {
      render(<TypographyH1>Test Heading 1</TypographyH1>);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Test Heading 1');
      expect(heading).toHaveClass('scroll-m-20', 'text-4xl', 'font-bold', 'tracking-tight', 'leading-tight', 'mb-6');
    });

    it('renders TypographyH2 with correct HTML element and styles', () => {
      render(<TypographyH2>Test Heading 2</TypographyH2>);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Test Heading 2');
      expect(heading).toHaveClass('scroll-m-20', 'text-2xl', 'font-bold', 'tracking-tight', 'leading-tight', 'mb-4');
    });

    it('renders TypographyH3 with correct HTML element and styles', () => {
      render(<TypographyH3>Test Heading 3</TypographyH3>);
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Test Heading 3');
      expect(heading).toHaveClass('scroll-m-20', 'text-xl', 'font-semibold', 'tracking-tight', 'leading-snug', 'mb-3');
    });

    it('renders TypographyH4 with correct HTML element and styles', () => {
      render(<TypographyH4>Test Heading 4</TypographyH4>);
      const heading = screen.getByRole('heading', { level: 4 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Test Heading 4');
      expect(heading).toHaveClass('scroll-m-20', 'text-lg', 'font-semibold', 'tracking-tight', 'leading-snug', 'mb-3');
    });

    it('renders TypographyH5 with correct HTML element and styles', () => {
      render(<TypographyH5>Test Heading 5</TypographyH5>);
      const heading = screen.getByRole('heading', { level: 5 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Test Heading 5');
      expect(heading).toHaveClass('scroll-m-20', 'text-base', 'font-medium', 'tracking-tight', 'leading-normal', 'mb-2');
    });

    it('renders TypographyH6 with correct HTML element and styles', () => {
      render(<TypographyH6>Test Heading 6</TypographyH6>);
      const heading = screen.getByRole('heading', { level: 6 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Test Heading 6');
      expect(heading).toHaveClass('scroll-m-20', 'text-sm', 'font-medium', 'tracking-tight', 'text-muted-foreground', 'leading-normal', 'mb-2');
    });
  });

  describe('Text Components', () => {
    it('renders TypographyP with correct HTML element and styles', () => {
      render(<TypographyP>Test paragraph text</TypographyP>);
      const paragraph = screen.getByText('Test paragraph text');
      expect(paragraph).toBeInTheDocument();
      expect(paragraph.tagName).toBe('P');
      expect(paragraph).toHaveClass('leading-7');
    });

    it('renders TypographyLead with correct styles', () => {
      render(<TypographyLead>Test lead text</TypographyLead>);
      const lead = screen.getByText('Test lead text');
      expect(lead).toBeInTheDocument();
      expect(lead.tagName).toBe('P');
      expect(lead).toHaveClass('text-xl', 'text-muted-foreground', 'leading-relaxed', 'mb-4');
    });

    it('renders TypographyLarge with correct styles', () => {
      render(<TypographyLarge>Test large text</TypographyLarge>);
      const large = screen.getByText('Test large text');
      expect(large).toBeInTheDocument();
      expect(large.tagName).toBe('DIV');
      expect(large).toHaveClass('text-lg', 'font-semibold', 'leading-normal', 'mb-2');
    });

    it('renders TypographySmall with correct HTML element and styles', () => {
      render(<TypographySmall>Test small text</TypographySmall>);
      const small = screen.getByText('Test small text');
      expect(small).toBeInTheDocument();
      expect(small.tagName).toBe('SMALL');
      expect(small).toHaveClass('text-sm', 'font-medium', 'leading-tight', 'mb-1');
    });

    it('renders TypographyMuted with correct styles', () => {
      render(<TypographyMuted>Test muted text</TypographyMuted>);
      const muted = screen.getByText('Test muted text');
      expect(muted).toBeInTheDocument();
      expect(muted.tagName).toBe('P');
      expect(muted).toHaveClass('text-sm', 'text-muted-foreground', 'leading-relaxed', 'mb-2');
    });

    it('renders TypographySubtle with correct HTML element and styles', () => {
      render(<TypographySubtle>Test subtle text</TypographySubtle>);
      const subtle = screen.getByText('Test subtle text');
      expect(subtle).toBeInTheDocument();
      expect(subtle.tagName).toBe('SPAN');
      expect(subtle).toHaveClass('text-sm', 'text-muted-foreground', 'font-normal', 'leading-relaxed');
    });
  });

  describe('Special Content Components', () => {
    it('renders TypographyBlockquote with correct HTML element and styles', () => {
      render(<TypographyBlockquote>Test blockquote</TypographyBlockquote>);
      const blockquote = screen.getByText('Test blockquote');
      expect(blockquote).toBeInTheDocument();
      expect(blockquote.tagName).toBe('BLOCKQUOTE');
      expect(blockquote).toHaveClass('mt-6', 'mb-6', 'border-l-2', 'pl-6', 'italic', 'leading-relaxed');
    });

    it('renders TypographyInlineCode with correct HTML element and styles', () => {
      render(<TypographyInlineCode>console.log()</TypographyInlineCode>);
      const code = screen.getByText('console.log()');
      expect(code).toBeInTheDocument();
      expect(code.tagName).toBe('CODE');
      expect(code).toHaveClass('relative', 'rounded', 'bg-muted', 'font-mono', 'text-sm', 'font-semibold', 'leading-none');
    });

    it('renders TypographyList with correct HTML element and styles', () => {
      render(
        <TypographyList>
          <li>Item 1</li>
          <li>Item 2</li>
        </TypographyList>
      );
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      expect(list.tagName).toBe('UL');
      expect(list).toHaveClass('my-6', 'ml-6', 'list-disc');
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('renders TypographyCaption with correct styles', () => {
      render(<TypographyCaption>Test caption</TypographyCaption>);
      const caption = screen.getByText('Test caption');
      expect(caption).toBeInTheDocument();
      expect(caption.tagName).toBe('P');
      expect(caption).toHaveClass('text-xs', 'text-muted-foreground', 'text-center', 'mt-2', 'mb-4', 'leading-tight');
    });
  });

  describe('Custom Class Names', () => {
    it('applies custom className to TypographyH1', () => {
      render(<TypographyH1 className="custom-class">Test</TypographyH1>);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('custom-class');
    });

    it('applies custom className to TypographyP', () => {
      render(<TypographyP className="custom-paragraph">Test</TypographyP>);
      const paragraph = screen.getByText('Test');
      expect(paragraph).toHaveClass('custom-paragraph');
    });

    it('applies custom className to TypographyInlineCode', () => {
      render(<TypographyInlineCode className="custom-code">test()</TypographyInlineCode>);
      const code = screen.getByText('test()');
      expect(code).toHaveClass('custom-code');
    });
  });

  describe('HTML Attributes', () => {
    it('passes through HTML attributes to TypographyH1', () => {
      render(<TypographyH1 id="main-title" data-testid="heading">Test</TypographyH1>);
      const heading = screen.getByTestId('heading');
      expect(heading).toHaveAttribute('id', 'main-title');
    });

    it('passes through HTML attributes to TypographyP', () => {
      render(<TypographyP role="note" aria-label="Important note">Test</TypographyP>);
      const paragraph = screen.getByRole('note');
      expect(paragraph).toHaveAttribute('aria-label', 'Important note');
    });

    it('passes through HTML attributes to TypographyBlockquote', () => {
      render(<TypographyBlockquote cite="https://example.com">Quote</TypographyBlockquote>);
      const blockquote = screen.getByText('Quote');
      expect(blockquote).toHaveAttribute('cite', 'https://example.com');
    });
  });

  describe('Accessibility', () => {
    it('maintains proper heading hierarchy', () => {
      render(
        <div>
          <TypographyH1>Main Title</TypographyH1>
          <TypographyH2>Section Title</TypographyH2>
          <TypographyH3>Subsection Title</TypographyH3>
        </div>
      );
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Title');
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Section Title');
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Subsection Title');
    });

    it('supports semantic HTML structure', () => {
      render(
        <article>
          <TypographyH1>Article Title</TypographyH1>
          <TypographyP>Article content</TypographyP>
          <TypographyBlockquote>Important quote</TypographyBlockquote>
        </article>
      );
      
      const article = screen.getByRole('article');
      expect(article).toContainElement(screen.getByRole('heading', { level: 1 }));
      expect(article).toContainElement(screen.getByText('Article content'));
      expect(article).toContainElement(screen.getByText('Important quote'));
    });
  });
});