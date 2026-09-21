import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'Lochan Jangid — ML Engineer & AI Builder',
  description: 'Lochan Jangid builds machine learning systems, LLM applications, and the engineering systems that make them useful.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}<Analytics /></body>
    </html>
  );
}
