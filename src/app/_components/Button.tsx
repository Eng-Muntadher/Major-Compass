import Link from "next/link";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "glass";

type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

/* ──────────────────────────────── */
/* Styles */
/* ──────────────────────────────── */

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg transition-all cursor-pointer select-none";

const focusStyles =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const disabledStyles = "disabled:opacity-50 disabled:pointer-events-none";

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2",
  md: "px-6 py-3",
  lg: "px-8 py-4",
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-linear-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:brightness-110",
  secondary: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border-2 border-gray-300 text-gray-700 hover:bg-gray-200",
  ghost: "text-gray-700 hover:bg-gray-100",
  glass: "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30",
};

/* ──────────────────────────────── */
/* Component */
/* ──────────────────────────────── */

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    className = "",
    ariaLabel,
    disabled,
    leftIcon,
    rightIcon,
    href,
    ...props
  },
  ref,
) {
  const classes = `${baseStyles} ${focusStyles} ${disabledStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
      <span className="truncate">{children}</span>
      {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
    </>
  );

  // LINK
  if (href) {
    return (
      <Link
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        aria-label={ariaLabel}
        {...(props as Omit<ButtonAsLink, "href">)}
      >
        {content}
      </Link>
    );
  }

  // BUTTON
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      aria-label={ariaLabel}
      disabled={disabled}
      {...(props as ButtonAsButton)}
    >
      {content}
    </button>
  );
});
