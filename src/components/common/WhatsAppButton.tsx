import WhatsAppIcon from "./WhatsAppIcon";
import { waLink } from "@/config/contact";

/** A link that opens WhatsApp with a message already written for Harshita. */
export default function WhatsAppButton({ text, label = "WhatsApp Harshita", className = "ms-btn ms-btn-wa", small }: { text: string; label?: string; className?: string; small?: boolean }) {
  return <a className={`${className}${small ? " is-small" : ""}`} href={waLink(text)} target="_blank" rel="noopener noreferrer" data-wa>
    <span>{label}</span><WhatsAppIcon size={small ? 15 : 18} />
  </a>;
}
