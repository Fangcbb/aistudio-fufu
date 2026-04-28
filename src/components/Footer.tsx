import { Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-brand-bg border-t border-brand-border py-10 px-6 md:px-20">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[0.3em] font-medium text-brand-muted">
        <div>&copy; 2026 Levon Biss Photography Ltd. All rights reserved.</div>
        
        <div className="flex gap-10">
          <a href="#" className="hover:text-brand-text transition-colors">Instagram</a>
          <a href="#" className="hover:text-brand-text transition-colors">Twitter</a>
          <a href="#" className="hover:text-brand-text transition-colors">Youtube</a>
        </div>

        <div className="text-right hidden lg:block">
          Fine Art Prints Available Globally
        </div>
      </div>
    </footer>
  );
}
