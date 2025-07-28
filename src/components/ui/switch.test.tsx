import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from './switch';

describe('Switch Component', () => {
  describe('Basic Rendering', () => {
    it('renders switch with correct styling', () => {
      render(<Switch />);

      const switchElement = document.querySelector('[data-slot="switch"]');
      expect(switchElement).toBeInTheDocument();
      expect(switchElement).toHaveClass(
        'peer',
        'inline-flex',
        'h-[1.15rem]',
        'w-8',
        'shrink-0',
        'items-center',
        'rounded-full',
        'shadow-xs'
      );
    });

    it('renders with switch role', () => {
      render(<Switch />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('renders thumb with correct styling', () => {
      render(<Switch />);

      const thumb = document.querySelector('[data-slot="switch-thumb"]');
      expect(thumb).toBeInTheDocument();
      expect(thumb).toHaveClass(
        'bg-background',
        'pointer-events-none',
        'block',
        'size-4',
        'rounded-full',
        'transition-transform'
      );
    });

    it('applies custom className', () => {
      render(<Switch className="custom-switch" />);

      const switchElement = document.querySelector('[data-slot="switch"]');
      expect(switchElement).toHaveClass('custom-switch');
    });
  });

  describe('States', () => {
    it('renders in unchecked state by default', () => {
      render(<Switch />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('data-state', 'unchecked');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('supports checked state', () => {
      render(<Switch checked />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('data-state', 'checked');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });

    it('supports defaultChecked for uncontrolled usage', () => {
      render(<Switch defaultChecked />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('data-state', 'checked');
    });

    it('supports disabled state', () => {
      render(<Switch disabled />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeDisabled();
      expect(switchElement).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
    });
  });

  describe('Visual States', () => {
    it('has correct styling for unchecked state', () => {
      render(<Switch />);

      const switchElement = document.querySelector('[data-slot="switch"]');
      expect(switchElement).toHaveClass('data-[state=unchecked]:bg-input');
    });

    it('has correct styling for checked state', () => {
      render(<Switch checked />);

      const switchElement = document.querySelector('[data-slot="switch"]');
      expect(switchElement).toHaveClass('data-[state=checked]:bg-primary');
    });

    it('thumb moves when checked', () => {
      render(<Switch checked />);

      const thumb = document.querySelector('[data-slot="switch-thumb"]');
      expect(thumb).toHaveClass('data-[state=checked]:translate-x-[calc(100%-2px)]');
    });

    it('thumb stays in place when unchecked', () => {
      render(<Switch />);

      const thumb = document.querySelector('[data-slot="switch-thumb"]');
      expect(thumb).toHaveClass('data-[state=unchecked]:translate-x-0');
    });
  });

  describe('Dark Mode Support', () => {
    it('has proper dark mode styling for unchecked state', () => {
      render(<Switch />);

      const switchElement = document.querySelector('[data-slot="switch"]');
      expect(switchElement).toHaveClass('dark:data-[state=unchecked]:bg-input/80');
    });

    it('has proper dark mode styling for thumb', () => {
      render(<Switch />);

      const thumb = document.querySelector('[data-slot="switch-thumb"]');
      expect(thumb).toHaveClass(
        'dark:data-[state=unchecked]:bg-foreground',
        'dark:data-[state=checked]:bg-primary-foreground'
      );
    });
  });

  describe('Interactions', () => {
    it('toggles state on click', () => {
      const handleCheckedChange = jest.fn();
      render(<Switch onCheckedChange={handleCheckedChange} />);

      const switchElement = screen.getByRole('switch');
      
      fireEvent.click(switchElement);
      expect(handleCheckedChange).toHaveBeenCalledWith(true);
      
      fireEvent.click(switchElement);
      expect(handleCheckedChange).toHaveBeenCalledWith(false);
    });

    it('handles keyboard interaction', () => {
      const handleCheckedChange = jest.fn();
      render(<Switch onCheckedChange={handleCheckedChange} />);

      const switchElement = screen.getByRole('switch');
      
      // Focus and press Space
      switchElement.focus();
      fireEvent.keyDown(switchElement, { key: ' ' });
      expect(handleCheckedChange).toHaveBeenCalledWith(true);
      
      // Press Enter
      fireEvent.keyDown(switchElement, { key: 'Enter' });
      expect(handleCheckedChange).toHaveBeenCalledWith(false);
    });

    it('does not respond to clicks when disabled', () => {
      const handleCheckedChange = jest.fn();
      render(<Switch disabled onCheckedChange={handleCheckedChange} />);

      const switchElement = screen.getByRole('switch');
      fireEvent.click(switchElement);
      
      expect(handleCheckedChange).not.toHaveBeenCalled();
    });
  });

  describe('Focus Management', () => {
    it('is focusable', () => {
      render(<Switch />);

      const switchElement = screen.getByRole('switch');
      switchElement.focus();
      
      expect(switchElement).toHaveFocus();
    });

    it('has focus-visible styling', () => {
      render(<Switch />);

      const switchElement = document.querySelector('[data-slot="switch"]');
      expect(switchElement).toHaveClass(
        'focus-visible:border-ring',
        'focus-visible:ring-ring/50',
        'focus-visible:ring-[3px]'
      );
    });

    it('shows focus ring on keyboard focus', () => {
      render(<Switch />);

      const switchElement = screen.getByRole('switch');
      fireEvent.keyDown(switchElement, { key: 'Tab' });
      
      expect(switchElement).toHaveClass('outline-none');
    });
  });

  describe('Animations', () => {
    it('has smooth thumb transition', () => {
      render(<Switch />);

      const thumb = document.querySelector('[data-slot="switch-thumb"]');
      expect(thumb).toHaveClass('transition-transform');
    });

    it('has smooth background transition', () => {
      render(<Switch />);

      const switchElement = document.querySelector('[data-slot="switch"]');
      expect(switchElement).toHaveClass('transition-all');
    });
  });

  describe('Form Integration', () => {
    it('works with form submission', () => {
      const handleSubmit = jest.fn();
      
      render(
        <form onSubmit={handleSubmit}>
          <Switch name="test-switch" value="switch-value" />
          <button type="submit">Submit</button>
        </form>
      );

      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('supports required attribute', () => {
      render(<Switch required />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeRequired();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Switch aria-label="Enable notifications" />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-label', 'Enable notifications');
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <Switch aria-describedby="switch-description" />
          <div id="switch-description">This toggle enables notifications</div>
        </>
      );

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-describedby', 'switch-description');
    });

    it('supports proper labeling with external label', () => {
      render(
        <>
          <label htmlFor="switch-id">Airplane Mode</label>
          <Switch id="switch-id" />
        </>
      );

      const switchElement = screen.getByRole('switch');
      const label = screen.getByText('Airplane Mode');
      
      expect(switchElement).toHaveAttribute('id', 'switch-id');
      expect(label).toHaveAttribute('for', 'switch-id');
    });

    it('announces state changes to screen readers', () => {
      render(<Switch />);

      const switchElement = screen.getByRole('switch');
      
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
      
      fireEvent.click(switchElement);
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component', () => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <Switch checked={false} onCheckedChange={handleChange} />
      );

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      fireEvent.click(switchElement);
      expect(handleChange).toHaveBeenCalledWith(true);

      // Rerender with new checked state
      rerender(<Switch checked={true} onCheckedChange={handleChange} />);
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });

    it('works as uncontrolled component', () => {
      render(<Switch defaultChecked={false} />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      fireEvent.click(switchElement);
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Common Use Cases', () => {
    it('works as airplane mode toggle', () => {
      const handleChange = jest.fn();
      render(
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" onCheckedChange={handleChange} />
          <label htmlFor="airplane-mode">Airplane Mode</label>
        </div>
      );

      const switchElement = screen.getByRole('switch');
      const label = screen.getByText('Airplane Mode');
      
      expect(label).toBeInTheDocument();
      
      fireEvent.click(switchElement);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('works as settings toggle with description', () => {
      render(
        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="notifications">Push Notifications</label>
            <p className="text-sm text-gray-500">
              Receive notifications when new messages arrive
            </p>
          </div>
          <Switch id="notifications" />
        </div>
      );

      const switchElement = screen.getByRole('switch');
      const label = screen.getByText('Push Notifications');
      const description = screen.getByText('Receive notifications when new messages arrive');
      
      expect(label).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(switchElement).toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    it('passes through custom HTML attributes', () => {
      render(
        <Switch 
          data-testid="custom-switch"
          id="custom-id"
          name="custom-name"
          value="custom-value"
        />
      );

      const switchElement = screen.getByTestId('custom-switch');
      expect(switchElement).toHaveAttribute('id', 'custom-id');
      expect(switchElement).toHaveAttribute('name', 'custom-name');
      expect(switchElement).toHaveAttribute('value', 'custom-value');
    });

    it('supports ref forwarding', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Switch ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid toggling', () => {
      const handleChange = jest.fn();
      render(<Switch onCheckedChange={handleChange} />);

      const switchElement = screen.getByRole('switch');
      
      // Rapid clicks
      fireEvent.click(switchElement);
      fireEvent.click(switchElement);
      fireEvent.click(switchElement);
      
      expect(handleChange).toHaveBeenCalledTimes(3);
    });

    it('maintains state consistency', () => {
      const { rerender } = render(<Switch checked={false} />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('data-state', 'unchecked');

      rerender(<Switch checked={true} />);
      expect(switchElement).toHaveAttribute('data-state', 'checked');
    });

    it('preserves thumb position during state changes', () => {
      const { rerender } = render(<Switch checked={false} />);

      const thumb = document.querySelector('[data-slot="switch-thumb"]');
      expect(thumb).toHaveClass('data-[state=unchecked]:translate-x-0');

      rerender(<Switch checked={true} />);
      expect(thumb).toHaveClass('data-[state=checked]:translate-x-[calc(100%-2px)]');
    });
  });
});