import Head from 'next/head'
import './globals.css'
import { Metadata } from 'next';
 
export const metadata = {
  title: 'Lochan Jangid',
  description: 'Full-Stack Web Developer',
};
export default function RootLayout({ children }) {
  return(
    <html lang="en">
      <Head>
        <title>Lochan Jangid | Full-Stack Web Developer</title>
      </Head>
      <body>
        {children}
        </body>
    </html>
  )
}