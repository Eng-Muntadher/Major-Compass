function Checkbox({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type="checkbox"
      data-slot="checkbox"
      className={`w-4 h-4 cursor-pointer ${className || ""}`}
      {...props}
    />
  );
}

export default Checkbox;
