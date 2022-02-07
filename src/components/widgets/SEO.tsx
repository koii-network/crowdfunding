import { Helmet } from "react-helmet";
import config from "config/app-config";
export function SEO() {
  return (
    <Helmet>
      <html lang={config?.lang} />
      <meta charSet="utf-8" />
      <title>{config?.title}</title>
      <meta name="description" content={config.description} />
      <link rel="canonical" href={config?.canonical} />
      {/* OG */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:locale" content={config.locale} />
      <meta property="og:url" content={config.canonical} />
      <meta property="og:site_name" content={config.companyName} />
      <meta name="author" content={config?.companyName} />
      {/* twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={config?.twitterHandle} />
      <meta name="twitter:creator" content={config?.twitterHandle} />
    </Helmet>
  );
}
