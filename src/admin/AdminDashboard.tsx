import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth, logout } from '../lib/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { 
  Image as ImageIcon, 
  Settings, 
  Info, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X,
  LayoutGrid,
  Mail
} from 'lucide-react';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';
import { useNavigate } from 'react-router-dom';

type Tab = 'gallery' | 'projects' | 'content';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('gallery');
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user || user.email !== 'fangcbb1@gmail.com') {
        navigate('/admin/login');
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!loading) {
      fetchData();
    }
  }, [activeTab, loading]);

  const fetchData = async () => {
    setLoading(true);
    const path = activeTab === 'gallery' ? 'gallery' : activeTab === 'projects' ? 'projects' : 'site_content';
    try {
      const q = query(collection(db, path), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      // If collection doesn't exist or other error
      try {
           const snapshot = await getDocs(collection(db, path));
           setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {
          handleFirestoreError(e, OperationType.LIST, path);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="w-10 h-10 border-2 border-brand-text border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-brand-border p-8 flex flex-col fixed h-full">
        <h2 className="font-serif text-xl tracking-widest uppercase mb-12">CMS Dashboard</h2>
        
        <nav className="flex-grow space-y-4">
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center gap-4 px-4 py-3 text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === 'gallery' ? 'bg-brand-text text-brand-bg' : 'hover:bg-brand-text/5 text-brand-muted'}`}
          >
            <ImageIcon size={16} /> Gallery
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-4 px-4 py-3 text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === 'projects' ? 'bg-brand-text text-brand-bg' : 'hover:bg-brand-text/5 text-brand-muted'}`}
          >
            <LayoutGrid size={16} /> Projects
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center gap-4 px-4 py-3 text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === 'content' ? 'bg-brand-text text-brand-bg' : 'hover:bg-brand-text/5 text-brand-muted'}`}
          >
            <Info size={16} /> Pages
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-4 px-4 py-3 text-[10px] uppercase tracking-widest font-bold text-brand-muted hover:text-red-500 transition-all border-t border-brand-border pt-8"
        >
          <LogOut size={16} /> Logout
        </button>
      </aside>

      {/* Content */}
      <main className="flex-grow ml-64 p-12 overflow-y-auto">
        <header className="flex justify-between items-end border-b border-brand-border pb-10 mb-10">
          <div>
            <h1 className="font-serif text-4xl uppercase tracking-widest mb-2">{activeTab}</h1>
            <p className="text-brand-muted text-[10px] uppercase tracking-widest">Manage your site's {activeTab} content</p>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-brand-text text-brand-bg px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:opacity-90"
          >
            <Plus size={16} /> Add New {activeTab === 'gallery' ? 'Image' : 'Item'}
          </button>
        </header>

        {loading ? (
             <div className="py-20 text-center">
                 <div className="inline-block w-8 h-8 border-2 border-brand-text border-t-transparent animate-spin mb-4"></div>
                 <p className="text-[10px] uppercase tracking-widest opacity-40">Loading data...</p>
             </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {items.map(item => (
                <ItemCard 
                    key={item.id} 
                    item={item} 
                    type={activeTab} 
                    onRefresh={fetchData} 
                />
              ))}
            </div>
        )}
      </main>

      {/* Add Modal */}
      <AnimatePresence>
        {isAdding && (
          <Modal close={() => setIsAdding(false)} type={activeTab} onRefresh={fetchData} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ItemCard({ item, type, onRefresh }: { item: any; type: Tab; onRefresh: () => void; key?: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, type === 'gallery' ? 'gallery' : type === 'projects' ? 'projects' : 'site_content', item.id));
      onRefresh();
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${type}/${item.id}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={`group relative border border-brand-border p-6 hover:border-brand-text transition-colors flex flex-col gap-4 ${isDeleting ? 'opacity-30 pointer-events-none' : ''}`}>
      {type === 'gallery' ? (
          <div className="aspect-square bg-brand-border overflow-hidden mb-2">
            <img src={item.url} alt={item.title} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
          </div>
      ) : null}
      
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest mb-1">{item.title || item.key}</h3>
        <p className="text-[10px] text-brand-muted tracking-widest uppercase">Order: {item.order}</p>
      </div>

      <div className="flex gap-4 mt-auto pt-4 border-t border-brand-border opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={handleDelete} className="text-brand-muted hover:text-red-500 transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

function Modal({ close, type, onRefresh }: { close: () => void; type: Tab; onRefresh: () => void }) {
  const [formData, setFormData] = useState<any>({
    title: '',
    url: '',
    order: 0,
    type: 'portfolio',
    description: '',
    projectId: 'all'
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const path = type === 'gallery' ? 'gallery' : type === 'projects' ? 'projects' : 'site_content';
    
    try {
      const data = { ...formData, order: Number(formData.order) };
      if (type === 'gallery') {
          delete data.description;
          delete data.type;
      } else {
          delete data.url;
          delete data.projectId;
      }
      
      await addDoc(collection(db, path), data);
      onRefresh();
      close();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-brand-bg/90 backdrop-blur-md"
        onClick={close}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-brand-bg border border-brand-border p-10 max-w-xl w-full"
      >
        <button onClick={close} className="absolute top-6 right-6 text-brand-muted hover:text-brand-text">
          <X size={20} />
        </button>
        
        <h2 className="font-serif text-2xl uppercase tracking-widest mb-10">Add New {type === 'gallery' ? 'Image' : 'Project'}</h2>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label className="block text-[10px] uppercase font-bold tracking-widest opacity-40">Title</label>
            <input 
              required
              className="w-full bg-transparent border-b border-brand-border py-2 focus:border-brand-text outline-none transition-colors"
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          {type === 'gallery' && (
            <div className="space-y-4">
              <label className="block text-[10px] uppercase font-bold tracking-widest opacity-40">Image URL</label>
              <input 
                required
                className="w-full bg-transparent border-b border-brand-border py-2 focus:border-brand-text outline-none transition-colors"
                value={formData.url} 
                onChange={e => setFormData({...formData, url: e.target.value})}
              />
            </div>
          )}

          {type === 'projects' && (
              <>
                 <div className="space-y-4">
                    <label className="block text-[10px] uppercase font-bold tracking-widest opacity-40">Category Type</label>
                    <select 
                        className="w-full bg-transparent border-b border-brand-border py-2 focus:border-brand-text outline-none transition-colors"
                        value={formData.type}
                        onChange={e => setFormData({...formData, type: e.target.value})}
                    >
                        <option value="portfolio">Portfolio</option>
                        <option value="classification">Classification</option>
                    </select>
                </div>
                <div className="space-y-4">
                    <label className="block text-[10px] uppercase font-bold tracking-widest opacity-40">Description</label>
                    <textarea 
                        className="w-full bg-transparent border border-brand-border p-4 h-32 focus:border-brand-text outline-none transition-colors resize-none mb-4"
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                </div>
              </>
          )}

          <div className="space-y-4">
            <label className="block text-[10px] uppercase font-bold tracking-widest opacity-40">Display Order</label>
            <input 
              type="number"
              className="w-full bg-transparent border-b border-brand-border py-2 focus:border-brand-text outline-none transition-colors"
              value={formData.order} 
              onChange={e => setFormData({...formData, order: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            className="w-full py-5 bg-brand-text text-brand-bg text-[10px] uppercase tracking-widest font-bold hover:opacity-90 transition-opacity disabled:opacity-50 mt-4 flex items-center justify-center gap-3"
          >
            {submitting ? (
                <div className="w-4 h-4 border-2 border-brand-bg border-t-transparent animate-spin"></div>
            ) : <Save size={16} />} 
            Save Entry
          </button>
        </form>
      </motion.div>
    </div>
  );
}
