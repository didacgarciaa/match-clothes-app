"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { colors } from '@/lib/config/colors'
import Image from 'next/image'

const Header = () => {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <nav className="container mx-auto px-4 ">
        <div className="flex items-center justify-center">
          <Link href="/" className="text-2xl font-bold" style={{ color: colors.primary }}>
            <Image src="/logo.png" alt="Match Clothes App" width={100} height={100} className="mr-15" />
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/pages/contact" 
              className={`transition-colors duration-200 ${
                isActive('/pages/contact') ? 'text-[#e60023] font-medium' : 'hover:text-[#e60023]'
              }`}
              style={{ color: isActive('/pages/contact') ? colors.primary : colors.text }}
            >
              Contact
            </Link>
            <Link 
              href="/pages/info" 
              className={`transition-colors duration-200 ${
                isActive('/pages/info') ? 'text-[#e60023] font-medium' : 'hover:text-[#e60023]'
              }`}
              style={{ color: isActive('/pages/info') ? colors.primary : colors.text }}
            >
              Info
            </Link>
            <Link 
              href="/pages/virtual-try-on" 
              className={`transition-colors duration-200 ${
                isActive('/pages/virtual-try-on') ? 'text-[#e60023] font-medium' : 'hover:text-[#e60023]'
              }`}
              style={{ color: isActive('/pages/virtual-try-on') ? colors.primary : colors.text }}
            >
              Virtual Try On
            </Link>
          </div>

          <button className="md:hidden">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header 