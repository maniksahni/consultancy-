"use client";
import { useEffect, useState } from "react";
import { defaultPublicSettings, fetchPublicSettings, type PublicSettings } from "@/lib/booking";

/**
 * The live switches Harshita edits herself from admin → Site settings: which countries are open for
 * booking, booking/Learn French paused, her name and WhatsApp shown in emails, the announcement banner.
 * Starts with the static defaults (so there's no loading flash) and updates once the backend answers.
 */
export function useSiteSettings(): PublicSettings {
  const [settings, setSettings] = useState<PublicSettings>(defaultPublicSettings);
  useEffect(() => {
    let active = true;
    fetchPublicSettings().then(result => { if (active) setSettings(result); });
    return () => { active = false; };
  }, []);
  return settings;
}
