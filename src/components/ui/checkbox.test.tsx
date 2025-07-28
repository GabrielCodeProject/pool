import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './checkbox';

describe('Checkbox Component', () => {
  describe('Basic Rendering', () => {
    it('renders checkbox with correct styling', () => {
      render(<Checkbox />);

      const checkbox = document.querySelector('[data-slot="checkbox"]');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveClass(
        'peer',
        'size-4',
        'shrink-0',
        'rounded-[4px]',
        'border',
        'shadow-xs'
      );
    });

    it('renders with correct button role', () => {
      render(<Checkbox />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Checkbox className="custom-checkbox" />);

      const checkbox = document.querySelector('[data-slot="checkbox"]');
      expect(checkbox).toHaveClass('custom-checkbox');
    });
  });

  describe('States', () => {
    it('renders in unchecked state by default', () => {
      render(<Checkbox />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('data-state', 'unchecked');
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
    });

    it('supports checked state', () => {
      render(<Checkbox checked />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('data-state', 'checked');
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });

    it('supports defaultChecked for uncontrolled usage', () => {
      render(<Checkbox defaultChecked />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('data-state', 'checked');
    });

    it('supports indeterminate state', () => {
      render(<Checkbox checked="indeterminate" />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
      expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
    });

    it('supports disabled state', () => {
      render(<Checkbox disabled />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
      expect(checkbox).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
    });
  });

  describe('Check Indicator', () => {
    it('shows check icon when checked', () => {
      render(<Checkbox checked />);

      const indicator = document.querySelector('[data-slot="checkbox-indicator"]');
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveClass('flex', 'items-center', 'justify-center');

      const checkIcon = indicator?.querySelector('svg');
      expect(checkIcon).toBeInTheDocument();
    });

    it('hides indicator when unchecked', () => {
      render(<Checkbox checked={false} />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('data-state', 'unchecked');
    });

    it('shows indicator for indeterminate state', () => {
      render(<Checkbox checked="indeterminate" />);

      const indicator = document.querySelector('[data-slot="checkbox-indicator"]');
      expect(indicator).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('toggles state on click', () => {
      const handleCheckedChange = jest.fn();
      render(<Checkbox onCheckedChange={handleCheckedChange} />);

      const checkbox = screen.getByRole('checkbox');
      
      fireEvent.click(checkbox);
      expect(handleCheckedChange).toHaveBeenCalledWith(true);
      
      fireEvent.click(checkbox);
      expect(handleCheckedChange).toHaveBeenCalledWith(false);
    });

    it('handles keyboard interaction', () => {
      const handleCheckedChange = jest.fn();
      render(<Checkbox onCheckedChange={handleCheckedChange} />);

      const checkbox = screen.getByRole('checkbox');
      
      // Focus and press Space
      checkbox.focus();
      fireEvent.keyDown(checkbox, { key: ' ' });
      expect(handleCheckedChange).toHaveBeenCalledWith(true);
    });

    it('does not respond to clicks when disabled', () => {
      const handleCheckedChange = jest.fn();
      render(<Checkbox disabled onCheckedChange={handleCheckedChange} />);

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      
      expect(handleCheckedChange).not.toHaveBeenCalled();
    });
  });

  describe('Focus Management', () => {
    it('is focusable', () => {
      render(<Checkbox />);

      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      
      expect(checkbox).toHaveFocus();
    });

    it('has focus-visible styling', () => {
      render(<Checkbox />);

      const checkbox = document.querySelector('[data-slot="checkbox"]');
      expect(checkbox).toHaveClass(
        'focus-visible:border-ring',
        'focus-visible:ring-ring/50',
        'focus-visible:ring-[3px]'
      );
    });

    it('shows focus ring on keyboard focus', () => {
      render(<Checkbox />);

      const checkbox = screen.getByRole('checkbox');
      fireEvent.keyDown(checkbox, { key: 'Tab' });
      
      expect(checkbox).toHaveClass('outline-none');
    });
  });

  describe('Styling Variants', () => {
    it('has proper checked state styling', () => {
      render(<Checkbox checked />);

      const checkbox = document.querySelector('[data-slot="checkbox"]');
      expect(checkbox).toHaveClass(
        'data-[state=checked]:bg-primary',
        'data-[state=checked]:text-primary-foreground',
        'data-[state=checked]:border-primary'
      );
    });

    it('has proper unchecked state styling', () => {
      render(<Checkbox />);

      const checkbox = document.querySelector('[data-slot="checkbox"]');
      expect(checkbox).toHaveClass('border-input');
    });

    it('supports dark mode styling', () => {
      render(<Checkbox />);

      const checkbox = document.querySelector('[data-slot="checkbox"]');
      expect(checkbox).toHaveClass('dark:bg-input/30');
    });
  });

  describe('Form Integration', () => {
    it('works with form submission', () => {
      const handleSubmit = jest.fn();
      
      render(
        <form onSubmit={handleSubmit}>
          <Checkbox name="test-checkbox" value="checkbox-value" />
          <button type="submit">Submit</button>
        </form>
      );

      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('supports required attribute', () => {
      render(<Checkbox required />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeRequired();
    });

    it('supports form validation states', () => {
      render(<Checkbox aria-invalid />);

      const checkbox = document.querySelector('[data-slot="checkbox"]');
      expect(checkbox).toHaveClass(
        'aria-invalid:ring-destructive/20',
        'aria-invalid:border-destructive'
      );
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Checkbox aria-label="Accept terms" />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-label', 'Accept terms');
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <Checkbox aria-describedby="checkbox-description" />
          <div id="checkbox-description">This is a checkbox description</div>
        </>
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-describedby', 'checkbox-description');
    });

    it('supports proper labeling with external label', () => {
      render(
        <>
          <label htmlFor="checkbox-id">Checkbox Label</label>
          <Checkbox id="checkbox-id" />
        </>
      );

      const checkbox = screen.getByRole('checkbox');
      const label = screen.getByText('Checkbox Label');
      
      expect(checkbox).toHaveAttribute('id', 'checkbox-id');
      expect(label).toHaveAttribute('for', 'checkbox-id');
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component', () => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <Checkbox checked={false} onCheckedChange={handleChange} />
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'false');

      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith(true);

      // Rerender with new checked state
      rerender(<Checkbox checked={true} onCheckedChange={handleChange} />);
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });

    it('works as uncontrolled component', () => {
      render(<Checkbox defaultChecked={false} />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'false');

      fireEvent.click(checkbox);
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Error States', () => {
    it('applies error styling with aria-invalid', () => {
      render(<Checkbox aria-invalid="true" />);

      const checkbox = document.querySelector('[data-slot="checkbox"]');
      expect(checkbox).toHaveClass('aria-invalid:border-destructive');
    });

    it('supports custom error styling', () => {
      render(<Checkbox className="border-red-500" />);

      const checkbox = document.querySelector('[data-slot="checkbox"]');
      expect(checkbox).toHaveClass('border-red-500');
    });
  });

  describe('HTML Attributes', () => {
    it('passes through custom HTML attributes', () => {
      render(
        <Checkbox 
          data-testid="custom-checkbox"
          id="custom-id"
          name="custom-name"
          value="custom-value"
        />
      );

      const checkbox = screen.getByTestId('custom-checkbox');
      expect(checkbox).toHaveAttribute('id', 'custom-id');
      expect(checkbox).toHaveAttribute('name', 'custom-name');
      expect(checkbox).toHaveAttribute('value', 'custom-value');
    });

    it('supports ref forwarding', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Checkbox ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid clicking', () => {
      const handleChange = jest.fn();
      render(<Checkbox onCheckedChange={handleChange} />);

      const checkbox = screen.getByRole('checkbox');
      
      // Rapid clicks
      fireEvent.click(checkbox);
      fireEvent.click(checkbox);
      fireEvent.click(checkbox);
      
      expect(handleChange).toHaveBeenCalledTimes(3);
    });

    it('maintains state consistency', () => {
      const { rerender } = render(<Checkbox checked={false} />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('data-state', 'unchecked');

      rerender(<Checkbox checked={true} />);
      expect(checkbox).toHaveAttribute('data-state', 'checked');

      rerender(<Checkbox checked="indeterminate" />);
      expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
    });
  });
});