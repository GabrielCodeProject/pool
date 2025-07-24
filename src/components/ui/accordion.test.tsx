import { render, screen, fireEvent } from '@testing-library/react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './accordion';

describe('Accordion Components', () => {
  describe('Accordion', () => {
    it('renders accordion container', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Test Item</AccordionTrigger>
            <AccordionContent>Test Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const accordion = document.querySelector('[data-slot="accordion"]');
      expect(accordion).toBeInTheDocument();
    });

    it('supports single type accordion', () => {
      render(
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Item 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    it('supports multiple type accordion', () => {
      render(
        <Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Item 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });

  describe('AccordionItem', () => {
    it('renders accordion item with border styling', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="test-item">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const item = document.querySelector('[data-slot="accordion-item"]');
      expect(item).toBeInTheDocument();
      expect(item).toHaveClass('border-b', 'last:border-b-0');
    });

    it('applies custom className', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="custom-item" className="custom-item-class">
            <AccordionTrigger>Custom</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const item = document.querySelector('[data-slot="accordion-item"]');
      expect(item).toHaveClass('custom-item-class');
    });
  });

  describe('AccordionTrigger', () => {
    it('renders trigger button with chevron icon', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="trigger-test">
            <AccordionTrigger>Trigger Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByText('Trigger Test');
      expect(trigger).toBeInTheDocument();
      expect(trigger.tagName).toBe('BUTTON');
      expect(trigger).toHaveClass('flex', 'flex-1', 'items-start', 'justify-between');

      // Check for chevron icon
      const chevron = trigger.querySelector('svg');
      expect(chevron).toBeInTheDocument();
    });

    it('toggles content on click', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="toggle-test">
            <AccordionTrigger>Toggle Test</AccordionTrigger>
            <AccordionContent>Toggle Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByText('Toggle Test');
      
      // Initially closed
      expect(screen.queryByText('Toggle Content')).not.toBeInTheDocument();
      
      // Click to open
      fireEvent.click(trigger);
      expect(screen.getByText('Toggle Content')).toBeInTheDocument();
      
      // Click to close
      fireEvent.click(trigger);
      expect(screen.queryByText('Toggle Content')).not.toBeInTheDocument();
    });

    it('rotates chevron icon when expanded', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="rotation-test">
            <AccordionTrigger>Rotation Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByText('Rotation Test');
      expect(trigger).toHaveClass('[&[data-state=open]>svg]:rotate-180');
    });

    it('applies custom className', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="custom-trigger">
            <AccordionTrigger className="custom-trigger-class">
              Custom Trigger
            </AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByText('Custom Trigger');
      expect(trigger).toHaveClass('custom-trigger-class');
    });
  });

  describe('AccordionContent', () => {
    it('renders content with proper styling', () => {
      render(
        <Accordion type="single" collapsible defaultValue="content-test">
          <AccordionItem value="content-test">
            <AccordionTrigger>Content Test</AccordionTrigger>
            <AccordionContent>Test Content Here</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const content = document.querySelector('[data-slot="accordion-content"]');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass('overflow-hidden', 'text-sm');
      expect(screen.getByText('Test Content Here')).toBeInTheDocument();
    });

    it('has smooth animation classes', () => {
      render(
        <Accordion type="single" collapsible defaultValue="animation-test">
          <AccordionItem value="animation-test">
            <AccordionTrigger>Animation Test</AccordionTrigger>
            <AccordionContent>Animated Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const content = document.querySelector('[data-slot="accordion-content"]');
      expect(content).toHaveClass(
        'data-[state=closed]:animate-accordion-up',
        'data-[state=open]:animate-accordion-down'
      );
    });

    it('applies custom className to content wrapper', () => {
      render(
        <Accordion type="single" collapsible defaultValue="custom-content">
          <AccordionItem value="custom-content">
            <AccordionTrigger>Custom Content</AccordionTrigger>
            <AccordionContent className="custom-content-class">
              Custom Content
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const contentWrapper = screen.getByText('Custom Content').parentElement;
      expect(contentWrapper).toHaveClass('custom-content-class');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="aria-test">
            <AccordionTrigger>ARIA Test</AccordionTrigger>
            <AccordionContent>ARIA Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByText('ARIA Test');
      expect(trigger).toHaveAttribute('aria-expanded');
      expect(trigger).toHaveAttribute('aria-controls');
    });

    it('supports keyboard navigation', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="keyboard-test">
            <AccordionTrigger>Keyboard Test</AccordionTrigger>
            <AccordionContent>Keyboard Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByText('Keyboard Test');
      
      // Focus the trigger
      trigger.focus();
      expect(trigger).toHaveFocus();
      
      // Press Enter to toggle
      fireEvent.keyDown(trigger, { key: 'Enter' });
      expect(screen.getByText('Keyboard Content')).toBeInTheDocument();
    });

    it('connects triggers to content panels', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="connection-test">
            <AccordionTrigger>Connection Test</AccordionTrigger>
            <AccordionContent>Connected Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByText('Connection Test');
      const controlsId = trigger.getAttribute('aria-controls');
      
      if (controlsId) {
        const content = document.getElementById(controlsId);
        expect(content).toBeInTheDocument();
      }
    });
  });

  describe('Complex Accordion Usage', () => {
    it('handles multiple items correctly', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Item 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Item 3</AccordionTrigger>
            <AccordionContent>Content 3</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const triggers = screen.getAllByRole('button');
      expect(triggers).toHaveLength(3);
      
      // Only one should be open at a time in single mode
      fireEvent.click(triggers[0]);
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      
      fireEvent.click(triggers[1]);
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('supports disabled state', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="disabled-test" disabled>
            <AccordionTrigger>Disabled Item</AccordionTrigger>
            <AccordionContent>Disabled Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByText('Disabled Item');
      expect(trigger).toBeDisabled();
    });
  });

  describe('HTML Attributes', () => {
    it('passes through custom HTML attributes', () => {
      render(
        <Accordion type="single" collapsible data-testid="custom-accordion">
          <AccordionItem value="attr-test" data-testid="custom-item">
            <AccordionTrigger data-testid="custom-trigger">
              Attribute Test
            </AccordionTrigger>
            <AccordionContent data-testid="custom-content">
              Attribute Content
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByTestId('custom-accordion')).toBeInTheDocument();
      expect(screen.getByTestId('custom-item')).toBeInTheDocument();
      expect(screen.getByTestId('custom-trigger')).toBeInTheDocument();
    });
  });
});