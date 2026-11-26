import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lochan.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Lochan Jangid | Machine Learning Engineer & AI Educator",
  description:
    "Machine Learning Engineer at REGEx Software Services and YouTuber (@lochanjangidcoder) teaching AI deeply from scratch. Explore production ML systems, RAG from first principles, and interactive neural labs.",
  openGraph: {
    title: "Lochan Jangid | Machine Learning Engineer & AI Educator",
    description:
      "Machine Learning Engineer at REGEx Software Services and YouTuber (@lochanjangidcoder) teaching AI deeply from scratch.",
    url: siteUrl,
    siteName: "Lochan Jangid Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lochan Jangid | Machine Learning Engineer & AI Educator",
    description:
      "Machine Learning Engineer at REGEx Software Services and creator teaching AI deeply from scratch.",
  },
  alternates: {
    canonical: "/",
  },
};

const themeScript = `
(function() {
  try {
    var saved = localStorage.getItem('theme');
    var prefDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative min-h-screen antialiased">
        {/* Soft dot grid background and blurred color blobs */}
        <div className="dot-grid-bg" aria-hidden="true" />
        <div className="blob-periwinkle" aria-hidden="true" />
        <div className="blob-aqua" aria-hidden="true" />

        {/* Global Navigation */}
        <Navbar />

        {/* Page Content */}
        <div className="relative z-10">{children}</div>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
