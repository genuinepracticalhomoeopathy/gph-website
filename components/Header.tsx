'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
  };

  const handleSectionClick = (sectionId: string) => {
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    closeAllDropdowns();
    setMobileMenuOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('.dropdown-container')) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeDropdown]);

  return (
    <header className="bg-white py-6 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#179E25]">
          <img className='w-[50%] m-0 h-[10] bg-cover' src="/logo.png" alt="Genuine Practical Homoeopathy" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link 
            href="/courses" 
            className="text-gray-700 hover:text-[#179E25] transition-colors font-medium"
          >
            Courses
          </Link>
          
          <Link 
            href="/blogs" 
            className="text-gray-700 hover:text-[#179E25] transition-colors font-medium"
          >
            Blogs
          </Link>
          
          <button 
            onClick={() => handleSectionClick('about')} 
            className="text-gray-700 hover:text-[#179E25] transition-colors font-medium"
          >
            About
          </button>
          
          <button 
            onClick={() => handleSectionClick('testimonials')} 
            className="text-gray-700 hover:text-[#179E25] transition-colors font-medium"
          >
            Testimonials
          </button>
          
          <button 
            onClick={() => handleSectionClick('contact')} 
            className="text-gray-700 hover:text-[#179E25] transition-colors font-medium"
          >
            Contact
          </button>
        </nav>
        
        {/* Login Button */}
        <div className="flex items-center space-x-6">
         
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 py-4">
          <nav className="flex flex-col space-y-4 px-4">
            <Link 
              href="/courses"
              className="text-gray-700 hover:text-[#179E25] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
            
            <Link 
              href="/blogs"
              className="text-gray-700 hover:text-[#179E25] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blogs
            </Link>
            
            <button
              onClick={() => handleSectionClick('about')}
              className="text-left text-gray-700 hover:text-[#179E25] transition-colors font-medium"
            >
              About
            </button>
            
            <button
              onClick={() => handleSectionClick('testimonials')}
              className="text-left text-gray-700 hover:text-[#179E25] transition-colors font-medium"
            >
              Testimonials
            </button>
            
            <button
              onClick={() => handleSectionClick('contact')}
              className="text-left text-gray-700 hover:text-[#179E25] transition-colors font-medium"
            >
              Contact
            </button>
            
            
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;