import * as React from "react";
import { cn } from "@/lib/utils";

export function TypographyH1({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl leading-tight mb-6",
        className
      )}
      {...props}
    />
  );
}

export function TypographyH2({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl leading-tight mb-4",
        className
      )}
      {...props}
    />
  );
}

export function TypographyH3({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight leading-snug mb-3",
        className
      )}
      {...props}
    />
  );
}

export function TypographyH4({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-tight leading-snug mb-3",
        className
      )}
      {...props}
    />
  );
}

export function TypographyH5({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn(
        "scroll-m-20 text-base font-medium tracking-tight leading-normal mb-2",
        className
      )}
      {...props}
    />
  );
}

export function TypographyH6({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h6
      className={cn(
        "scroll-m-20 text-sm font-medium tracking-tight text-muted-foreground leading-normal mb-2",
        className
      )}
      {...props}
    />
  );
}

export function TypographyP({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  );
}

export function TypographyLead({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xl text-muted-foreground leading-relaxed mb-4", className)}
      {...props}
    />
  );
}

export function TypographyLarge({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-lg font-semibold leading-normal mb-2", className)} {...props} />
  );
}

export function TypographySmall({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <small
      className={cn("text-sm font-medium leading-tight mb-1", className)}
      {...props}
    />
  );
}

export function TypographyMuted({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground leading-relaxed mb-2", className)}
      {...props}
    />
  );
}

export function TypographyBlockquote({
  className,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn("mt-6 mb-6 border-l-2 pl-6 italic leading-relaxed", className)}
      {...props}
    />
  );
}

export function TypographyInlineCode({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold leading-none",
        className
      )}
      {...props}
    />
  );
}

export function TypographyList({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
      {...props}
    />
  );
}

export function TypographyCaption({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs text-muted-foreground text-center mt-2 mb-4 leading-tight", className)}
      {...props}
    />
  );
}

export function TypographySubtle({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("text-sm text-muted-foreground font-normal leading-relaxed", className)}
      {...props}
    />
  );
}
