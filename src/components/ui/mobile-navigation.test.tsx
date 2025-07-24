import { render, screen, fireEvent } from '@testing-library/react';
import {
  MobileNavigation,
  MobileNavItem,
  MobileNavSection,
  MobileNavSeparator,
  ResponsiveNavigation,
} from './mobile-navigation';

// Mock the Sheet components since they're external dependencies
jest.mock('./sheet', () => ({
  Sheet: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet">{children}</div>,
  SheetTrigger: ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => 
    asChild ? children : <button data-testid="sheet-trigger">{children}</button>,
  SheetContent: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-content">{children}</div>,
  SheetHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-header">{children}</div>,
  SheetTitle: ({ children }: { children: React.ReactNode }) => <h2 data-testid="sheet-title">{children}</h2>,
  SheetClose: ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => 
    asChild ? children : <button data-testid="sheet-close">{children}</button>,
}));

// Mock the Collapsible components
jest.mock('./collapsible', () => ({
  Collapsible: ({ children, open, onOpenChange }: { children: React.ReactNode; open: boolean; onOpenChange: (open: boolean) => void }) => 
    <div data-testid="collapsible" data-open={open} onClick={() => onOpenChange(!open)}>{children}</div>,
  CollapsibleTrigger: ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => 
    asChild ? children : <button data-testid="collapsible-trigger">{children}</button>,
  CollapsibleContent: ({ children }: { children: React.ReactNode }) => 
    <div data-testid="collapsible-content">{children}</div>,
}));

// Mock the Button component
jest.mock('./button', () => ({
  Button: ({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: unknown }) => 
    <button className={className} {...props}>{children}</button>,
}));

