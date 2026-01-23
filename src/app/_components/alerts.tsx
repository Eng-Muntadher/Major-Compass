const baseAlertClasses =
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current";

const variantClasses = {
  default: "bg-card text-card-foreground",
  destructive:
    "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
};

// Expected variant types
type AlertVariant = keyof typeof variantClasses;

// --- Alert Component ---
function Alert({
  className,
  variant = "default", // Set default variant
  ...props
}: React.ComponentProps<"div"> & { variant?: AlertVariant }) {
  const finalClasses = `${baseAlertClasses} ${variantClasses[variant]} ${className || ""}`;

  return (
    <div data-slot="alert" role="alert" className={finalClasses} {...props} />
  );
}

// --- AlertDescription Component ---
function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const finalClasses = `text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed ${className || ""}`;

  return (
    <div data-slot="alert-description" className={finalClasses} {...props} />
  );
}

export { Alert, AlertDescription };
