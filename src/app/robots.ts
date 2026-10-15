import type {MetadataRoute} from "next";
import {absoluteUrl} from "@/lib/siteSeo";

export default function robots():MetadataRoute.Robots{
 // Crawlers need access to legacy pages to observe their canonical/noindex directives.
 return {rules:{userAgent:"*",allow:"/"},sitemap:absoluteUrl("/sitemap.xml")};
}
