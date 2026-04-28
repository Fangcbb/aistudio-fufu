import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { 
    id: 'entomology', 
    title: 'Entomology', 
    count: 24, 
    image: 'https://picsum.photos/seed/bug/800/600',
    description: 'A deep dive into the extraordinary structural colors and intricate armory of the insect world.'
  },
  { 
    id: 'botany', 
    title: 'Botany', 
    count: 18, 
    image: 'https://picsum.photos/seed/flower/800/600',
    description: 'Capturing the delicate symmetry and complex reproduction systems of rare botanical specimens.'
  },
  { 
    id: 'ichthyology', 
    title: 'Ichthyology', 
    count: 12, 
    image: 'https://picsum.photos/seed/fish/800/600',
    description: 'Revealing the iridescent scales and skeletal structures of marine life from the deep oceans.'
  },
  { 
    id: 'paleontology', 
    title: 'Paleontology', 
    count: 9, 
    image: 'https://picsum.photos/seed/fossil/800/600',
    description: 'Documenting prehistoric life trapped in amber and the remnants of lost worlds.'
  },
];

export default function ClassificationPage() {
  return (
    <main className="min-h-screen pt-48 pb-20 px-6 md:px-20 bg-brand-bg">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <header className="mb-20 border-b border-brand-border pb-10">
            <h1 className="font-serif text-5xl md:text-7xl font-light tracking-[0.1em] uppercase mb-6">
              Classification
            </h1>
            <p className="text-brand-muted text-sm uppercase tracking-[0.2em] font-medium max-w-2xl">
              Organizing the natural world by family, genus, and species through the lens of extreme macro.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {CATEGORIES.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] bg-brand-border overflow-hidden mb-8">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex justify-between items-end mb-4">
                   <h2 className="font-serif text-3xl font-light tracking-wide">{cat.title}</h2>
                   <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">{cat.count} Sets</span>
                </div>
                <p className="text-sm text-brand-muted leading-relaxed mb-8 opacity-60 group-hover:opacity-100 transition-opacity">
                  {cat.description}
                </p>
                <Link to={`/portfolio`} className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-brand-text pb-1 hover:border-brand-muted transition-colors">
                  Explore Collection
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
