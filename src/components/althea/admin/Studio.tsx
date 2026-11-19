"use client";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { AlertTriangle, ArrowLeft, Check, CheckCircle2, Copy, ExternalLink, Eye, FileText, ImageIcon, Images, Link2, Loader2, Pencil, Plus, Search, Trash2, Upload, X } from "lucide-react";
import { adminCall, type StudioData, type StudioMedia, type StudioPage, type StudioSeo } from "@/lib/booking";

const SITE = "https://altheaconsulting.in";
type Faq = { q: string; a: string };

/* ------------------------------------------------------------------ helpers */

export const slugify = (v: string) => v.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
export const pathOf = (p: Pick<StudioPage, "type" | "slug">) => (p.type === "blog" ? `/blog/${p.slug}` : `/${p.slug}`);
const when = (iso: string) => { const d = new Date(iso); return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); };
const kb = (n: number) => (n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);
export const thumb = (m: StudioMedia) => `https://drive.google.com/thumbnail?id=${encodeURIComponent(m.id)}&sz=w480`;
function useJson<T>(url: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  useEffect(() => { fetch(url, { cache: "no-store" }).then((r) => (r.ok ? (typeof fallback === "string" ? r.text() : r.json()) : fallback)).then((v) => setValue(v as T)).catch(() => setValue(fallback)); }, [url]); // eslint-disable-line react-hooks/exhaustive-deps
  return value;
}

/** Whether the live site already shows the latest published content (the publish workflow checks every ~10 min). */
export function usePublishState(version: string | undefined) {
  const [live, setLive] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    const check = () => fetch(`/data/cms-version.json?t=${Date.now()}`, { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).then((d) => { if (alive) setLive(d?.version ?? "none"); }).catch(() => {});
    check();
    const id = setInterval(check, 60000);
    return () => { alive = false; clearInterval(id); };
  }, [version]);
  if (!version || live === null) return "unknown" as const;
  return live === version ? "live" as const : "publishing" as const;
}

export function PublishBadge({ state }: { state: ReturnType<typeof usePublishState> }) {
  if (state === "live") return <span className="stu-badge is-live"><CheckCircle2 size={13} aria-hidden="true" />Website up to date</span>;
  if (state === "publishing") return <span className="stu-badge is-pending" title="The website rebuilds itself within about 10–20 minutes of a change."><Loader2 size={13} className="bk-spin" aria-hidden="true" />Publishing changes…</span>;
  return <span className="stu-badge">Checking website…</span>;
}

/* ------------------------------------------------------------------ pages & blog */

const blank = (type: StudioPage["type"]): StudioPage => ({
  slug: "", type, status: "Published", title: "", excerpt: "", body: "", sort: 0, image: "", imageAlt: "", category: type === "blog" ? "Study in France" : "",
  author: "Harshita Kohli", readingTime: "", layout: type === "landing" ? "wide" : "standard", showHero: true, inHeader: false, inFooter: false,
  metaTitle: "", metaDescription: "", created: "", updated: "", publishedAt: "",
});

