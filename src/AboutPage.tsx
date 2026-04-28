import { motion } from 'motion/react';

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-48 pb-20 px-6 md:px-20 bg-brand-bg">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl font-light tracking-[0.1em] uppercase mb-16 border-b border-brand-border pb-10">
            About Levon Biss
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="aspect-[3/4] bg-brand-border overflow-hidden">
              <img 
                src="https://picsum.photos/seed/levon/1200/1600" 
                alt="Levon Biss" 
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex flex-col gap-8 py-4">
              <p className="text-xl md:text-2xl font-serif italic text-brand-muted leading-relaxed">
                "My work is a celebration of the architectural beauty of the natural world. Through extreme macro photography, I aim to reveal the hidden complexities that exist within even the smallest specimens."
              </p>
              
              <div className="space-y-6 text-brand-muted leading-relaxed">
                <p>
                  Levon Biss is an award-winning British photographer who has achieved international recognition for his unique approach to macro photography. His work is held in numerous private and public collections and has been exhibited in museums around the world.
                </p>
                <p>
                  Biss's technique involves photographing a single specimen thousands of times using varying lighting setups and focal planes. These images are then painstakingly combined to create a single, high-resolution final photograph that reveals details invisible to the naked eye. This process, which can take several weeks for a single specimen, results in images of startling clarity and depth.
                </p>
                <p>
                  Through his "Microsculpture" series and later works like "Seeds & Fruits", Biss continues to push the boundaries of photographic technology to document the intricate beauty of nature at a scale that challenges our perception of the world.
                </p>
              </div>
              
              <div className="pt-10 flex flex-wrap gap-4">
                <div className="px-6 py-3 border border-brand-border text-[10px] uppercase tracking-[0.2em] font-bold">
                  20+ Museum Exhibitions
                </div>
                <div className="px-6 py-3 border border-brand-border text-[10px] uppercase tracking-[0.2em] font-bold">
                  International Design Awards
                </div>
                <div className="px-6 py-3 border border-brand-border text-[10px] uppercase tracking-[0.2em] font-bold">
                  Ted Speaker
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
