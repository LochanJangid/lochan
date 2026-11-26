export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lochan.vercel.app";

  const routes = [
    "",
    "/writing",
    "/writing/rag-zero-to-hero",
    "/work/see-house",
    "/work/mnist",
    "/work/bank-marketing",
    "/work/lochan-eda",
    "/work/lochan-eda/docs",
    "/work/lochan-eda/docs/getting-started",
    "/work/lochan-eda/docs/automated-eda",
    "/work/lochan-eda/docs/profiler",
    "/work/lochan-eda/docs/numerical",
    "/work/lochan-eda/docs/categorical",
    "/work/lochan-eda/docs/missing",
    "/work/lochan-eda/docs/preprocessing",
    "/work/lochan-eda/docs/train-test",
    "/work/lochan-eda/docs/reports",
    "/work/lochan-eda/docs/api",
    "/work/medical-ai",
    "/work/sanjeevni-clinic",
    "/work/weblens-ai",
    "/work/nanocalc-gpt",
    "/work/zero-sql",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/writing") ? 0.9 : 0.8,
  }));
}
