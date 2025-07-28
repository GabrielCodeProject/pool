"use client"

import * as React from "react"
import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { Button } from "./button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "./sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"
import { cn } from "@/lib/utils"

interface MobileNavigationProps {
  children?: React.ReactNode
  className?: string
}

interface MobileNavItemProps {
  href?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

interface MobileNavSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function MobileNavigation({ children, className }: MobileNavigationProps) {
  return (
    <div className={cn("md:hidden", className)}>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
            aria-label="Open navigation menu"
          >
            <MenuIcon className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 sm:w-96">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 mt-4">
            {children}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

function MobileNavItem({ href, children, className, onClick }: MobileNavItemProps) {
  if (href) {
    return (
      <SheetClose asChild>
        <Link
          href={href}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
            className
          )}
          onClick={onClick}
        >
          {children}
        </Link>
      </SheetClose>
    )
  }

  return (
    <button
      className={cn(
        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-left w-full",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function MobileNavSection({ title, children, defaultOpen = false }: MobileNavSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between p-4 text-sm font-medium hover:bg-accent"
        >
          {title}
          <MenuIcon 
            className={cn(
              "size-4 transition-transform duration-200",
              isOpen ? "rotate-180" : ""
            )}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 px-2 pb-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}

function MobileNavSeparator({ className }: { className?: string }) {
  return <div className={cn("border-t border-border my-2", className)} />
}

interface ResponsiveNavigationProps {
  desktopNav: React.ReactNode
  mobileNav: React.ReactNode
  className?: string
}

function ResponsiveNavigation({ desktopNav, mobileNav, className }: ResponsiveNavigationProps) {
  return (
    <nav className={cn("flex items-center justify-between", className)}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {desktopNav}
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden">
        {mobileNav}
      </div>
    </nav>
  )
}

export {
  MobileNavigation,
  MobileNavItem,
  MobileNavSection,
  MobileNavSeparator,
  ResponsiveNavigation,
}