"use client";

import { cn } from "@/lib/utils";

interface TactileButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "default" | "sm";
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export function TactileButton({
  children,
  onClick,
  className,
  disabled,
  variant = "default",
  as: Tag = "button",
  href,
  target,
  rel,
}: TactileButtonProps) {
  const Component = Tag === "a" ? "a" : "button";
  const linkProps = Tag === "a" ? { href, target, rel } : {};

  return (
    <Component
      onClick={onClick}
      disabled={Tag === "button" ? disabled : undefined}
      className={cn(
        variant === "sm" ? "btn-typro-sm" : "btn-typro",
        "rounded-xl",
        className,
      )}
      {...linkProps}
    >
      {children}
    </Component>
  );
}
