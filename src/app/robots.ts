import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/navigation";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/erfolg", "/abbruch"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
