import { Home } from "@/components/home";
import { CANONICAL_URL, siteConfig } from "@/lib/site";
export default function Page() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "فائض",
    alternateName: "Fayid",
    description: siteConfig.description,
    ...(CANONICAL_URL
      ? { url: CANONICAL_URL, logo: `${CANONICAL_URL}/images/mark.png` }
      : {}),
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    sameAs: siteConfig.socialLinks.map((link) => link.url).filter(Boolean),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
        }}
      />
      <Home />
    </>
  );
}
