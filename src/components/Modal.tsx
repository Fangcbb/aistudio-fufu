import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export default function Modal({ isOpen, onClose, imageUrl, title }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-bg p-4 md:p-10 cursor-zoom-out"
          onClick={onClose}
        >
          <button 
            className="absolute top-8 right-8 p-3 hover:bg-brand-text/5 rounded-full z-[110] transition-colors"
            onClick={onClose}
          >
            <X size={24} />
          </button>
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-full max-h-full flex flex-col items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={imageUrl.replace('800', '1600').replace('1200', '2400')} 
              alt={title}
              className="max-w-full max-h-[80vh] object-contain cursor-default"
              referrerPolicy="no-referrer"
            />

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
