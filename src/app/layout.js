import './globals.css';

export const metadata = {
  title: 'Lochan Jangid — ML Engineer & AI Builder',
  description: 'Lochan Jangid builds machine learning systems, LLM applications, and the engineering systems that make them useful.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
