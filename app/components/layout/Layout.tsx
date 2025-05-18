import Header from './Header'
import Footer from './Footer'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: '400', subsets: ['latin'] })

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={`min-h-screen flex flex-col ${poppins.className}`}>
      <Header />
      <main className={`flex-grow mt-40`}>
        {children}  
      </main>
      <Footer />
    </div>
  )
}

export default Layout 