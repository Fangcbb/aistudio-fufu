import { useState } from 'react';
import { motion } from 'motion/react';
import Modal from './Modal';

interface ImageCardProps {
  key?: number | string;
  url: string;
  title: string;
  category: string;
  aspect: string;
  index: number;
}

export default function ImageCard({ url, title, aspect, index }: ImageCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.21, 0.45, 0.32, 0.9] }}
        className={`relative group mb-8 md:mb-16 break-inside-avoid overflow-hidden bg-transparent cursor-pointer`}
        onClick={() => setIsModalOpen(true)}
      >
        <div className={`relative w-full ${aspect} overflow-hidden`}>
          <img
            src={url}
            alt={title}
            className="w-full h-full object-cover md:grayscale transition-all duration-1000 md:group-hover:grayscale-0 md:group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-3 md:p-5 pointer-events-none">
            <h3 className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] text-white drop-shadow-md transform translate-y-2 md:group-hover:translate-y-0 transition-transform duration-500 font-bold">
              {title}
            </h3>
          </div>
        </div>
      </motion.div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        imageUrl={url} 
        title={title} 
      />
    </>
  );
}

