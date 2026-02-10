import { Github, Globe, Mail } from "lucide-react";
import ContactLink from "./ContactLink";
import { aboutTranslation } from "../translations/en/about";

interface ContactSectionProps {
  contact: aboutTranslation["contact"];
}

function ContactSection({ contact }: ContactSectionProps) {
  // Static Translation data (bilingual)
  const contactsData = [
    {
      href: "mailto:muntadheralshammari33@gmail.com",
      icon: Mail,
      text: contact.links[0].text,
      isExternal: false,
      ariaLabel: "Email me",
    },
    {
      href: "https://github.com/Eng-Muntadher",
      icon: Github,
      text: contact.links[1].text,
      isExternal: true,
      ariaLabel: "Visit my GitHub",
    },
    {
      href: "https://muntadher-ahmed.vercel.app",
      icon: Globe,
      text: contact.links[2].text,
      isExternal: true,
      ariaLabel: "Visit My Portfolio",
    },
  ];

  return (
    <section className="bg-white rounded-xl p-8 border border-gray-200">
      <div className="flex items-start gap-4 overflow-auto">
        {/* Icon */}
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
          <Mail className="w-6 h-6 text-green-600" aria-hidden="true" />
        </div>

        {/* Text */}
        <div className="flex-1">
          <h2 className="text-2xl mb-4">{contact.title}</h2>
          <p className="text-gray-700 mb-6">{contact.description}</p>

          {/* Links */}
          <div className="space-y-3">
            {contactsData.map((contactItem, index) => (
              <ContactLink key={index} {...contactItem} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
