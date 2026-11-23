import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-lg bg-rose-500 px-4 py-2 font-medium text-white hover:bg-rose-600 ${className}`}
      {...props}
    />
  );
}
