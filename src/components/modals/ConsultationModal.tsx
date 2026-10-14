"use client";
import { X } from "lucide-react";
import Booking from "@/components/althea/Booking";
interface ConsultationModalProps { isOpen: boolean; onClose: () => void; defaultCountry?: string; }
export default function ConsultationModal({ isOpen, onClose, defaultCountry = "France" }: ConsultationModalProps) {
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" onKeyDown={event => { if (event.key === "Escape") onClose(); }}>
    <div role="dialog" aria-modal="true" aria-label="Consultation request" className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-cream border border-sand p-6 md:p-8">
      <button type="button" onClick={onClose} aria-label="Close consultation request" className="absolute right-3 top-3 min-h-11 min-w-11 flex items-center justify-center focus-visible:outline focus-visible:outline-2"><X size={20}/></button>
      <h2 className="mb-6 pr-10">Bring your questions.</h2><Booking defaultCountry={defaultCountry}/>
    </div>
  </div>;
}
