import type { ReactNode, ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode | string;
  variant?: "primary" | "secondary" | "tertiary" | "danger";
}

function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const primary = clsx(
    "bg-teal text-white text-sm font-bold",
    "hover:bg-teal/80",
    "active:ring-2 ring-offset-1 ring-blue-400"
  );
  const secondary = clsx(
    "bg-white border-2 border-teal text-teal text-sm font-bold",
    "hover:bg-gray-200/60",
    "active:ring-2 ring-offset-1 ring-blue-400"
  );
  const tertiary = clsx(
    "bg-white text-blue-600 underline font-bold",
    "hover:underline-offset-2",
    "active:ring-2 ring-offset-1 ring-blue-400"
  );
  const danger = clsx(
    // "bg-red-800 text-white text-sm font-bold",
    "bg-[#862809]/90 text-white text-sm font-bold",
    // "hover:bg-red-900",
    "hover:bg-[#862809]",
    "active:ring-2 ring-offset-1 ring-blue-400"
  );

  const classes = clsx(
    {
      "px-4 py-2 rounded-lg transition": true, // default, universal styles
      [primary]: variant === "primary",
      [secondary]: variant === "secondary",
      [tertiary]: variant === "tertiary",
      [danger]: variant === "danger",
    },
    className
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
