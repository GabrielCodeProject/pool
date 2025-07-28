import { render, screen, fireEvent } from '@testing-library/react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './tabs';

describe('Tabs Components', () => {
  describe('Tabs', () => {
    it('renders tabs root with proper structure', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      );

      const tabs = document.querySelector('[data-slot="tabs"]');
      expect(tabs).toBeInTheDocument();
      expect(tabs).toHaveClass('flex', 'flex-col', 'gap-2');
    });

    it('handles controlled state', () => {
      const handleValueChange = jest.fn();
      
      render(
        <Tabs value="tab2" onValueChange={handleValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      );

      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <Tabs defaultValue="tab1" className="custom-tabs">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
        </Tabs>
      );

      const tabs = document.querySelector('[data-slot="tabs"]');
      expect(tabs).toHaveClass('custom-tabs');
    });
  });

  describe('TabsList', () => {
    it('renders tabs list with proper styling', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      );

      const list = document.querySelector('[data-slot="tabs-list"]');
      expect(list).toBeInTheDocument();
      expect(list).toHaveClass('bg-muted', 'text-muted-foreground', 'inline-flex', 'h-9');
    });

    it('applies custom className', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList className="custom-list">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );

      const list = document.querySelector('[data-slot="tabs-list"]');
      expect(list).toHaveClass('custom-list');
    });
  });

  describe('TabsTrigger', () => {
    it('renders trigger button with proper styling', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      );

      const trigger1 = screen.getByText('Tab 1');
      const trigger2 = screen.getByText('Tab 2');
      
      expect(trigger1).toBeInTheDocument();
      expect(trigger2).toBeInTheDocument();
      expect(trigger1.tagName).toBe('BUTTON');
      expect(trigger2.tagName).toBe('BUTTON');
      
      expect(trigger1).toHaveClass('inline-flex', 'items-center', 'justify-center');
      expect(trigger2).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });

    it('shows active state for selected tab', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      );

      const trigger1 = screen.getByText('Tab 1');
      expect(trigger1).toHaveAttribute('data-state', 'active');
      
      const trigger2 = screen.getByText('Tab 2');
      expect(trigger2).toHaveAttribute('data-state', 'inactive');
    });

    it('switches tabs on click', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      );

      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

      const trigger2 = screen.getByText('Tab 2');
      fireEvent.click(trigger2);

      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1" className="custom-trigger">
              Tab 1
            </TabsTrigger>
          </TabsList>
        </Tabs>
      );

      const trigger = screen.getByText('Tab 1');
      expect(trigger).toHaveClass('custom-trigger');
    });
  });

  describe('TabsContent', () => {
    it('renders content when tab is active', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div>Active content</div>
          </TabsContent>
          <TabsContent value="tab2">
            <div>Inactive content</div>
          </TabsContent>
        </Tabs>
      );

      expect(screen.getByText('Active content')).toBeInTheDocument();
      expect(screen.queryByText('Inactive content')).not.toBeInTheDocument();
    });

    it('applies proper styling', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      );

      const content = document.querySelector('[data-slot="tabs-content"]');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass('flex-1', 'outline-none');
    });

    it('applies custom className', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="custom-content">
            Content
          </TabsContent>
        </Tabs>
      );

      const content = document.querySelector('[data-slot="tabs-content"]');
      expect(content).toHaveClass('custom-content');
    });
  });

  describe('Accessibility', () => {
    it('supports keyboard navigation', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      );

      const trigger1 = screen.getByText('Tab 1');
      const trigger2 = screen.getByText('Tab 2');

      // Test tab focus
      trigger1.focus();
      expect(trigger1).toHaveFocus();

      // Test arrow key navigation
      fireEvent.keyDown(trigger1, { key: 'ArrowRight' });
      expect(trigger2).toHaveFocus();

      fireEvent.keyDown(trigger2, { key: 'ArrowLeft' });
      expect(trigger1).toHaveFocus();
    });

    it('has proper ARIA attributes', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      );

      const trigger1 = screen.getByText('Tab 1');
      const trigger2 = screen.getByText('Tab 2');
      
      expect(trigger1).toHaveAttribute('role', 'tab');
      expect(trigger2).toHaveAttribute('role', 'tab');
      expect(trigger1).toHaveAttribute('aria-selected', 'true');
      expect(trigger2).toHaveAttribute('aria-selected', 'false');
    });

    it('connects tabs to their content panels', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
        </Tabs>
      );

      const trigger = screen.getByText('Tab 1');
      const content = screen.getByText('Content 1');
      
      const triggerId = trigger.getAttribute('aria-controls');
      const contentId = content.getAttribute('id');
      
      expect(triggerId).toBe(contentId);
    });
  });

  describe('Integration Tests', () => {
    it('handles complex tab interactions', () => {
      const handleValueChange = jest.fn();
      
      render(
        <Tabs defaultValue="tab1" onValueChange={handleValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">First Tab</TabsTrigger>
            <TabsTrigger value="tab2">Second Tab</TabsTrigger>
            <TabsTrigger value="tab3" disabled>Disabled Tab</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">First Content</TabsContent>
          <TabsContent value="tab2">Second Content</TabsContent>
          <TabsContent value="tab3">Third Content</TabsContent>
        </Tabs>
      );

      // Initial state
      expect(screen.getByText('First Content')).toBeInTheDocument();
      expect(handleValueChange).not.toHaveBeenCalled();

      // Click second tab
      fireEvent.click(screen.getByText('Second Tab'));
      expect(screen.getByText('Second Content')).toBeInTheDocument();
      expect(screen.queryByText('First Content')).not.toBeInTheDocument();
      expect(handleValueChange).toHaveBeenCalledWith('tab2');

      // Try to click disabled tab
      const disabledTab = screen.getByText('Disabled Tab');
      expect(disabledTab).toBeDisabled();
    });
  });

  describe('Custom Props', () => {
    it('passes through custom HTML attributes', () => {
      render(
        <Tabs defaultValue="tab1" data-testid="custom-tabs">
          <TabsList>
            <TabsTrigger value="tab1" id="custom-trigger">
              Tab 1
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      );

      const tabs = screen.getByTestId('custom-tabs');
      expect(tabs).toBeInTheDocument();
      
      const trigger = screen.getByText('Tab 1');
      expect(trigger).toHaveAttribute('id', 'custom-trigger');
    });
  });
});