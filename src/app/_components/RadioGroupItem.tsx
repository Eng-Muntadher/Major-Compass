function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type="radio"
      data-slot="radio-group-item"
      className={`w-4 h-4 cursor-pointer ${className || ""}`}
      {...props}
    />
  );
}

export default RadioGroupItem;
