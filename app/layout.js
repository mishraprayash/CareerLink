import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar'
import Footer from './components/footer'

const inter = Inter({ subsets: ['latin'] })
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Provider from './components/provider'
export const metadata = {
  title: 'CareerLink',
  description: 'Empowering futures, one opportunity at a time. Connect, Grow, and Achieve with CareerLink Where Talent Meets Opportunity.',
  icons: {
    icon: '/logo.png', // /public path
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Provider>
        <Navbar/>
        {children}
        <Footer/>
        </Provider>
        </body>
    </html>
  )
}
