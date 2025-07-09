import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">University of UP</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex space-x-4">
              {['Home', 'Academics', 'Admissions', 'Research', 'Campus Life'].map((label, i) => (
                <Link
                  key={i}
                  to={`/${label.toLowerCase().replace(/\s/g, '-')}`}
                  className="text-gray-300 hover:bg-indigo-800 hover:text-white px-3 py-2 rounded-md"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div className="md:hidden" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['Home', 'Academics', 'Admissions', 'Research', 'Campus Life'].map((label, i) => (
              <Link
                key={i}
                to={`/${label.toLowerCase().replace(/\s/g, '-')}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-indigo-800 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
