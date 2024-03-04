import { Inter } from 'next/font/google'
import Sidebar from './components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function DashboardLayout({ children }) {
  return (
    <section className='flex'>
      <div className='w-30'>
        <Sidebar />
      </div>
      <div className="wrapper flex-1 mx-4 flex flex-col min-vh-100 bg-light">
        <div className="wrapper d-flex flex-column min-vh-100 bg-light w-full">
          <div className="body flex-grow-1 px-3">
            {children}
          </div>
          {/* footer */}
        </div>
      </div>
    </section>
  )
}
