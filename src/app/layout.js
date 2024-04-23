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
      <head>
        <link rel="icon" href="/img.jpg" sizes="any" />
        
      </head>
      <body>
              <Analytics />
        {children}
        </body>
    </html>
  )
}
