import { render, screen } from '@testing-library/react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from './navigation-menu';

describe('NavigationMenu Components', () => {
  describe('NavigationMenu', () => {
    it('renders navigation menu with proper structure', () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Test Menu</NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );

      const menu = screen.getByText('Test Menu').closest('[data-slot="navigation-menu"]');
      expect(menu).toBeInTheDocument();
      expect(menu).toHaveClass('group/navigation-menu', 'relative', 'flex');
    });

    it('renders without viewport when viewport=false', () => {
      render(
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Test</NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );

      const viewport = document.querySelector('[data-slot="navigation-menu-viewport"]');
      expect(viewport).not.toBeInTheDocument();
    });
  });

  describe('NavigationMenuList', () => {
    it('renders list with correct styling', () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );

      const list = document.querySelector('[data-slot="navigation-menu-list"]');
      expect(list).toBeInTheDocument();
      expect(list).toHaveClass('group', 'flex', 'list-none', 'items-center');
    });
  });

  describe('NavigationMenuItem', () => {
    it('renders menu item with proper structure', () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Test Item</NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );

      const item = document.querySelector('[data-slot="navigation-menu-item"]');
      expect(item).toBeInTheDocument();
      expect(item).toHaveClass('relative');
    });
  });

  describe('NavigationMenuTrigger', () => {
    it('renders trigger with chevron icon', () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Trigger Test</NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );

      const trigger = screen.getByText('Trigger Test');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveClass('group', 'inline-flex', 'items-center');
      
      // Check for chevron icon
      const chevron = trigger.querySelector('svg');
      expect(chevron).toBeInTheDocument();
    });

    it('applies navigationMenuTriggerStyle correctly', () => {
      const { container } = render(
        <div className={navigationMenuTriggerStyle()}>
          Test Style
        </div>
      );

      const element = container.firstChild;
      expect(element).toHaveClass('group', 'inline-flex', 'h-9', 'w-max');
    });
  });

  describe('NavigationMenuContent', () => {
    it('renders content with proper styling', () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Test</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>Content goes here</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );

      const content = document.querySelector('[data-slot="navigation-menu-content"]');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass('top-0', 'left-0', 'w-full');
      expect(screen.getByText('Content goes here')).toBeInTheDocument();
    });
  });

  describe('NavigationMenuLink', () => {
    it('renders link with proper styling', () => {
      render(
        <NavigationMenuLink href="/test">
          Test Link
        </NavigationMenuLink>
      );

      const link = screen.getByText('Test Link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass('flex', 'flex-col', 'gap-1', 'rounded-sm');
      expect(link).toHaveAttribute('href', '/test');
    });

    it('handles custom className', () => {
      render(
        <NavigationMenuLink className="custom-class">
          Test Link
        </NavigationMenuLink>
      );

      const link = screen.getByText('Test Link');
      expect(link).toHaveClass('custom-class');
    });
  });

  describe('NavigationMenuIndicator', () => {
    it('renders indicator with arrow shape', () => {
      render(<NavigationMenuIndicator />);
      
      const indicator = document.querySelector('[data-slot="navigation-menu-indicator"]');
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveClass('top-full', 'z-[1]', 'flex');
      
      // Check for arrow element
      const arrow = indicator?.querySelector('div');
      expect(arrow).toBeInTheDocument();
      expect(arrow).toHaveClass('bg-border', 'rotate-45', 'rounded-tl-sm');
    });
  });

  describe('NavigationMenuViewport', () => {
    it('renders viewport with proper structure', () => {
      render(<NavigationMenuViewport />);
      
      const viewport = document.querySelector('[data-slot="navigation-menu-viewport"]');
      expect(viewport).toBeInTheDocument();
      expect(viewport).toHaveClass('bg-popover', 'relative', 'overflow-hidden');
    });
  });

  describe('Accessibility', () => {
    it('supports keyboard navigation', () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Accessible Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/test">
                  Test Link
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );

      const trigger = screen.getByText('Accessible Menu');
      expect(trigger).toHaveAttribute('type', 'button');
      
      // Test focus
      trigger.focus();
      expect(trigger).toHaveFocus();
    });

    it('has proper ARIA attributes', () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>ARIA Test</NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );

      const trigger = screen.getByText('ARIA Test');
      expect(trigger).toHaveAttribute('aria-expanded');
    });
  });

  describe('Custom Props', () => {
    it('passes through custom HTML attributes', () => {
      render(
        <NavigationMenu data-testid="custom-nav">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger id="custom-trigger">
                Custom Props
              </NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );

      const nav = screen.getByTestId('custom-nav');
      expect(nav).toBeInTheDocument();
      
      const trigger = screen.getByText('Custom Props');
      expect(trigger).toHaveAttribute('id', 'custom-trigger');
    });
  });
});