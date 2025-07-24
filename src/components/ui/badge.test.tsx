import { render, screen } from '@testing-library/react';
import { Badge, badgeVariants } from './badge';

describe('Badge Component', () => {
  describe('Badge', () => {
    it('renders badge with default variant', () => {
      render(<Badge>Default Badge</Badge>);
      
      const badge = screen.getByText('Default Badge');
      expect(badge).toBeInTheDocument();
      expect(badge.tagName).toBe('SPAN');
      expect(badge).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });

    it('renders with different variants', () => {
      const { rerender } = render(<Badge variant="secondary">Secondary</Badge>);
      expect(screen.getByText('Secondary')).toHaveClass('bg-secondary', 'text-secondary-foreground');

      rerender(<Badge variant="destructive">Destructive</Badge>);
      expect(screen.getByText('Destructive')).toHaveClass('bg-destructive', 'text-white');

      rerender(<Badge variant="outline">Outline</Badge>);
      expect(screen.getByText('Outline')).toHaveClass('text-foreground');
    });

    it('applies custom className', () => {
      render(<Badge className="custom-class">Custom Badge</Badge>);
      
      const badge = screen.getByText('Custom Badge');
      expect(badge).toHaveClass('custom-class');
    });

    it('renders as child element when asChild is true', () => {
      render(
        <Badge asChild>
          <button type="button">Button Badge</button>
        </Badge>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Button Badge');
    });

    it('supports icons within badge', () => {
      render(
        <Badge>
          <svg data-testid="badge-icon" />
          With Icon
        </Badge>
      );
      
      const badge = screen.getByText('With Icon');
      const icon = screen.getByTestId('badge-icon');
      expect(badge).toContainElement(icon);
    });

    it('passes through HTML attributes', () => {
      render(
        <Badge data-testid="test-badge" id="custom-id">
          Test Badge
        </Badge>
      );
      
      const badge = screen.getByTestId('test-badge');
      expect(badge).toHaveAttribute('id', 'custom-id');
    });
  });

  describe('badgeVariants', () => {
    it('generates correct classes for default variant', () => {
      const classes = badgeVariants();
      expect(classes).toContain('bg-primary');
      expect(classes).toContain('text-primary-foreground');
    });

    it('generates correct classes for secondary variant', () => {
      const classes = badgeVariants({ variant: 'secondary' });
      expect(classes).toContain('bg-secondary');
      expect(classes).toContain('text-secondary-foreground');
    });

    it('generates correct classes for destructive variant', () => {
      const classes = badgeVariants({ variant: 'destructive' });
      expect(classes).toContain('bg-destructive');
      expect(classes).toContain('text-white');
    });

    it('generates correct classes for outline variant', () => {
      const classes = badgeVariants({ variant: 'outline' });
      expect(classes).toContain('text-foreground');
    });
  });

  describe('Accessibility', () => {
    it('has proper focus styling', () => {
      render(<Badge>Focusable Badge</Badge>);
      
      const badge = screen.getByText('Focusable Badge');
      expect(badge).toHaveClass('focus-visible:border-ring');
    });

    it('supports ARIA attributes', () => {
      render(
        <Badge aria-label="Status badge" role="status">
          Active
        </Badge>
      );
      
      const badge = screen.getByRole('status');
      expect(badge).toHaveAttribute('aria-label', 'Status badge');
    });
  });

  describe('Icon Integration', () => {
    it('styles SVG icons correctly', () => {
      render(
        <Badge>
          <svg data-testid="svg-icon" className="size-4">
            <circle cx="12" cy="12" r="10" />
          </svg>
          Icon Badge
        </Badge>
      );
      
      const badge = screen.getByText('Icon Badge');
      const icon = screen.getByTestId('svg-icon');
      
      expect(badge).toContainElement(icon);
      expect(badge).toHaveClass('[&_svg]:size-3');
    });
  });

  describe('Responsive Design', () => {
    it('has responsive text sizing', () => {
      render(<Badge>Responsive Badge</Badge>);
      
      const badge = screen.getByText('Responsive Badge');
      expect(badge).toHaveClass('text-xs');
    });

    it('maintains consistent spacing', () => {
      render(<Badge>Spaced Badge</Badge>);
      
      const badge = screen.getByText('Spaced Badge');
      expect(badge).toHaveClass('px-2', 'py-0.5');
    });
  });

  describe('States', () => {
    it('handles invalid state styling', () => {
      render(<Badge aria-invalid="true">Invalid Badge</Badge>);
      
      const badge = screen.getByText('Invalid Badge');
      expect(badge).toHaveClass('aria-invalid:ring-destructive/20');
    });

    it('maintains consistent border radius', () => {
      render(<Badge>Rounded Badge</Badge>);
      
      const badge = screen.getByText('Rounded Badge');
      expect(badge).toHaveClass('rounded-md');
    });
  });
});