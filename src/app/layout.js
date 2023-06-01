import Head from 'next/head'
import './globals.css'
import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
 
export const metadata = {
  title: 'Lochan Jangid',
  description: 'Full-Stack Web Developer',
  favicon: '/img.jpg',
};
export default function RootLayout({ children }) {
  return(
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/img.jpg" type="image/x-icon" />
      </Head>
      <body>
              <Analytics />
        {children}
        </body>
    </html>
  )
}