export function ContentStudio({ adminKey, studio, onChange, startNew }: { adminKey: string; studio: StudioData; onChange: (s: StudioData) => void; startNew?: StudioPage["type"] | null }) {
  const [editing, setEditing] = useState<{ page: StudioPage; original: string } | null>(startNew ? { page: blank(startNew), original: "" } : null);
  const [filter, setFilter] = useState<"all" | "blog" | "pages">("all");
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState("");
  useEffect(() => { if (startNew) setEditing({ page: blank(startNew), original: "" }); }, [startNew]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return studio.pages
      .filter((p) => filter === "all" || (filter === "blog" ? p.type === "blog" : p.type !== "blog"))
      .filter((p) => !q || `${p.title} ${p.slug} ${p.category}`.toLowerCase().includes(q))
      .sort((a, b) => (b.updated || "").localeCompare(a.updated || ""));
  }, [studio.pages, filter, query]);

  async function remove(p: StudioPage) {
    if (!window.confirm(`Delete “${p.title}”? It disappears from the website at the next publish. This can’t be undone.`)) return;
    setBusy(p.slug);
    const r = await adminCall<{ ok: boolean; error?: string; version?: string }>("admin.deletePage", adminKey, { slug: p.slug });
    setBusy("");
    if (!r.ok) { window.alert(r.error || "Couldn't delete."); return; }
    onChange({ ...studio, pages: studio.pages.filter((x) => x.slug !== p.slug), version: r.version || studio.version });
  }

  if (editing) return <PageEditor adminKey={adminKey} studio={studio} initial={editing.page} original={editing.original}
    onClose={() => setEditing(null)}
    onSaved={(page, version) => {
      const pages = studio.pages.filter((x) => x.slug !== editing.original && x.slug !== page.slug);
      onChange({ ...studio, pages: [page, ...pages], version });
      setEditing({ page, original: page.slug });
    }}
    onMedia={(media) => onChange({ ...studio, media: [media, ...studio.media] })} />;

  const counts = { all: studio.pages.length, blog: studio.pages.filter((p) => p.type === "blog").length, pages: studio.pages.filter((p) => p.type !== "blog").length };
  return (
    <div className="stu-stack">
      <div className="stu-head">
        <div><h2>Pages &amp; blog</h2><p>Write blog articles and standalone pages. Published ones become real pages on the website — found by Google, fast to open.</p></div>
        <div className="stu-actions">
          <button type="button" className="stu-btn is-primary" onClick={() => setEditing({ page: blank("blog"), original: "" })}><Plus size={15} aria-hidden="true" />New blog article</button>
          <button type="button" className="stu-btn" onClick={() => setEditing({ page: blank("page"), original: "" })}><Plus size={15} aria-hidden="true" />New page</button>
        </div>
      </div>
      <div className="stu-bar">
        <div className="stu-seg" role="tablist">
          {(["all", "blog", "pages"] as const).map((f) => <button key={f} type="button" role="tab" aria-selected={filter === f} onClick={() => setFilter(f)}>{f === "all" ? "All items" : f === "blog" ? "Blog articles" : "Pages"} ({counts[f]})</button>)}
        </div>
        <label className="stu-search"><Search size={15} aria-hidden="true" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title or URL" aria-label="Search pages" /></label>
      </div>
      {rows.length === 0 ? <div className="stu-empty"><FileText size={28} aria-hidden="true" /><p>{studio.pages.length ? "Nothing matches." : "No articles or pages yet. Start with your first blog article."}</p></div> :
        <div className="stu-table" role="table" aria-label="Pages and blog articles">
          <div className="stu-tr stu-th" role="row"><span role="columnheader">Title</span><span role="columnheader">Type</span><span role="columnheader">Category</span><span role="columnheader">Public URL</span><span role="columnheader">Status</span><span role="columnheader">Updated</span><span role="columnheader"><span className="sr-only">Actions</span></span></div>
          {rows.map((p) => <div key={p.slug} className="stu-tr" role="row">
            <span role="cell" className="stu-title"><strong>{p.title}</strong><small>{p.excerpt}</small></span>
            <span role="cell"><span className={`stu-type is-${p.type}`}>{p.type === "blog" ? "Blog" : p.type === "landing" ? "Landing" : "Page"}</span></span>
            <span role="cell" className="stu-muted">{p.category || "—"}</span>
            <span role="cell" className="stu-url"><code>{pathOf(p)}</code></span>
            <span role="cell"><span className={`stu-status is-${p.status.toLowerCase()}`}>{p.status}</span></span>
            <span role="cell" className="stu-muted">{when(p.updated)}</span>
            <span role="cell" className="stu-row-actions">
              {p.status === "Published" && <a className="stu-icon" href={`${SITE}${pathOf(p)}`} target="_blank" rel="noreferrer" aria-label={`View ${p.title} on the website`}><Eye size={16} /></a>}
              <button type="button" className="stu-btn is-small" onClick={() => setEditing({ page: { ...p }, original: p.slug })}><Pencil size={13} aria-hidden="true" />Edit</button>
              <button type="button" className="stu-icon is-danger" onClick={() => remove(p)} disabled={busy === p.slug} aria-label={`Delete ${p.title}`}>{busy === p.slug ? <Loader2 size={16} className="bk-spin" /> : <Trash2 size={16} />}</button>
            </span>
          </div>)}
        </div>}
    </div>
  );
}

const TOOLS: { label: string; title: string; wrap?: [string, string]; block?: string }[] = [
  { label: "H2", title: "Section heading", wrap: ["<h2>", "</h2>"] },
  { label: "H3", title: "Sub-heading", wrap: ["<h3>", "</h3>"] },
  { label: "B", title: "Bold", wrap: ["<strong>", "</strong>"] },
  { label: "I", title: "Italic", wrap: ["<em>", "</em>"] },
  { label: "• List", title: "Bulleted list", block: "<ul>\n  <li>First point</li>\n  <li>Second point</li>\n</ul>" },
  { label: "1. List", title: "Numbered list", block: "<ol>\n  <li>First step</li>\n  <li>Second step</li>\n</ol>" },
  { label: "“ Quote", title: "Quote", wrap: ["<blockquote>", "</blockquote>"] },
  { label: "¶ P", title: "Paragraph", wrap: ["<p>", "</p>"] },
  { label: "— Line", title: "Divider", block: "<hr>" },
];

