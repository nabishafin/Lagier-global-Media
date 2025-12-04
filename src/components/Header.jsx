import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Business Areas',
    path: '/business-areas'
  }, {
    name: 'About Us',
    path: '/about'
  }, {
    name: 'Newspapers',
    path: '/newspapers'
  }, {
    name: 'Scandic Group',
    path: '/scandic-group'
  }, {
    name: 'Login',
    path: '/login'
  }];
  const isActive = (path) => location.pathname === path;
  return <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm masthead">
    <div className="max-w-7xl mx-auto px-6">
      {/* Issue info */}
      <div className="py-2 border-b border-[#2A2A2A] flex justify-between items-center">
        <span className="issue-number">Vol. 1, No. 2024</span>
        <span className="issue-number">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </span>
      </div>

      {/* Main header */}
      <div className="py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-4xl font-playfair font-bold text-[#A2234E] tracking-tight" style={{
            fontStyle: 'italic'
          }}>
            LEGIER
          </h1>
          <span className="ml-3 text-xs text-[#D4CFC4] font-inter uppercase tracking-widest border-l border-[#2A2A2A] pl-3">
            Global Media
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(item => <Link key={item.path} to={item.path} className="relative text-xs font-inter uppercase tracking-widest text-[#D4CFC4] hover:text-[#A2234E] transition-colors luxury-underline">
            {item.name}
            {isActive(item.path) && <motion.div layoutId="activeNav" className="absolute -bottom-2 left-0 right-0 h-[1px] bg-[#A2234E]" transition={{
              type: 'spring',
              stiffness: 380,
              damping: 30
            }} />}
          </Link>)}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#A2234E]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>

    {/* Mobile Navigation Overlay */}
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#0A0A0A] border-b border-[#2A2A2A] overflow-hidden"
        >
          <nav className="flex flex-col p-6 gap-4">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-inter uppercase tracking-widest transition-colors ${isActive(item.path) ? 'text-[#A2234E]' : 'text-[#D4CFC4]'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  </header>;
}