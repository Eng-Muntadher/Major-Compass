function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={`bg-white text-[oklch(0.145_0_0)] flex flex-col gap-6 rounded-xl border border-[#e5e5e5] ${className}`}
      {...props}
    />
  );
}

export default Card;
