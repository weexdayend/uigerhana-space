import type { MetadataRoute } from "next";
import { PUBLIC_CASE_STUDIES } from "@/data/case-studies";
import { SITE_META } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_META.siteUrl.replace(/\/$/, "");

  return [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/cv`, changeFrequency: "monthly", priority: 0.7 },
    ...PUBLIC_CASE_STUDIES.map((study) => ({
      url: `${baseUrl}/work/${study.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
