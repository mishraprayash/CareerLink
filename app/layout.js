import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CareerLink',
  description: 'Empowering futures, one opportunity at a time. Connect, Grow, and Achieve with CareerLink Where Talent Meets Opportunity.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