describe('Mobile Navigation Components', () => {
  describe('MobileNavigation', () => {
    it('renders mobile navigation with hamburger menu', () => {
      render(
        <MobileNavigation>
          <MobileNavItem href="/test">Test Item</MobileNavItem>
        </MobileNavigation>
      );

      expect(screen.getByTestId('sheet')).toBeInTheDocument();
      expect(screen.getByTestId('sheet-trigger')).toBeInTheDocument();
      expect(screen.getByTestId('sheet-content')).toBeInTheDocument();
      expect(screen.getByText('Navigation')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <MobileNavigation className="custom-nav">
          <MobileNavItem href="/test">Test</MobileNavItem>
        </MobileNavigation>
      );

      const nav = document.querySelector('.custom-nav');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveClass('md:hidden');
    });

    it('has proper accessibility attributes', () => {
      render(
        <MobileNavigation>
          <MobileNavItem href="/test">Test</MobileNavItem>
        </MobileNavigation>
      );

      const trigger = screen.getByTestId('sheet-trigger');
      expect(trigger).toHaveAttribute('aria-label', 'Open navigation menu');
    });
  });

  describe('MobileNavItem', () => {
    it('renders as link when href is provided', () => {
      render(
        <MobileNavItem href="/test">
          Test Link
        </MobileNavItem>
      );

      const link = screen.getByText('Test Link');
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/test');
    });

    it('renders as button when href is not provided', () => {
      const handleClick = jest.fn();
      
      render(
        <MobileNavItem onClick={handleClick}>
          Test Button
        </MobileNavItem>
      );

      const button = screen.getByText('Test Button');
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
      
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      render(
        <MobileNavItem href="/test" className="custom-item">
          Test Item
        </MobileNavItem>
      );

      const item = screen.getByText('Test Item');
      expect(item).toHaveClass('custom-item');
    });

    it('has proper styling classes', () => {
      render(
        <MobileNavItem href="/test">
          Test Item
        </MobileNavItem>
      );

      const item = screen.getByText('Test Item');
      expect(item).toHaveClass('flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'text-sm');
    });
  });

  describe('MobileNavSection', () => {
    it('renders collapsible section with title', () => {
      render(
        <MobileNavSection title="Test Section">
          <MobileNavItem href="/test">Item</MobileNavItem>
        </MobileNavSection>
      );

      expect(screen.getByText('Test Section')).toBeInTheDocument();
      expect(screen.getByTestId('collapsible')).toBeInTheDocument();
      expect(screen.getByTestId('collapsible-content')).toBeInTheDocument();
    });

    it('handles defaultOpen prop', () => {
      render(
        <MobileNavSection title="Open Section" defaultOpen={true}>
          <MobileNavItem href="/test">Item</MobileNavItem>
        </MobileNavSection>
      );

      const collapsible = screen.getByTestId('collapsible');
      expect(collapsible).toHaveAttribute('data-open', 'true');
    });

    it('toggles open state on trigger click', () => {
      render(
        <MobileNavSection title="Toggle Section">
          <MobileNavItem href="/test">Item</MobileNavItem>
        </MobileNavSection>
      );

      const collapsible = screen.getByTestId('collapsible');
      expect(collapsible).toHaveAttribute('data-open', 'false');
      
      fireEvent.click(collapsible);
      expect(collapsible).toHaveAttribute('data-open', 'true');
    });

    it('renders children inside collapsible content', () => {
      render(
        <MobileNavSection title="Section with Items">
          <MobileNavItem href="/item1">Item 1</MobileNavItem>
          <MobileNavItem href="/item2">Item 2</MobileNavItem>
        </MobileNavSection>
      );

      const content = screen.getByTestId('collapsible-content');
      expect(content).toContainElement(screen.getByText('Item 1'));
      expect(content).toContainElement(screen.getByText('Item 2'));
    });
  });

  describe('MobileNavSeparator', () => {
    it('renders separator with proper styling', () => {
      render(<MobileNavSeparator />);

      const separator = document.querySelector('.border-t');
      expect(separator).toBeInTheDocument();
      expect(separator).toHaveClass('border-border', 'my-2');
    });

    it('applies custom className', () => {
      render(<MobileNavSeparator className="custom-separator" />);

      const separator = document.querySelector('.border-t');
      expect(separator).toHaveClass('custom-separator');
    });
  });

  describe('ResponsiveNavigation', () => {
    const desktopNav = <div data-testid="desktop-nav">Desktop Navigation</div>;
    const mobileNav = <div data-testid="mobile-nav">Mobile Navigation</div>;

    it('renders both desktop and mobile navigation', () => {
      render(
        <ResponsiveNavigation
          desktopNav={desktopNav}
          mobileNav={mobileNav}
        />
      );

      expect(screen.getByTestId('desktop-nav')).toBeInTheDocument();
      expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
    });

    it('applies responsive classes correctly', () => {
      render(
        <ResponsiveNavigation
          desktopNav={desktopNav}
          mobileNav={mobileNav}
        />
      );

      const desktopContainer = screen.getByTestId('desktop-nav').parentElement;
      const mobileContainer = screen.getByTestId('mobile-nav').parentElement;

      expect(desktopContainer).toHaveClass('hidden', 'md:flex');
      expect(mobileContainer).toHaveClass('md:hidden');
    });

    it('applies custom className', () => {
      render(
        <ResponsiveNavigation
          desktopNav={desktopNav}
          mobileNav={mobileNav}
          className="custom-responsive"
        />
      );

      const nav = document.querySelector('.custom-responsive');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveClass('flex', 'items-center', 'justify-between');
    });
  });

  describe('Integration Tests', () => {
    it('renders complex mobile navigation structure', () => {
      render(
        <MobileNavigation>
          <MobileNavItem href="/">Home</MobileNavItem>
          <MobileNavSeparator />
          <MobileNavSection title="Services" defaultOpen>
            <MobileNavItem href="/service1">Service 1</MobileNavItem>
            <MobileNavItem href="/service2">Service 2</MobileNavItem>
          </MobileNavSection>
          <MobileNavSeparator />
          <MobileNavItem href="/contact">Contact</MobileNavItem>
        </MobileNavigation>
      );

      // Check main structure
      expect(screen.getByText('Navigation')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('Service 1')).toBeInTheDocument();
      expect(screen.getByText('Service 2')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();

      // Check separators
      const separators = document.querySelectorAll('.border-t');
      expect(separators).toHaveLength(2);
    });

    it('handles complete responsive navigation setup', () => {
      const desktopNav = (
        <div data-testid="desktop-nav">
          <span>Home</span>
          <span>About</span>
        </div>
      );

      const mobileNav = (
        <MobileNavigation>
          <MobileNavItem href="/">Home</MobileNavItem>
          <MobileNavItem href="/about">About</MobileNavItem>
        </MobileNavigation>
      );

      render(
        <ResponsiveNavigation
          desktopNav={desktopNav}
          mobileNav={mobileNav}
        />
      );

      // Both navigation types should be present but with different visibility classes
      expect(screen.getByTestId('desktop-nav')).toBeInTheDocument();
      expect(screen.getByTestId('sheet')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('maintains proper focus management', () => {
      render(
        <MobileNavigation>
          <MobileNavItem href="/test">Test Link</MobileNavItem>
        </MobileNavigation>
      );

      const trigger = screen.getByTestId('sheet-trigger');
      const link = screen.getByText('Test Link');

      // Both elements should be focusable
      trigger.focus();
      expect(trigger).toHaveFocus();

      link.focus();
      expect(link).toHaveFocus();
    });

    it('has proper semantic structure', () => {
      render(
        <ResponsiveNavigation
          desktopNav={<div>Desktop</div>}
          mobileNav={<div>Mobile</div>}
        />
      );

      const nav = document.querySelector('nav');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveClass('flex', 'items-center', 'justify-between');
    });
  });
});