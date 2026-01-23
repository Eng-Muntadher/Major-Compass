function RadioGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="radio-group"
      role="radiogroup"
      className={`${className || ""}`}
      {...props}
    />
  );
}

export default RadioGroup;
