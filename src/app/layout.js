import "./globals.css";
import dynamic from "next/dynamic";

const Cursor = dynamic(() => import("../components/Cursor"), {
  ssr: false,
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        {children}</body>
    </html>
  );
}