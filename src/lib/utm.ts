export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
}

export function captureUTMParams(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const utm_source = params.get("utm_source");
    const utm_medium = params.get("utm_medium");
    const utm_campaign = params.get("utm_campaign");
    const utm_term = params.get("utm_term");
    const utm_content = params.get("utm_content");

    if (utm_source || utm_medium || utm_campaign || utm_term || utm_content) {
      const data: UTMParams = {
        ...(utm_source && { utm_source }),
        ...(utm_medium && { utm_medium }),
        ...(utm_campaign && { utm_campaign }),
        ...(utm_term && { utm_term }),
        ...(utm_content && { utm_content }),
        ...(document.referrer && { referrer: document.referrer }),
      };
      sessionStorage.setItem("pathways_utm", JSON.stringify(data));
    }
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

export function getStoredUTMParams(): UTMParams | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem("pathways_utm");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
