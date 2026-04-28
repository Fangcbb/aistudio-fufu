import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useProjects } from '../lib/data';

interface NavLinkProps {
  to: string;
  children: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, isActive, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative group overflow-hidden h-5 block text-[10px] uppercase tracking-[0.3em] font-bold ${
        isActive ? 'text-brand-text' : 'text-brand-muted'
      }`}
    >
      <div className="transition-transform duration-500 ease-[0.76, 0, 0.24, 1] group-hover:-translate-y-1/2">
        <span className="h-5 flex items-center whitespace-nowrap">{children}</span>
        <span className="h-5 flex items-center text-brand-text whitespace-nowrap">{children}</span>
      </div>
    </Link>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const projects = useProjects();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-bg/80 backdrop-blur-sm border-b border-brand-border">
      <div className="max-w-[1600px] mx-auto px-6 md:px-20 h-24 flex items-center justify-between">
        {/* Left Nav */}
        <div className="hidden lg:flex items-center gap-12">
          <NavLink to="/portfolio" isActive={location.pathname === '/portfolio'}>
            Portfolio
          </NavLink>
          <NavLink to="/classification" isActive={location.pathname === '/classification'}>
            Classification
          </NavLink>
        </div>

        {/* Center Logo */}
        <Link 
          to="/" 
          className="font-serif text-3xl tracking-[0.4em] font-light uppercase hover:opacity-70 transition-opacity ml-[0.4em]"
        >
          Levon Biss
        </Link>

        {/* Right Nav */}
        <div className="hidden lg:flex items-center gap-12">
          <NavLink to="/about" isActive={location.pathname === '/about'}>
            About Me
          </NavLink>
          <NavLink to="/contact" isActive={location.pathname === '/contact'}>
            Contact
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 hover:bg-brand-text/5 rounded-full transition-colors font-medium"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-brand-bg border-b border-brand-text/10 px-6 py-10 flex flex-col items-center gap-8"
          >
            {projects.map((project: any) => (
              <NavLink 
                key={project.id} 
                to={project.path} 
                isActive={location.pathname === project.path}
                onClick={() => setIsOpen(false)}
              >
                {project.title}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
