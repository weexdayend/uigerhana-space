import type { MetadataRoute } from "next";
import { SITE_META } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_META.siteUrl.replace(/\/$/, "")}/sitemap.xml`,
  };
}
