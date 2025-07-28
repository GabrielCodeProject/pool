import { render, screen } from '@testing-library/react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from './breadcrumb';

describe('Breadcrumb Components', () => {
  describe('Breadcrumb', () => {
    it('renders breadcrumb nav with proper accessibility', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );

      const nav = document.querySelector('[data-slot="breadcrumb"]');
      expect(nav).toBeInTheDocument();
      expect(nav?.tagName).toBe('NAV');
      expect(nav).toHaveAttribute('aria-label', 'breadcrumb');
    });
  });

  describe('BreadcrumbList', () => {
    it('renders ordered list with proper styling', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );

      const list = document.querySelector('[data-slot="breadcrumb-list"]');
      expect(list).toBeInTheDocument();
      expect(list?.tagName).toBe('OL');
      expect(list).toHaveClass('text-muted-foreground', 'flex', 'flex-wrap', 'items-center');
    });

    it('applies custom className', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList className="custom-list">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );

      const list = document.querySelector('[data-slot="breadcrumb-list"]');
      expect(list).toHaveClass('custom-list');
    });
  });

  describe('BreadcrumbItem', () => {
    it('renders list item with correct styling', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );

      const item = document.querySelector('[data-slot="breadcrumb-item"]');
      expect(item).toBeInTheDocument();
      expect(item?.tagName).toBe('LI');
      expect(item).toHaveClass('inline-flex', 'items-center', 'gap-1.5');
    });
  });

  describe('BreadcrumbLink', () => {
    it('renders as anchor element by default', () => {
      render(
        <BreadcrumbLink href="/test">
          Test Link
        </BreadcrumbLink>
      );

      const link = screen.getByText('Test Link');
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/test');
      expect(link).toHaveClass('hover:text-foreground', 'transition-colors');
    });

    it('renders with Slot when asChild is true', () => {
      render(
        <BreadcrumbLink asChild>
          <button type="button">Custom Button</button>
        </BreadcrumbLink>
      );

      const button = screen.getByText('Custom Button');
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveClass('hover:text-foreground', 'transition-colors');
    });

    it('applies custom className', () => {
      render(
        <BreadcrumbLink href="/test" className="custom-link">
          Test Link
        </BreadcrumbLink>
      );

      const link = screen.getByText('Test Link');
      expect(link).toHaveClass('custom-link');
    });
  });

  describe('BreadcrumbPage', () => {
    it('renders current page with proper accessibility', () => {
      render(<BreadcrumbPage>Current Page</BreadcrumbPage>);

      const page = screen.getByText('Current Page');
      expect(page).toBeInTheDocument();
      expect(page.tagName).toBe('SPAN');
      expect(page).toHaveAttribute('role', 'link');
      expect(page).toHaveAttribute('aria-disabled', 'true');
      expect(page).toHaveAttribute('aria-current', 'page');
      expect(page).toHaveClass('text-foreground', 'font-normal');
    });

    it('applies custom className', () => {
      render(<BreadcrumbPage className="current-page">Current</BreadcrumbPage>);

      const page = screen.getByText('Current');
      expect(page).toHaveClass('current-page');
    });
  });

  describe('BreadcrumbSeparator', () => {
    it('renders separator with ChevronRight icon by default', () => {
      render(<BreadcrumbSeparator />);

      const separator = document.querySelector('[data-slot="breadcrumb-separator"]');
      expect(separator).toBeInTheDocument();
      expect(separator?.tagName).toBe('LI');
      expect(separator).toHaveAttribute('role', 'presentation');
      expect(separator).toHaveAttribute('aria-hidden', 'true');
      
      // Check for chevron icon
      const icon = separator?.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders custom separator content', () => {
      render(<BreadcrumbSeparator>/</BreadcrumbSeparator>);

      const separator = screen.getByText('/');
      expect(separator).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<BreadcrumbSeparator className="custom-separator" />);

      const separator = document.querySelector('[data-slot="breadcrumb-separator"]');
      expect(separator).toHaveClass('custom-separator');
    });
  });

  describe('BreadcrumbEllipsis', () => {
    it('renders ellipsis with MoreHorizontal icon', () => {
      render(<BreadcrumbEllipsis />);

      const ellipsis = document.querySelector('[data-slot="breadcrumb-ellipsis"]');
      expect(ellipsis).toBeInTheDocument();
      expect(ellipsis?.tagName).toBe('SPAN');
      expect(ellipsis).toHaveAttribute('role', 'presentation');
      expect(ellipsis).toHaveAttribute('aria-hidden', 'true');
      expect(ellipsis).toHaveClass('flex', 'size-9', 'items-center', 'justify-center');
      
      // Check for more horizontal icon
      const icon = ellipsis?.querySelector('svg');
      expect(icon).toBeInTheDocument();
      
      // Check for screen reader text
      expect(screen.getByText('More')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<BreadcrumbEllipsis className="custom-ellipsis" />);

      const ellipsis = document.querySelector('[data-slot="breadcrumb-ellipsis"]');
      expect(ellipsis).toHaveClass('custom-ellipsis');
    });
  });

  describe('Complete Breadcrumb Example', () => {
    it('renders complete breadcrumb navigation', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Components</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Docs')).toBeInTheDocument();
      expect(screen.getByText('Components')).toBeInTheDocument();
      expect(screen.getByText('More')).toBeInTheDocument();
      
      // Check that we have the correct number of separators
      const separators = document.querySelectorAll('[data-slot="breadcrumb-separator"]');
      expect(separators).toHaveLength(3);
    });
  });

  describe('Accessibility', () => {
    it('maintains proper breadcrumb structure for screen readers', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );

      const nav = document.querySelector('nav[aria-label="breadcrumb"]');
      expect(nav).toBeInTheDocument();
      
      const currentPage = screen.getByText('Current');
      expect(currentPage).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('HTML Attributes', () => {
    it('passes through custom HTML attributes', () => {
      render(
        <Breadcrumb data-testid="custom-breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" id="home-link">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );

      const breadcrumb = screen.getByTestId('custom-breadcrumb');
      expect(breadcrumb).toBeInTheDocument();
      
      const homeLink = screen.getByText('Home');
      expect(homeLink).toHaveAttribute('id', 'home-link');
    });
  });
});