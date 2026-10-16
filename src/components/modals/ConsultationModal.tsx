"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import Booking from "@/components/althea/Booking";
interface ConsultationModalProps { isOpen: boolean; onClose: () => void; defaultCountry?: string; defaultMessage?: string; }

export default function ConsultationModal({ isOpen, onClose, defaultCountry = "France", defaultMessage }: ConsultationModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", close); };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return <div className="ms-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div role="dialog" aria-modal="true" aria-label="Consultation request" className="ms-dialog ms-dialog-form" data-lenis-prevent>
      <div className="ms-dialog-top"><div><p className="ms-kicker">A PERSONAL CONVERSATION</p><h3>Bring your <em>questions.</em></h3></div><button type="button" className="ms-dialog-close" onClick={onClose} aria-label="Close consultation request" autoFocus><X size={20} /></button></div>
      <Booking key={`${defaultCountry}-${defaultMessage ?? ""}`} defaultCountry={defaultCountry} defaultMessage={defaultMessage} />
    </div>
  </div>;
}
