import "./globals.css";

export const metadata = {
  title: "Lochan Jangid | ML Engineer",
  description:
    "Lochan Jangid is a machine learning engineer building practical ML and AI systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}