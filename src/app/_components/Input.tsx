function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={`flex w-full rounded-lg bg-gray-100 border border-gray-300 px-3 py-2
              text-gray-900 placeholder:text-gray-400 transition-all duration-200 outline-none
              focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent
               disabled:cursor-not-allowed disabled:opacity-50 hover:border-gray-400
        ${className ?? ""}
      `}
      {...props}
    />
  );
}

export default Input;
