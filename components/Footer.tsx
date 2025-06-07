import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">GPH</h3>
            <p className="text-slate-400 mb-4">
              Empowering healthcare professionals with comprehensive homeopathic education.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
             
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-slate-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/#courses" className="text-slate-400 hover:text-white transition-colors">Courses</Link></li>
              <li><Link href="/#testimonials" className="text-slate-400 hover:text-white transition-colors">Testimonials</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Courses</h3>
            <ul className="space-y-2">
              <li><Link href="/courses" className="text-slate-400 hover:text-white transition-colors">All Courses</Link></li>
              <li><Link href="/courses" className="text-slate-400 hover:text-white transition-colors">Genuine Practical Homeopathy</Link></li>
              <li><Link href="/courses" className="text-slate-400 hover:text-white transition-colors">Advanced Clinical Practice</Link></li>
              <li><Link href="/courses" className="text-slate-400 hover:text-white transition-colors">Business Growth Program</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-slate-400">
              <li>Email: genuinepracticalhomoeopathy@gmail.com</li>
              {/* <li>Phone: +1 (555) 123-4567</li> */}
              {/* <li>Address: 123 Healing Street, Wellness City, 12345</li> */}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              © 2025 Genuine Practical Homoeopathy. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              {/* <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link> */}
              {/* <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;