type ButtonProps = React.ComponentProps<"button"> & {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
};

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 hover:bg-gray-100",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    ghost: "hover:bg-gray-100",
    link: "text-blue-600 underline hover:no-underline",
  };

  const sizeStyles = {
    default: "h-9 px-4",
    sm: "h-8 px-3 text-sm",
    lg: "h-10 px-6",
    icon: "h-9 w-9",
  };

  return (
    <button
      data-slot="button"
      className={`inline-flex items-center justify-center rounded-md font-medium disabled:opacity-50 cursor-pointer transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className || ""}`}
      {...props}
    />
  );
}

export default Button;
