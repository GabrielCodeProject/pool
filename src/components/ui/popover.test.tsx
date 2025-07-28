import { render, screen, fireEvent } from '@testing-library/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from './popover';

describe('Popover Components', () => {
  describe('Popover', () => {
    it('renders popover container', () => {
      render(
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );

      const popover = document.querySelector('[data-slot="popover"]');
      expect(popover).toBeInTheDocument();
    });

    it('supports controlled state', () => {
      const handleOpenChange = jest.fn();
      
      render(
        <Popover open={true} onOpenChange={handleOpenChange}>
          <PopoverTrigger>Controlled Trigger</PopoverTrigger>
          <PopoverContent>Controlled Content</PopoverContent>
        </Popover>
      );

      expect(screen.getByText('Controlled Content')).toBeInTheDocument();
    });

    it('supports uncontrolled state', () => {
      render(
        <Popover defaultOpen={false}>
          <PopoverTrigger>Uncontrolled Trigger</PopoverTrigger>
          <PopoverContent>Uncontrolled Content</PopoverContent>
        </Popover>
      );

      // Content should not be visible initially
      expect(screen.queryByText('Uncontrolled Content')).not.toBeInTheDocument();
    });
  });

  describe('PopoverTrigger', () => {
    it('renders trigger element', () => {
      render(
        <Popover>
          <PopoverTrigger>Trigger Button</PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );

      const trigger = screen.getByText('Trigger Button');
      expect(trigger).toBeInTheDocument();
    });

    it('supports asChild prop through trigger', () => {
      render(
        <Popover>
          <PopoverTrigger asChild>
            <button type="button">Custom Button</button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Custom Button');
    });

    it('toggles popover on click', () => {
      render(
        <Popover>
          <PopoverTrigger>Toggle</PopoverTrigger>
          <PopoverContent>Toggle Content</PopoverContent>
        </Popover>
      );

      const trigger = screen.getByText('Toggle');
      
      // Initially closed
      expect(screen.queryByText('Toggle Content')).not.toBeInTheDocument();
      
      // Click to open
      fireEvent.click(trigger);
      expect(screen.getByText('Toggle Content')).toBeInTheDocument();
      
      // Click to close
      fireEvent.click(trigger);
      expect(screen.queryByText('Toggle Content')).not.toBeInTheDocument();
    });
  });

  describe('PopoverContent', () => {
    it('renders content with proper styling when open', () => {
      render(
        <Popover defaultOpen={true}>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>Styled Content</PopoverContent>
        </Popover>
      );

      const content = document.querySelector('[data-slot="popover-content"]');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass(
        'bg-popover',
        'text-popover-foreground',
        'z-50',
        'rounded-md',
        'border',
        'p-4',
        'shadow-md'
      );
    });

    it('applies custom className', () => {
      render(
        <Popover defaultOpen={true}>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent className="custom-content">
            Custom Content
          </PopoverContent>
        </Popover>
      );

      const content = document.querySelector('[data-slot="popover-content"]');
      expect(content).toHaveClass('custom-content');
    });

    it('supports different alignment options', () => {
      const { rerender } = render(
        <Popover defaultOpen={true}>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent align="start">Start Aligned</PopoverContent>
        </Popover>
      );

      let content = document.querySelector('[data-slot="popover-content"]');
      expect(content).toBeInTheDocument();

      rerender(
        <Popover defaultOpen={true}>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent align="end">End Aligned</PopoverContent>
        </Popover>
      );

      content = document.querySelector('[data-slot="popover-content"]');
      expect(content).toBeInTheDocument();
    });

    it('supports custom sideOffset', () => {
      render(
        <Popover defaultOpen={true}>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent sideOffset={12}>Offset Content</PopoverContent>
        </Popover>
      );

      const content = document.querySelector('[data-slot="popover-content"]');
      expect(content).toBeInTheDocument();
    });

    it('has animation classes', () => {
      render(
        <Popover defaultOpen={true}>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>Animated Content</PopoverContent>
        </Popover>
      );

      const content = document.querySelector('[data-slot="popover-content"]');
      expect(content).toHaveClass(
        'data-[state=open]:animate-in',
        'data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0',
        'data-[state=open]:fade-in-0'
      );
    });
  });

  describe('PopoverAnchor', () => {
    it('renders anchor element', () => {
      render(
        <Popover>
          <PopoverAnchor>
            <div data-testid="anchor">Anchor Element</div>
          </PopoverAnchor>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );

      const anchor = screen.getByTestId('anchor');
      expect(anchor).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Popover>
          <PopoverTrigger>ARIA Test</PopoverTrigger>
          <PopoverContent>ARIA Content</PopoverContent>
        </Popover>
      );

      const trigger = screen.getByText('ARIA Test');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    });

    it('updates ARIA attributes when opened', () => {
      render(
        <Popover>
          <PopoverTrigger>State Test</PopoverTrigger>
          <PopoverContent>State Content</PopoverContent>
        </Popover>
      );

      const trigger = screen.getByText('State Test');
      
      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('supports keyboard navigation', () => {
      render(
        <Popover>
          <PopoverTrigger>Keyboard Test</PopoverTrigger>
          <PopoverContent>Keyboard Content</PopoverContent>
        </Popover>
      );

      const trigger = screen.getByText('Keyboard Test');
      
      // Focus and press Enter
      trigger.focus();
      fireEvent.keyDown(trigger, { key: 'Enter' });
      expect(screen.getByText('Keyboard Content')).toBeInTheDocument();
      
      // Press Escape to close
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(screen.queryByText('Keyboard Content')).not.toBeInTheDocument();
    });

    it('manages focus properly', () => {
      render(
        <Popover>
          <PopoverTrigger>Focus Test</PopoverTrigger>
          <PopoverContent>
            <button type="button">Focusable Button</button>
          </PopoverContent>
        </Popover>
      );

      const trigger = screen.getByText('Focus Test');
      fireEvent.click(trigger);
      
      const button = screen.getByText('Focusable Button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Portal Rendering', () => {
    it('renders content in portal', () => {
      render(
        <Popover defaultOpen={true}>
          <PopoverTrigger>Portal Test</PopoverTrigger>
          <PopoverContent>Portal Content</PopoverContent>
        </Popover>
      );

      // Content should be rendered in document body via portal
      const content = screen.getByText('Portal Content');
      expect(content).toBeInTheDocument();
    });
  });

  describe('Position-based Animations', () => {
    it('has directional slide animations', () => {
      render(
        <Popover defaultOpen={true}>
          <PopoverTrigger>Animation Test</PopoverTrigger>
          <PopoverContent>Animation Content</PopoverContent>
        </Popover>
      );

      const content = document.querySelector('[data-slot="popover-content"]');
      expect(content).toHaveClass(
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2',
        'data-[side=top]:slide-in-from-bottom-2'
      );
    });
  });

  describe('Integration Tests', () => {
    it('handles complex popover with form content', () => {
      render(
        <Popover>
          <PopoverTrigger>Form Popover</PopoverTrigger>
          <PopoverContent>
            <form>
              <label>
                Name:
                <input type="text" name="name" />
              </label>
              <button type="submit">Submit</button>
            </form>
          </PopoverContent>
        </Popover>
      );

      const trigger = screen.getByText('Form Popover');
      fireEvent.click(trigger);
      
      const input = screen.getByLabelText('Name:');
      const submit = screen.getByText('Submit');
      
      expect(input).toBeInTheDocument();
      expect(submit).toBeInTheDocument();
    });

    it('closes on outside click', () => {
      render(
        <div>
          <Popover>
            <PopoverTrigger>Outside Click Test</PopoverTrigger>
            <PopoverContent>Outside Content</PopoverContent>
          </Popover>
          <div data-testid="outside">Outside Element</div>
        </div>
      );

      const trigger = screen.getByText('Outside Click Test');
      const outside = screen.getByTestId('outside');
      
      // Open popover
      fireEvent.click(trigger);
      expect(screen.getByText('Outside Content')).toBeInTheDocument();
      
      // Click outside to close
      fireEvent.mouseDown(outside);
      expect(screen.queryByText('Outside Content')).not.toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    it('passes through custom HTML attributes', () => {
      render(
        <Popover data-testid="custom-popover">
          <PopoverTrigger data-testid="custom-trigger">
            Custom Attributes
          </PopoverTrigger>
          <PopoverContent data-testid="custom-content">
            Custom Content
          </PopoverContent>
        </Popover>
      );

      expect(screen.getByTestId('custom-trigger')).toBeInTheDocument();
    });
  });
});