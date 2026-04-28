import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Instagram, Twitter, Youtube } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-48 pb-20 px-6 md:px-20 bg-brand-bg">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl font-light tracking-[0.1em] uppercase mb-16 border-b border-brand-border pb-10">
            Get In Touch
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <section>
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-muted mb-8">Studio Enquiries</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-6">
                    <Mail size={20} className="text-brand-muted shrink-0 mt-1" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-1">Email</p>
                      <a href="mailto:studio@levonbiss.com" className="text-xl md:text-2xl font-serif hover:text-brand-muted transition-colors">studio@levonbiss.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <Phone size={20} className="text-brand-muted shrink-0 mt-1" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-1">Phone</p>
                      <p className="text-xl md:text-2xl font-serif">+44 (0) 7812 123 456</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-muted mb-8">Location</h3>
                <div className="flex items-start gap-6">
                  <MapPin size={20} className="text-brand-muted shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-1">Studio</p>
                    <p className="text-xl md:text-2xl font-serif leading-relaxed">
                      Westcombe Park, London<br />
                      SE3 7UY, United Kingdom
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-muted mb-8">Follow</h3>
                <div className="flex gap-8">
                  <a href="#" className="hover:text-brand-muted transition-colors"><Instagram size={24} /></a>
                  <a href="#" className="hover:text-brand-muted transition-colors"><Twitter size={24} /></a>
                  <a href="#" className="hover:text-brand-muted transition-colors"><Youtube size={24} /></a>
                </div>
              </section>
            </div>

            <div className="bg-brand-border/30 p-10 md:p-12">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-muted mb-10">Send a Message</h3>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Name</label>
                    <input type="text" className="w-full bg-transparent border-b border-brand-border py-2 focus:border-brand-text outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Email</label>
                    <input type="email" className="w-full bg-transparent border-b border-brand-border py-2 focus:border-brand-text outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Subject</label>
                  <input type="text" className="w-full bg-transparent border-b border-brand-border py-2 focus:border-brand-text outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Message</label>
                  <textarea rows={6} className="w-full bg-transparent border border-brand-border p-4 focus:border-brand-text outline-none transition-colors resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-brand-text text-brand-bg py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:opacity-90 transition-opacity">
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
