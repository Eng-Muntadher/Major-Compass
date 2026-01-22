import { Github, Globe, Mail } from "lucide-react";
import ContactLink from "./ContactLink";

// Static data
const contacts = [
  {
    href: "mailto:contact@collegeguide.iq",
    icon: Mail,
    text: "contact@collegeguide.iq",
    isExternal: false,
  },
  {
    href: "https://github.com/collegeguide-iraq",
    icon: Github,
    text: "@collegeguide-iraq",
    isExternal: true,
  },
  {
    href: "https://collegeguide.iq",
    icon: Globe,
    text: "collegeguide.iq",
    isExternal: true,
  },
];

function ContactSection() {
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
          <Mail className="w-6 h-6 text-green-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl mb-4">Get In Touch</h2>
          <p className="text-gray-700 mb-6">
            Have questions or feedback? We&apos;d love to hear from you!
          </p>

          <div className="space-y-3">
            {contacts.map((contact, index) => (
              <ContactLink key={index} {...contact} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
