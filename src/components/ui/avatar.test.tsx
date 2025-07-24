import { render, screen, waitFor } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';

describe('Avatar Components', () => {
  describe('Avatar', () => {
    it('renders avatar container with correct styling', () => {
      render(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );

      const avatar = document.querySelector('[data-slot="avatar"]');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass('relative', 'flex', 'size-8', 'shrink-0', 'overflow-hidden', 'rounded-full');
    });

    it('applies custom className', () => {
      render(
        <Avatar className="custom-avatar">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );

      const avatar = document.querySelector('[data-slot="avatar"]');
      expect(avatar).toHaveClass('custom-avatar');
    });

    it('supports different sizes through className', () => {
      render(
        <Avatar className="size-12">
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
      );

      const avatar = document.querySelector('[data-slot="avatar"]');
      expect(avatar).toHaveClass('size-12');
    });
  });

  describe('AvatarImage', () => {
    it('renders image with correct attributes', () => {
      render(
        <Avatar>
          <AvatarImage src="/test-avatar.jpg" alt="Test User" />
          <AvatarFallback>TU</AvatarFallback>
        </Avatar>
      );

      const image = document.querySelector('[data-slot="avatar-image"]');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/test-avatar.jpg');
      expect(image).toHaveAttribute('alt', 'Test User');
      expect(image).toHaveClass('aspect-square', 'size-full');
    });

    it('applies custom className to image', () => {
      render(
        <Avatar>
          <AvatarImage src="/test.jpg" alt="Test" className="custom-image" />
          <AvatarFallback>T</AvatarFallback>
        </Avatar>
      );

      const image = document.querySelector('[data-slot="avatar-image"]');
      expect(image).toHaveClass('custom-image');
    });

    it('handles image loading states', async () => {
      render(
        <Avatar>
          <AvatarImage src="/valid-image.jpg" alt="Valid" />
          <AvatarFallback>V</AvatarFallback>
        </Avatar>
      );

      // Image should be present
      const image = document.querySelector('[data-slot="avatar-image"]');
      expect(image).toBeInTheDocument();
    });
  });

  describe('AvatarFallback', () => {
    it('renders fallback text', () => {
      render(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );

      const fallback = screen.getByText('JD');
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveClass('bg-muted', 'flex', 'size-full', 'items-center', 'justify-center', 'rounded-full');
    });

    it('displays when image fails to load', async () => {
      render(
        <Avatar>
          <AvatarImage src="/non-existent.jpg" alt="Non-existent" />
          <AvatarFallback>NE</AvatarFallback>
        </Avatar>
      );

      // Fallback should be present
      expect(screen.getByText('NE')).toBeInTheDocument();
    });

    it('applies custom className to fallback', () => {
      render(
        <Avatar>
          <AvatarFallback className="custom-fallback">CF</AvatarFallback>
        </Avatar>
      );

      const fallback = screen.getByText('CF');
      expect(fallback).toHaveClass('custom-fallback');
    });

    it('supports different content types', () => {
      render(
        <Avatar>
          <AvatarFallback>
            <svg data-testid="fallback-icon" />
          </AvatarFallback>
        </Avatar>
      );

      const icon = screen.getByTestId('fallback-icon');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Complete Avatar Integration', () => {
    it('renders complete avatar with image and fallback', () => {
      render(
        <Avatar>
          <AvatarImage src="/user.jpg" alt="User Avatar" />
          <AvatarFallback>UA</AvatarFallback>
        </Avatar>
      );

      const avatar = document.querySelector('[data-slot="avatar"]');
      const image = document.querySelector('[data-slot="avatar-image"]');
      const fallback = document.querySelector('[data-slot="avatar-fallback"]');

      expect(avatar).toBeInTheDocument();
      expect(image).toBeInTheDocument();
      expect(fallback).toBeInTheDocument();
    });

    it('handles multiple avatars', () => {
      render(
        <>
          <Avatar>
            <AvatarImage src="/user1.jpg" alt="User 1" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="/user2.jpg" alt="User 2" />
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
        </>
      );

      const avatars = document.querySelectorAll('[data-slot="avatar"]');
      expect(avatars).toHaveLength(2);
      expect(screen.getByText('U1')).toBeInTheDocument();
      expect(screen.getByText('U2')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('maintains proper image accessibility', () => {
      render(
        <Avatar>
          <AvatarImage src="/accessible.jpg" alt="Accessible avatar for John Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );

      const image = document.querySelector('[data-slot="avatar-image"]');
      expect(image).toHaveAttribute('alt', 'Accessible avatar for John Doe');
    });

    it('provides meaningful fallback text', () => {
      render(
        <Avatar>
          <AvatarFallback aria-label="John Doe's avatar">JD</AvatarFallback>
        </Avatar>
      );

      const fallback = screen.getByText('JD');
      expect(fallback).toHaveAttribute('aria-label', "John Doe's avatar");
    });
  });

  describe('Styling Variations', () => {
    it('supports square avatars', () => {
      render(
        <Avatar className="rounded-lg">
          <AvatarFallback>SQ</AvatarFallback>
        </Avatar>
      );

      const avatar = document.querySelector('[data-slot="avatar"]');
      expect(avatar).toHaveClass('rounded-lg');
    });

    it('supports different sizes', () => {
      const { rerender } = render(
        <Avatar className="size-6">
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
      );

      let avatar = document.querySelector('[data-slot="avatar"]');
      expect(avatar).toHaveClass('size-6');

      rerender(
        <Avatar className="size-16">
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
      );

      avatar = document.querySelector('[data-slot="avatar"]');
      expect(avatar).toHaveClass('size-16');
    });
  });

  describe('HTML Attributes', () => {
    it('passes through HTML attributes to avatar container', () => {
      render(
        <Avatar data-testid="test-avatar" id="avatar-1">
          <AvatarFallback>TA</AvatarFallback>
        </Avatar>
      );

      const avatar = screen.getByTestId('test-avatar');
      expect(avatar).toHaveAttribute('id', 'avatar-1');
    });

    it('passes through HTML attributes to image', () => {
      render(
        <Avatar>
          <AvatarImage 
            src="/test.jpg" 
            alt="Test" 
            data-testid="test-image"
            loading="lazy" 
          />
          <AvatarFallback>T</AvatarFallback>
        </Avatar>
      );

      const image = screen.getByTestId('test-image');
      expect(image).toHaveAttribute('loading', 'lazy');
    });
  });
});