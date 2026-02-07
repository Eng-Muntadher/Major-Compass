import { LucideIcon } from "lucide-react";

interface ContactLinkProps {
  href: string;
  icon: LucideIcon;
  text: string;
  isExternal: boolean;
  ariaLabel: string;
}

function ContactLink({
  href,
  icon: Icon,
  text,
  isExternal = false,
  ariaLabel,
}: ContactLinkProps) {
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      className="flex items-center gap-3 text-blue-600 hover:text-blue-700 transition-colors"
    >
      <Icon className="w-5 h-5" aria-hidden="true" />
      <span>{text}</span>
    </a>
  );
}

export default ContactLink;
