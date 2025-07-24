import { render, screen, fireEvent } from '@testing-library/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select';

describe('Select Components', () => {
  describe('Select', () => {
    it('renders select container', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="item1">Item 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const select = document.querySelector('[data-slot="select"]');
      expect(select).toBeInTheDocument();
    });

    it('supports controlled state', () => {
      const handleValueChange = jest.fn();
      
      render(
        <Select value="controlled" onValueChange={handleValueChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="controlled">Controlled Item</SelectItem>
            <SelectItem value="other">Other Item</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-state', 'closed');
    });

    it('supports uncontrolled state with defaultValue', () => {
      render(
        <Select defaultValue="default">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default Item</SelectItem>
            <SelectItem value="other">Other Item</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeInTheDocument();
    });
  });

  describe('SelectTrigger', () => {
    it('renders trigger with correct styling', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = document.querySelector('[data-slot="select-trigger"]');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveClass(
        'flex',
        'items-center',
        'justify-between',
        'rounded-md',
        'border',
        'px-3',
        'py-2'
      );
    });

    it('supports different sizes', () => {
      const { rerender } = render(
        <Select>
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>
      );

      let trigger = document.querySelector('[data-slot="select-trigger"]');
      expect(trigger).toHaveAttribute('data-size', 'sm');

      rerender(
        <Select>
          <SelectTrigger size="default">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>
      );

      trigger = document.querySelector('[data-slot="select-trigger"]');
      expect(trigger).toHaveAttribute('data-size', 'default');
    });

    it('shows chevron down icon', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = document.querySelector('[data-slot="select-trigger"]');
      const chevron = trigger?.querySelector('svg');
      expect(chevron).toBeInTheDocument();
    });

    it('opens select on click', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Click to open" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test Item</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);
      
      expect(screen.getByText('Test Item')).toBeInTheDocument();
    });
  });

  describe('SelectValue', () => {
    it('displays placeholder when no value selected', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByText('Choose option')).toBeInTheDocument();
    });

    it('displays selected value', () => {
      render(
        <Select defaultValue="selected">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="selected">Selected Item</SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByText('Selected Item')).toBeInTheDocument();
    });
  });

  describe('SelectContent', () => {
    it('renders content with proper styling', () => {
      render(
        <Select defaultOpen>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test Item</SelectItem>
          </SelectContent>
        </Select>
      );

      const content = document.querySelector('[data-slot="select-content"]');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass(
        'bg-popover',
        'text-popover-foreground',
        'z-50',
        'rounded-md',
        'border',
        'shadow-md'
      );
    });

    it('supports different positions', () => {
      const { rerender } = render(
        <Select defaultOpen>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>
      );

      let content = document.querySelector('[data-slot="select-content"]');
      expect(content).toBeInTheDocument();

      rerender(
        <Select defaultOpen>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="item-aligned">
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>
      );

      content = document.querySelector('[data-slot="select-content"]');
      expect(content).toBeInTheDocument();
    });

    it('includes scroll buttons', () => {
      render(
        <Select defaultOpen>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>
      );

      const scrollUp = document.querySelector('[data-slot="select-scroll-up-button"]');
      const scrollDown = document.querySelector('[data-slot="select-scroll-down-button"]');
      
      expect(scrollUp).toBeInTheDocument();
      expect(scrollDown).toBeInTheDocument();
    });
  });

  describe('SelectItem', () => {
    it('renders item with correct styling', () => {
      render(
        <Select defaultOpen>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test-item">Test Item</SelectItem>
          </SelectContent>
        </Select>
      );

      const item = document.querySelector('[data-slot="select-item"]');
      expect(item).toBeInTheDocument();
      expect(item).toHaveClass(
        'relative',
        'flex',
        'w-full',
        'cursor-default',
        'items-center',
        'rounded-sm'
      );
      expect(screen.getByText('Test Item')).toBeInTheDocument();
    });

    it('shows check indicator when selected', () => {
      render(
        <Select defaultValue="selected" defaultOpen>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="selected">Selected Item</SelectItem>
            <SelectItem value="other">Other Item</SelectItem>
          </SelectContent>
        </Select>
      );

      const selectedItem = screen.getByText('Selected Item').closest('[data-slot="select-item"]');
      const checkIcon = selectedItem?.querySelector('svg');
      expect(checkIcon).toBeInTheDocument();
    });

    it('selects item on click', () => {
      const handleValueChange = jest.fn();
      
      render(
        <Select onValueChange={handleValueChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="clickable">Clickable Item</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);
      
      const item = screen.getByText('Clickable Item');
      fireEvent.click(item);
      
      expect(handleValueChange).toHaveBeenCalledWith('clickable');
    });

    it('supports disabled state', () => {
      render(
        <Select defaultOpen>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="disabled" disabled>
              Disabled Item
            </SelectItem>
          </SelectContent>
        </Select>
      );

      const item = screen.getByText('Disabled Item');
      expect(item.closest('[data-slot="select-item"]')).toHaveAttribute(
        'data-disabled',
        ''
      );
    });
  });

  describe('SelectGroup and SelectLabel', () => {
    it('renders group with label', () => {
      render(
        <Select defaultOpen>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Group Label</SelectLabel>
              <SelectItem value="item1">Item 1</SelectItem>
              <SelectItem value="item2">Item 2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );

      const group = document.querySelector('[data-slot="select-group"]');
      const label = document.querySelector('[data-slot="select-label"]');
      
      expect(group).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(screen.getByText('Group Label')).toBeInTheDocument();
    });
  });

  describe('SelectSeparator', () => {
    it('renders separator between items', () => {
      render(
        <Select defaultOpen>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="item1">Item 1</SelectItem>
            <SelectSeparator />
            <SelectItem value="item2">Item 2</SelectItem>
          </SelectContent>
        </Select>
      );

      const separator = document.querySelector('[data-slot="select-separator"]');
      expect(separator).toBeInTheDocument();
      expect(separator).toHaveClass('bg-border', 'h-px');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Accessible select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="accessible">Accessible Item</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('supports keyboard navigation', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="first">First Item</SelectItem>
            <SelectItem value="second">Second Item</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      
      // Focus and open with Enter
      trigger.focus();
      fireEvent.keyDown(trigger, { key: 'Enter' });
      
      expect(screen.getByText('First Item')).toBeInTheDocument();
      
      // Navigate down with arrow key
      fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
      
      // Select with Enter
      fireEvent.keyDown(document.activeElement!, { key: 'Enter' });
      
      expect(screen.getByText('Second Item')).toBeInTheDocument();
    });

    it('connects trigger to content with ARIA', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="connected">Connected Item</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-controls');
    });
  });

  describe('Form Integration', () => {
    it('works with form submission', () => {
      const handleSubmit = jest.fn();
      
      render(
        <form onSubmit={handleSubmit}>
          <Select name="test-select" defaultValue="form-value">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="form-value">Form Value</SelectItem>
            </SelectContent>
          </Select>
          <button type="submit">Submit</button>
        </form>
      );

      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  describe('Complex Select Usage', () => {
    it('handles large number of items with scroll', () => {
      const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
      
      render(
        <Select defaultOpen>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {items.map((item, index) => (
              <SelectItem key={index} value={`item-${index}`}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 50')).toBeInTheDocument();
    });

    it('handles grouped items', () => {
      render(
        <Select defaultOpen>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Vegetables</SelectLabel>
              <SelectItem value="carrot">Carrot</SelectItem>
              <SelectItem value="lettuce">Lettuce</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );

      expect(screen.getByText('Fruits')).toBeInTheDocument();
      expect(screen.getByText('Vegetables')).toBeInTheDocument();
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Carrot')).toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    it('passes through custom HTML attributes', () => {
      render(
        <Select data-testid="custom-select">
          <SelectTrigger data-testid="custom-trigger">
            <SelectValue />
          </SelectTrigger>
          <SelectContent data-testid="custom-content">
            <SelectItem value="custom" data-testid="custom-item">
              Custom Item
            </SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByTestId('custom-trigger')).toBeInTheDocument();
    });
  });
});