import React from 'react';
import { Link } from 'react-router-dom';
export function Footer() {
  return <footer className="bg-[#1A1A1A] border-t border-[#2A2A2A] mt-20 md:mt-32">
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
      {/* Ornamental divider */}
      <div className="ornamental-divider mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-playfair font-bold text-[#A2234E] mb-4" style={{
            fontStyle: 'italic'
          }}>
            LEGIER
          </h2>
          <p className="text-sm text-[#D4CFC4] leading-relaxed font-crimson">
            Worldwide. Independent. Reliable. Digitally networked. A global
            media group connecting 115 newspapers across the world.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-sm font-inter uppercase tracking-widest mb-6 text-[#A2234E]">
            Navigation
          </h3>
          <ul className="space-y-3">
            {[{
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
            }].map(item => <li key={item.path}>
              <Link to={item.path} className="text-sm text-[#D4CFC4] hover:text-[#A2234E] transition-colors luxury-underline font-crimson">
                {item.name}
              </Link>
            </li>)}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-inter uppercase tracking-widest mb-6 text-[#A2234E]">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-[#D4CFC4] font-crimson">
            <li>Email: info@legier.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: Global Media Center</li>
            <li>New York, NY 10001</li>
          </ul>
        </div>
      </div>

      {/* Colophon */}
      <div className="pt-8 border-t border-[#2A2A2A]">
        <div className="colophon text-center">
          <p className="mb-2">
            © {new Date().getFullYear()} LEGIER Group. All rights reserved.
          </p>
          <p className="text-xs">
            Published by LEGIER Media Group • Printed on the finest digital
            paper • Typeset in Playfair Display and Crimson Text
          </p>
        </div>
      </div>
    </div>
  </footer>;
}