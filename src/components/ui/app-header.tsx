"use client";

import { BUSINESS_INFO } from "@/lib/business-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";
import { BusinessLogoImage } from "./image-seo";
import {
  MobileNavigation,
  MobileNavItem,
  MobileNavSection,
  MobileNavSeparator,
  ResponsiveNavigation,
} from "./mobile-navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";

interface AppHeaderProps {
  className?: string;
  showBreadcrumbs?: boolean;
  breadcrumbs?: Array<{
    href?: string;
    label: string;
    current?: boolean;
  }>;
}

export function AppHeader({
  className,
  showBreadcrumbs = false,
  breadcrumbs = [],
}: AppHeaderProps) {
  // Desktop Navigation Menu
  const desktopNav = (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Accueil</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Nos Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
              {BUSINESS_INFO.services.map((service) => (
                <li key={service.id} className="row-span-1">
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/#service-${service.id}`}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">
                        {service.name}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {service.description}
                      </p>
                      <div className="text-sm font-semibold text-primary">
                        À partir de ${service.price.amount}{" "}
                        {service.price.currency}
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/#contact">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );

  // Mobile Navigation Menu
  const mobileNav = (
    <MobileNavigation>
      <MobileNavItem href="/">Accueil</MobileNavItem>

      <MobileNavSeparator />

      <MobileNavSection title="Nos Services" defaultOpen>
        {BUSINESS_INFO.services.map((service) => (
          <MobileNavItem key={service.id} href={`/pool/#service-${service.id}`}>
            <div className="flex flex-col gap-1">
              <span className="font-medium">{service.name}</span>
              <span className="text-xs text-muted-foreground">
                À partir de ${service.price.amount} {service.price.currency}
              </span>
            </div>
          </MobileNavItem>
        ))}
      </MobileNavSection>

      <MobileNavSeparator />

      <MobileNavItem href="/#contact">Contact</MobileNavItem>
    </MobileNavigation>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <BusinessLogoImage
            src={BUSINESS_INFO.branding.logo}
            alt={`${BUSINESS_INFO.name} logo`}
            width={40}
            height={40}
            className="rounded-md"
          />
          <span className="font-bold text-lg">{BUSINESS_INFO.name}</span>
        </Link>

        {/* Navigation */}
        <ResponsiveNavigation desktopNav={desktopNav} mobileNav={mobileNav} />
      </div>

      {/* Breadcrumbs */}
      {showBreadcrumbs && breadcrumbs.length > 0 && (
        <div className="border-t bg-muted/50">
          <div className="container mx-auto px-4 py-2">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center">
                    {index > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {crumb.current ? (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link href={crumb.href || "/pool/"}>
                            {crumb.label}
                          </Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      )}
    </header>
  );
}
