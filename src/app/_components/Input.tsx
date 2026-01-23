function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={`flex w-full rounded-md border px-3 py-1 outline-none disabled:opacity-50 ${className || ""}`}
      {...props}
    />
  );
}

export default Input;
