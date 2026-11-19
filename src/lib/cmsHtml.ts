import { readFileSync } from "node:fs";
import sanitizeHtml from "sanitize-html";

// Admin-written article HTML is cleaned at build time: only formatting tags survive (no scripts, iframes,
// styles or event handlers), the page keeps a single <h1>, images get lazy loading and their real size,
// and external links open safely in a new tab.
const WIDTHS = [384, 640, 828, 1080, 1600];
const sizes: Record<string, [number, number]> = (() => {
  try { return JSON.parse(readFileSync("public/uploads/sizes.json", "utf8")); } catch { return {}; }
})();

export function uploadSize(path: string): [number, number] | null { return sizes[path] ?? null; }

export function uploadSrcSet(path: string) {
  const m = path.match(/^\/uploads\/([\w\-.]+)\.(jpe?g|png|webp)$/i);
  return m ? WIDTHS.map((w) => `/uploads/w${w}/${m[1]}.webp ${w}w`).join(", ") : undefined;
}

export function cleanArticleHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: ["h2", "h3", "h4", "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "a", "ul", "ol", "li", "blockquote", "figure", "figcaption", "img", "table", "thead", "tbody", "tr", "th", "td", "code", "pre", "mark", "small", "sup", "sub"],
    allowedAttributes: { a: ["href", "title", "target", "rel", "data-cms-link"], img: ["src", "alt", "width", "height", "loading", "decoding", "srcset", "sizes"], th: ["scope", "colspan", "rowspan"], td: ["colspan", "rowspan"] },
    allowedSchemes: ["https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["https"] },
    allowProtocolRelative: false,
    transformTags: {
      h1: "h2",
      a: (tagName, attribs) => {
        const href = attribs.href || "";
        const external = /^https?:\/\//i.test(href) && !/^https:\/\/(www\.)?altheaconsulting\.in/i.test(href);
        // data-cms-link: scripts/check-seo.mjs reports these separately instead of failing a publish over them.
        return { tagName, attribs: { href, ...(attribs.title ? { title: attribs.title } : {}), "data-cms-link": "", ...(external ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {}) } };
      },
      img: (tagName, attribs) => {
        const src = attribs.src || "";
        const size = uploadSize(src);
        const srcset = uploadSrcSet(src);
        return {
          tagName,
          attribs: {
            src: srcset ? src.replace(/^\/uploads\/([\w\-.]+)\.\w+$/, "/uploads/w1080/$1.webp") : src,
            alt: attribs.alt || "",
            loading: "lazy", decoding: "async",
            ...(size ? { width: String(size[0]), height: String(size[1]) } : {}),
            ...(srcset ? { srcset, sizes: "(max-width: 900px) 92vw, 760px" } : {}),
          },
        };
      },
    },
    // Relative /uploads and site paths are allowed even though they carry no scheme.
    allowedSchemesAppliedToAttributes: ["href", "src"],
  });
}