function PageEditor({ adminKey, studio, initial, original, onClose, onSaved, onMedia }: { adminKey: string; studio: StudioData; initial: StudioPage; original: string; onClose: () => void; onSaved: (p: StudioPage, version: string) => void; onMedia: (m: StudioMedia) => void }) {
  const [p, setP] = useState<StudioPage>(initial);
  const [slugTouched, setSlugTouched] = useState(Boolean(original));
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [picker, setPicker] = useState<null | "featured" | "body">(null);
  const [preview, setPreview] = useState(false);
  const body = useRef<HTMLTextAreaElement>(null);
  const reserved = useJson<string[]>("/data/reserved-slugs.json", []);
  const sitemap = useJson<string>("/sitemap.xml", "");
  const set = <K extends keyof StudioPage>(k: K, v: StudioPage[K]) => setP((x) => ({ ...x, [k]: v }));
  const slug = slugTouched ? p.slug : slugify(p.title);

  const knownPaths = useMemo(() => new Set([...Array.from(sitemap.matchAll(/<loc>https:\/\/altheaconsulting\.in([^<]*)<\/loc>/g), (m) => m[1] || "/"), ...studio.pages.filter((x) => x.status === "Published").map(pathOf)]), [sitemap, studio.pages]);
  const brokenLinks = useMemo(() => Array.from(p.body.matchAll(/href="(\/[^"#?]*)/g), (m) => m[1].replace(/\/$/, "") || "/").filter((href) => sitemap && !knownPaths.has(href) && !href.startsWith("/uploads/")), [p.body, knownPaths, sitemap]);
  const slugClash = p.type !== "blog" && reserved.includes(slug);
  const titleForSearch = (p.metaTitle || p.title).trim();
  const descForSearch = (p.metaDescription || p.excerpt).trim();

  function tool(t: (typeof TOOLS)[number]) {
    const el = body.current; if (!el) return;
    const { selectionStart: a, selectionEnd: b, value } = el;
    const chosen = value.slice(a, b);
    const insert = t.wrap ? `${t.wrap[0]}${chosen || "Your text"}${t.wrap[1]}` : `\n${t.block}\n`;
    const next = value.slice(0, a) + insert + value.slice(b);
    set("body", next);
    requestAnimationFrame(() => { el.focus(); el.setSelectionRange(a + insert.length, a + insert.length); });
  }
  function addLink() {
    const el = body.current; if (!el) return;
    const url = window.prompt("Link address — a page of the site (e.g. /book-consultation) or a full https:// address");
    if (!url) return;
    const { selectionStart: a, selectionEnd: b, value } = el;
    const insert = `<a href="${url.replace(/"/g, "")}">${value.slice(a, b) || "link text"}</a>`;
    set("body", value.slice(0, a) + insert + value.slice(b));
  }
  function insertImage(m: StudioMedia) {
    const el = body.current;
    const html = `\n<figure>\n  <img src="${m.path}" alt="${(m.alt || "").replace(/"/g, "")}">\n  <figcaption>${m.alt || ""}</figcaption>\n</figure>\n`;
    const at = el ? el.selectionStart : p.body.length;
    set("body", p.body.slice(0, at) + html + p.body.slice(at));
  }

  async function save(publish?: boolean) {
    const page = { ...p, slug, status: publish === undefined ? p.status : (publish ? "Published" : "Draft") } as StudioPage;
    if (!page.title.trim()) { setStatus("Add a title first."); return; }
    if (!page.body.trim()) { setStatus("Write the content first."); return; }
    if (slugClash) { setStatus(`/${slug} is already a page of the website. Change the URL.`); return; }
    setSaving(true); setStatus("Saving…");
    const r = await adminCall<{ ok: boolean; error?: string; page?: StudioPage; version?: string }>("admin.savePage", adminKey, { page: { ...page, originalSlug: original }, reserved });
    setSaving(false);
    if (!r.ok || !r.page) { setStatus(r.error || "Couldn't save."); return; }
    setP(r.page); setSlugTouched(true);
    setStatus(r.page.status === "Published" ? "Saved. It goes live on the website in about 10–20 minutes." : "Saved as a draft — not on the website.");
    onSaved(r.page, r.version || studio.version);
  }

  const featured = studio.media.find((m) => m.path === p.image);
  return (
    <div className="stu-stack">
      <div className="stu-head">
        <div><button type="button" className="stu-back" onClick={onClose}><ArrowLeft size={14} aria-hidden="true" />Back to pages</button><h2>{original ? "Edit" : "Create"} {p.type === "blog" ? "blog article" : p.type === "landing" ? "landing page" : "page"}</h2></div>
        <div className="stu-actions">
          <button type="button" className="stu-btn" onClick={onClose}>Cancel</button>
          <button type="button" className="stu-btn is-primary" onClick={() => save()} disabled={saving}>{saving ? <Loader2 size={15} className="bk-spin" aria-hidden="true" /> : <Check size={15} aria-hidden="true" />}{p.status === "Published" ? "Save & publish" : "Save draft"}</button>
        </div>
      </div>
      {status && <p className="stu-status-line" role="status">{status}</p>}

      <div className="stu-editor">
        <div className="stu-stack">
          <section className="stu-card">
            <p className="stu-label">Content type</p>
            <div className="stu-types">
              {([["blog", "Blog article", "In /blog, with date and author"], ["page", "Standard page", "Its own page, e.g. a policy"], ["landing", "Landing page", "Full width, for a promotion"]] as const).map(([t, label, note]) =>
                <label key={t} className={`stu-type-card${p.type === t ? " is-on" : ""}`}><input type="radio" name="type" checked={p.type === t} onChange={() => setP((x) => ({ ...x, type: t, layout: t === "landing" ? "wide" : x.layout }))} /><span><strong>{label}</strong><small>{note}</small></span></label>)}
            </div>
            <label className="stu-field"><span>Title *</span><input value={p.title} onChange={(e) => set("title", e.target.value)} maxLength={160} placeholder="e.g. Your first month in Paris as a student" /></label>
            <label className="stu-field"><span>URL</span>
              <div className="stu-slug"><span>{SITE.replace("https://", "")}{p.type === "blog" ? "/blog/" : "/"}</span><input value={slug} onChange={(e) => { setSlugTouched(true); set("slug", slugify(e.target.value)); }} placeholder="made-from-the-title" /></div>
              {slugClash ? <small className="stu-warn"><AlertTriangle size={13} aria-hidden="true" />/{slug} is already a page of the website — choose another URL.</small> : <small>Made from the title. Changing it later breaks links people already shared.</small>}
            </label>
            <label className="stu-field"><span>Excerpt</span><textarea rows={2} value={p.excerpt} onChange={(e) => set("excerpt", e.target.value)} maxLength={400} placeholder="One or two sentences shown under the title and on article cards." /></label>
          </section>

          <section className="stu-card">
            <div className="stu-card-head"><div><p className="stu-label">Content *</p><small>Use the buttons, or paste HTML. Scripts and embeds are removed automatically.</small></div>
              <div className="stu-actions"><button type="button" className="stu-btn is-small is-gold" onClick={() => setPicker("body")}><ImageIcon size={14} aria-hidden="true" />Insert image</button><button type="button" className="stu-btn is-small" onClick={() => setPreview((v) => !v)}><Eye size={14} aria-hidden="true" />{preview ? "Edit" : "Preview"}</button></div></div>
            {!preview && <div className="stu-toolbar" role="toolbar" aria-label="Formatting">
              {TOOLS.map((t) => <button key={t.label} type="button" title={t.title} onClick={() => tool(t)}>{t.label}</button>)}
              <button type="button" title="Link" onClick={addLink}><Link2 size={14} aria-hidden="true" /> Link</button>
            </div>}
            {preview
              ? <iframe className="stu-preview" title="Preview" sandbox="" srcDoc={`<style>body{font:17px/1.75 system-ui,sans-serif;color:#222;max-width:740px;margin:24px auto;padding:0 16px}img{max-width:100%;height:auto;border-radius:12px}h2,h3{line-height:1.2}blockquote{border-left:3px solid #c9a35a;margin:1em 0;padding-left:16px;font-style:italic}</style>${p.body.replace(/src="\/uploads\//g, `src="${SITE}/uploads/`)}`} />
              : <textarea ref={body} className="stu-body" rows={18} value={p.body} onChange={(e) => set("body", e.target.value)} placeholder="Write or paste your article here (HTML supported)…" spellCheck />}
            <div className="stu-foot"><span>{p.body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length} words</span><span>{p.body.length.toLocaleString()} / 48,000 characters</span></div>
            {brokenLinks.length > 0 && <p className="stu-warn"><AlertTriangle size={13} aria-hidden="true" />These links point to pages that don’t exist yet: {brokenLinks.join(", ")}</p>}
          </section>
        </div>

        <div className="stu-stack">
          <section className="stu-card">
            <p className="stu-label">Publishing</p>
            <label className="stu-switch"><span>Publish on the website</span><input type="checkbox" role="switch" checked={p.status === "Published"} onChange={(e) => set("status", e.target.checked ? "Published" : "Draft")} /></label>
            <small className="stu-muted">{p.status === "Published" ? "Goes live about 10–20 minutes after saving." : "Draft: saved here only, not on the website."}</small>
            <label className="stu-field"><span>Order in menus</span><input type="number" value={p.sort} onChange={(e) => set("sort", Number(e.target.value))} /></label>
            <button type="button" className="stu-btn is-primary is-block" onClick={() => save(true)} disabled={saving}>Save &amp; publish now</button>
            {p.status === "Published" && original && <button type="button" className="stu-btn is-block" onClick={() => save(false)} disabled={saving}>Unpublish (keep as draft)</button>}
          </section>

          <section className="stu-card">
            <div className="stu-card-head"><p className="stu-label">Featured image</p><button type="button" className="stu-link" onClick={() => setPicker("featured")}>Choose from gallery →</button></div>
            <div className="stu-featured">{p.image ? (featured ? <img src={thumb(featured)} alt="" /> : <img src={p.image.startsWith("/") ? `${SITE}${p.image}` : p.image} alt="" />) : <span><ImageIcon size={26} aria-hidden="true" />No image</span>}</div>
            <label className="stu-field"><span>Image</span><div className="stu-inline"><input value={p.image} onChange={(e) => set("image", e.target.value)} placeholder="/uploads/… or https://…" /><button type="button" className="stu-btn is-small is-gold" onClick={() => setPicker("featured")}>Gallery</button></div></label>
            <label className="stu-field"><span>Image description (alt text)</span><input value={p.imageAlt} onChange={(e) => set("imageAlt", e.target.value)} maxLength={160} placeholder="What the photo shows, for Google and screen readers" /></label>
          </section>

          <section className="stu-card">
            <p className="stu-label">Article details</p>
            <label className="stu-field"><span>Category</span><input value={p.category} onChange={(e) => set("category", e.target.value)} maxLength={60} list="stu-categories" /></label>
            <datalist id="stu-categories">{Array.from(new Set(["Study in France", "Applications", "Settling in", "Careers", "Visas", ...studio.pages.map((x) => x.category).filter(Boolean)])).map((c) => <option key={c} value={c} />)}</datalist>
            <label className="stu-field"><span>Author</span><input value={p.author} onChange={(e) => set("author", e.target.value)} maxLength={80} /></label>
            <label className="stu-field"><span>Reading time</span><input value={p.readingTime} onChange={(e) => set("readingTime", e.target.value)} maxLength={30} placeholder="Worked out automatically if empty" /></label>
            <label className="stu-field"><span>Layout</span><select value={p.layout} onChange={(e) => set("layout", e.target.value as StudioPage["layout"])}><option value="standard">Standard (with consultation box beside the text)</option><option value="wide">Full width (no side box)</option></select></label>
          </section>

          <section className="stu-card">
            <p className="stu-label">Display &amp; navigation</p>
            <label className="stu-check"><input type="checkbox" checked={p.showHero} onChange={(e) => set("showHero", e.target.checked)} />Show the featured image at the top</label>
            <label className="stu-check"><input type="checkbox" checked={p.inHeader} onChange={(e) => set("inHeader", e.target.checked)} />Show in the main menu</label>
            <label className="stu-check"><input type="checkbox" checked={p.inFooter} onChange={(e) => set("inFooter", e.target.checked)} />Show in the footer links</label>
          </section>

          <section className="stu-card">
            <p className="stu-label">Google &amp; social</p>
            <label className="stu-field"><span>Search title <em className={titleForSearch.length > 40 ? "is-over" : ""}>{titleForSearch.length}/40</em></span><input value={p.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} maxLength={70} placeholder="Uses the title if empty" /></label>
            <label className="stu-field"><span>Search description <em className={descForSearch.length > 160 ? "is-over" : ""}>{descForSearch.length}/160</em></span><textarea rows={3} value={p.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} maxLength={170} placeholder="Uses the excerpt if empty. 140–160 characters works best." /></label>
            <div className="stu-serp" aria-label="How it may look on Google">
              <small>{SITE.replace("https://", "")}{pathOf({ type: p.type, slug: slug || "…" })}</small>
              <strong>{(titleForSearch.length > 40 ? `${titleForSearch.slice(0, 39)}…` : titleForSearch) || "Your title"} | Althéa Consulting</strong>
              <p>{descForSearch.slice(0, 160) || "Your excerpt appears here."}</p>
            </div>
          </section>
        </div>
      </div>
      {picker && <MediaPicker adminKey={adminKey} media={studio.media} onClose={() => setPicker(null)} onMedia={onMedia}
        onPick={(m) => { if (picker === "featured") { setP((x) => ({ ...x, image: m.path, imageAlt: x.imageAlt || m.alt })); } else insertImage(m); setPicker(null); }} />}
    </div>
  );
}

/* ------------------------------------------------------------------ media */

async function prepare(file: File): Promise<{ name: string; mime: string; data: string; width: number; height: number; bytes: number }> {
  const read = (blob: Blob) => new Promise<string>((ok, fail) => { const r = new FileReader(); r.onload = () => ok(String(r.result).split(",")[1] || ""); r.onerror = fail; r.readAsDataURL(blob); });
  if (file.type === "image/gif") return { name: file.name, mime: file.type, data: await read(file), width: 0, height: 0, bytes: file.size };
  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;
  // Very large photos are scaled to 2400 px and saved as WebP before upload: quicker to send, lighter to store.
  if (width <= 2400 && file.size <= 1.5 * 1024 * 1024) { bitmap.close(); return { name: file.name, mime: file.type, data: await read(file), width, height, bytes: file.size }; }
  const scale = Math.min(1, 2400 / width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * scale); canvas.height = Math.round(height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob>((ok, fail) => canvas.toBlob((b) => (b ? ok(b) : fail(new Error("convert"))), "image/webp", 0.86));
  return { name: file.name.replace(/\.\w+$/, "") + ".webp", mime: "image/webp", data: await read(blob), width: canvas.width, height: canvas.height, bytes: blob.size };
}

export function MediaGallery({ adminKey, media, onChange, onPick }: { adminKey: string; media: StudioMedia[]; onChange: (m: StudioMedia[]) => void; onPick?: (m: StudioMedia) => void }) {
  const [uploading, setUploading] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const [query, setQuery] = useState("");
  const [drag, setDrag] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  async function upload(files: FileList | File[]) {
    setError("");
    const list = Array.from(files).filter((f) => /^image\/(jpeg|png|webp|gif)$/.test(f.type));
    if (!list.length) { setError("Choose JPG, PNG, WebP or GIF images."); return; }
    let current = media;
    for (const file of list) {
      setUploading((u) => [...u, file.name]);
      try {
        const prepared = await prepare(file);
        if (prepared.bytes > 8 * 1024 * 1024) throw new Error(`${file.name} is over 8 MB.`);
        const r = await adminCall<{ ok: boolean; error?: string; media?: StudioMedia }>("admin.uploadMedia", adminKey, { ...prepared, alt: "" });
        if (!r.ok || !r.media) throw new Error(r.error || `Couldn't upload ${file.name}.`);
        current = [r.media, ...current];
        onChange(current);
      } catch (e) { setError(e instanceof Error ? e.message : "Upload failed."); }
      finally { setUploading((u) => u.filter((n) => n !== file.name)); }
    }
  }
  async function saveAlt(m: StudioMedia, alt: string) {
    if (alt === m.alt) return;
    const r = await adminCall("admin.updateMedia", adminKey, { id: m.id, alt });
    if (r.ok) onChange(media.map((x) => (x.id === m.id ? { ...x, alt } : x)));
  }
  async function remove(m: StudioMedia) {
    if (!window.confirm(`Delete ${m.name}? Pages using it will show no image. This can’t be undone.`)) return;
    const r = await adminCall<{ ok: boolean; error?: string }>("admin.deleteMedia", adminKey, { id: m.id });
    if (!r.ok) { setError(r.error || "Couldn't delete."); return; }
    onChange(media.filter((x) => x.id !== m.id));
  }
  const shown = media.filter((m) => !query || `${m.name} ${m.alt}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="stu-stack">
      <div className={`stu-drop${drag ? " is-drag" : ""}`} onDragOver={(e: DragEvent) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e: DragEvent) => { e.preventDefault(); setDrag(false); upload(e.dataTransfer.files); }}>
        <Upload size={24} aria-hidden="true" />
        <p><strong>Drop photos here</strong> or <button type="button" className="stu-link" onClick={() => input.current?.click()}>choose from your computer</button></p>
        <small>JPG, PNG, WebP or GIF, up to 8 MB. Big photos are resized automatically; the website serves small, fast copies.</small>
        <input ref={input} type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple hidden onChange={(e: ChangeEvent<HTMLInputElement>) => { if (e.target.files) upload(e.target.files); e.target.value = ""; }} />
      </div>
      {uploading.length > 0 && <p className="stu-status-line"><Loader2 size={14} className="bk-spin" aria-hidden="true" /> Uploading {uploading.join(", ")}…</p>}
      {error && <p className="stu-warn" role="alert"><AlertTriangle size={13} aria-hidden="true" />{error}</p>}
      <label className="stu-search"><Search size={15} aria-hidden="true" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search images" aria-label="Search images" /></label>
      {shown.length === 0 ? <div className="stu-empty"><Images size={28} aria-hidden="true" /><p>No images yet. Upload your first photo above.</p></div> :
        <div className="stu-media">
          {shown.map((m) => <figure key={m.id} className="stu-media-card">
            <button type="button" className="stu-media-img" onClick={() => onPick?.(m)} disabled={!onPick} aria-label={onPick ? `Use ${m.name}` : m.name}><img src={thumb(m)} alt="" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }} /></button>
            <figcaption>
              <strong title={m.name}>{m.name}</strong>
              <small>{m.width ? `${m.width}×${m.height} · ` : ""}{kb(m.bytes)}</small>
              <input defaultValue={m.alt} onBlur={(e) => saveAlt(m, e.target.value)} maxLength={160} placeholder="Describe the photo (alt text)" aria-label={`Description of ${m.name}`} />
              <span className="stu-media-actions">
                {onPick ? <button type="button" className="stu-btn is-small is-primary" onClick={() => onPick(m)}>Use this image</button> :
                  <button type="button" className="stu-btn is-small" onClick={() => { navigator.clipboard?.writeText(m.path); setCopied(m.id); setTimeout(() => setCopied(""), 1500); }}><Copy size={13} aria-hidden="true" />{copied === m.id ? "Copied" : "Copy path"}</button>}
                {!onPick && <button type="button" className="stu-icon is-danger" onClick={() => remove(m)} aria-label={`Delete ${m.name}`}><Trash2 size={15} /></button>}
              </span>
            </figcaption>
          </figure>)}
        </div>}
    </div>
  );
}

function MediaPicker({ adminKey, media, onClose, onPick, onMedia }: { adminKey: string; media: StudioMedia[]; onClose: () => void; onPick: (m: StudioMedia) => void; onMedia: (m: StudioMedia) => void }) {
  const [list, setList] = useState(media);
  return (
    <div className="stu-modal" role="dialog" aria-modal="true" aria-label="Choose an image" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="stu-modal-box">
        <div className="stu-card-head"><h3>Choose an image</h3><button type="button" className="stu-icon" onClick={onClose} aria-label="Close"><X size={18} /></button></div>
        <MediaGallery adminKey={adminKey} media={list} onPick={onPick} onChange={(next) => { const added = next.filter((n) => !list.some((l) => l.id === n.id)); added.forEach(onMedia); setList(next); }} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ SEO, sitemap, robots */

export function SeoEngine({ adminKey, studio, onChange }: { adminKey: string; studio: StudioData; onChange: (s: StudioData) => void }) {
  const [seo, setSeo] = useState<StudioSeo>(studio.seo);
  const [faq, setFaq] = useState<Faq[]>(() => { try { return JSON.parse(studio.seo.faq || "[]"); } catch { return []; } });
  const [status, setStatus] = useState("");
  const set = <K extends keyof StudioSeo>(k: K, v: StudioSeo[K]) => setSeo((s) => ({ ...s, [k]: v }));
  async function save() {
    setStatus("Saving…");
    const r = await adminCall<{ ok: boolean; error?: string; seo?: StudioSeo; version?: string }>("admin.saveSeo", adminKey, { seo: { ...seo, faq } });
    if (!r.ok || !r.seo) { setStatus(r.error || "Couldn't save."); return; }
    setSeo(r.seo); onChange({ ...studio, seo: r.seo, version: r.version || studio.version });
    setStatus("Saved. The website updates in about 10–20 minutes.");
  }
  const url = (k: keyof StudioSeo, label: string, ph: string) => <label className="stu-field"><span>{label}</span><input type="url" value={seo[k] as string} onChange={(e) => set(k, e.target.value.trim())} placeholder={ph} /></label>;
  return (
    <div className="stu-stack">
      <div className="stu-head"><div><h2>SEO &amp; AEO engine</h2><p>How Google, Bing and AI assistants (ChatGPT, Perplexity, Gemini) understand Althéa. Each page’s own title and description are set in its editor.</p></div>
        <div className="stu-actions"><button type="button" className="stu-btn is-primary" onClick={save}><Check size={15} aria-hidden="true" />Save SEO settings</button></div></div>
      {status && <p className="stu-status-line" role="status">{status}</p>}
      <div className="stu-grid-2">
        <section className="stu-card">
          <p className="stu-label">Your profiles on other sites</p>
          <small className="stu-muted">Linked to the website in a way search engines read, so they connect your Instagram, LinkedIn and Facebook to Althéa — this helps Google tell you apart from other “Althéa” businesses.</small>
          {url("instagram", "Instagram", "https://www.instagram.com/…")}{url("linkedin", "LinkedIn", "https://www.linkedin.com/in/…")}{url("facebook", "Facebook", "https://www.facebook.com/…")}{url("youtube", "YouTube", "https://www.youtube.com/@…")}
        </section>
        <section className="stu-card">
          <p className="stu-label">Search engine verification</p>
          <small className="stu-muted">Paste only the code from the verification tag (the part inside content=&quot;…&quot;).</small>
          <label className="stu-field"><span>Google Search Console</span><input value={seo.googleVerification} onChange={(e) => set("googleVerification", e.target.value.trim())} placeholder="e.g. a1B2c3…" /></label>
          <label className="stu-field"><span>Bing Webmaster Tools</span><input value={seo.bingVerification} onChange={(e) => set("bingVerification", e.target.value.trim())} placeholder="e.g. 1A2B3C…" /></label>
          <p className="stu-label" style={{ marginTop: 10 }}>Blog page</p>
          <label className="stu-field"><span>Blog title</span><input value={seo.blogTitle} onChange={(e) => set("blogTitle", e.target.value)} maxLength={70} /></label>
          <label className="stu-field"><span>Blog introduction</span><textarea rows={2} value={seo.blogIntro} onChange={(e) => set("blogIntro", e.target.value)} maxLength={300} /></label>
        </section>
      </div>
      <section className="stu-card">
        <div className="stu-card-head"><div><p className="stu-label">Answers for Google &amp; AI assistants (FAQ)</p><small className="stu-muted">Questions students actually ask. They appear on the FAQ page and are marked up so Google and AI answer engines can quote them.</small></div>
          <button type="button" className="stu-btn is-small" onClick={() => setFaq((f) => [...f, { q: "", a: "" }])}><Plus size={14} aria-hidden="true" />Add question</button></div>
        {faq.length === 0 && <p className="stu-muted">No extra questions yet.</p>}
        {faq.map((f, i) => <div key={i} className="stu-faq">
          <input value={f.q} onChange={(e) => setFaq((list) => list.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)))} maxLength={200} placeholder="Question, e.g. Can I work part-time while studying in France?" aria-label={`Question ${i + 1}`} />
          <textarea rows={3} value={f.a} onChange={(e) => setFaq((list) => list.map((x, j) => (j === i ? { ...x, a: e.target.value } : x)))} maxLength={900} placeholder="A short, direct answer (2–4 sentences)." aria-label={`Answer ${i + 1}`} />
          <button type="button" className="stu-icon is-danger" onClick={() => setFaq((list) => list.filter((_, j) => j !== i))} aria-label={`Remove question ${i + 1}`}><Trash2 size={15} /></button>
        </div>)}
      </section>
      <section className="stu-card">
        <p className="stu-label">Introduction for AI assistants (llms.txt)</p>
        <small className="stu-muted">An optional paragraph added to the top of <a className="stu-link" href={`${SITE}/llms.txt`} target="_blank" rel="noreferrer">altheaconsulting.in/llms.txt</a>, the summary AI answer engines read about the site.</small>
        <textarea rows={4} value={seo.llmsIntro} onChange={(e) => set("llmsIntro", e.target.value)} maxLength={1200} placeholder="e.g. Harshita Kohli personally answers every booking…" />
      </section>
    </div>
  );
}

export function SitemapPanel({ studio }: { studio: StudioData }) {
  const xml = useJson<string>("/sitemap.xml", "");
  const [query, setQuery] = useState("");
  const urls = useMemo(() => Array.from(xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?/g), (m) => ({ loc: m[1], mod: (m[2] || "").slice(0, 10) })), [xml]);
  const shown = urls.filter((u) => !query || u.loc.toLowerCase().includes(query.toLowerCase())).slice(0, 300);
  const published = studio.pages.filter((p) => p.status === "Published").length;
  return (
    <div className="stu-stack">
      <div className="stu-head"><div><h2>Sitemap.xml</h2><p>The list of every page Google and Bing should know about. It updates itself: published articles and pages are added automatically, drafts never are.</p></div>
        <div className="stu-actions"><a className="stu-btn" href={`${SITE}/sitemap.xml`} target="_blank" rel="noreferrer"><ExternalLink size={14} aria-hidden="true" />Open sitemap</a><a className="stu-btn" href="https://search.google.com/search-console" target="_blank" rel="noreferrer"><ExternalLink size={14} aria-hidden="true" />Search Console</a></div></div>
      <div className="stu-kpis">
        <div><small>Pages in the sitemap</small><strong>{urls.length || "…"}</strong></div>
        <div><small>Your published articles &amp; pages</small><strong>{published}</strong></div>
        <div><small>Submitted to search engines</small><strong style={{ fontSize: 15 }}>Automatically after each publish</strong></div>
      </div>
      <label className="stu-search"><Search size={15} aria-hidden="true" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search URLs, e.g. blog" aria-label="Search sitemap" /></label>
      <div className="stu-urls">{shown.map((u) => <a key={u.loc} href={u.loc} target="_blank" rel="noreferrer"><code>{u.loc.replace(SITE, "") || "/"}</code><span>{u.mod}</span></a>)}</div>
      {urls.length > shown.length && !query && <p className="stu-muted">Showing the first 300 of {urls.length}. Search to find any page.</p>}
    </div>
  );
}

export function RobotsPanel({ adminKey, studio, onChange }: { adminKey: string; studio: StudioData; onChange: (s: StudioData) => void }) {
  const live = useJson<string>("/robots.txt", "");
  const [text, setText] = useState(studio.seo.robotsDisallow || "");
  const [status, setStatus] = useState("");
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const invalid = lines.filter((l) => !/^\/[\w\-./*?=&%]+$/.test(l));
  async function save() {
    if (invalid.length) { setStatus(`Fix these lines first: ${invalid.join(", ")}`); return; }
    setStatus("Saving…");
    const r = await adminCall<{ ok: boolean; error?: string; seo?: StudioSeo; version?: string }>("admin.saveSeo", adminKey, { seo: { ...studio.seo, robotsDisallow: lines.join("\n") } });
    if (!r.ok || !r.seo) { setStatus(r.error || "Couldn't save."); return; }
    onChange({ ...studio, seo: r.seo, version: r.version || studio.version });
    setStatus("Saved. The website updates in about 10–20 minutes.");
  }
  return (
    <div className="stu-stack">
      <div className="stu-head"><div><h2>Robots.txt</h2><p>Tells search engines and AI crawlers what they may read. Everything is open by default — which is what you want for traffic.</p></div>
        <div className="stu-actions"><button type="button" className="stu-btn is-primary" onClick={save}><Check size={15} aria-hidden="true" />Save rules</button></div></div>
      {status && <p className="stu-status-line" role="status">{status}</p>}
      <div className="stu-grid-2">
        <section className="stu-card">
          <p className="stu-label">Hide these paths from search engines</p>
          <small className="stu-muted">One path per line, starting with “/”, e.g. <code>/downloads/private</code>. Hiding a page here can remove it from Google — only use it for things that should never appear in search. The whole site can never be blocked.</small>
          <textarea rows={8} value={text} onChange={(e) => setText(e.target.value)} placeholder="/example-private-page" spellCheck={false} className="stu-mono" />
          {invalid.length > 0 && <p className="stu-warn"><AlertTriangle size={13} aria-hidden="true" />Not valid: {invalid.join(", ")}</p>}
        </section>
        <section className="stu-card">
          <div className="stu-card-head"><p className="stu-label">Live robots.txt</p><a className="stu-link" href={`${SITE}/robots.txt`} target="_blank" rel="noreferrer">Open →</a></div>
          <pre className="stu-pre">{live || "Loading…"}</pre>
        </section>
      </div>
    </div>
  );
}
