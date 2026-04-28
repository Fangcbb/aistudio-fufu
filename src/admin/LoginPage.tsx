import React from 'react';
import { motion } from 'motion/react';
import { login, auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login();
      if (auth.currentUser?.email === 'fangcbb1@gmail.com') {
        navigate('/admin/dashboard');
      } else {
        alert('Access denied. Only the administrator can log in.');
        auth.signOut();
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-bg px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full border border-brand-border p-12 text-center"
      >
        <h1 className="font-serif text-3xl tracking-widest uppercase mb-10">Admin Access</h1>
        <p className="text-brand-muted text-xs uppercase tracking-widest mb-12 leading-relaxed">
          Log in with your Google account to access the site management system.
        </p>
        
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-4 bg-brand-text text-brand-bg py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:opacity-90 transition-all font-sans"
        >
          <LogIn size={16} />
          Sign in with Google
        </button>
      </motion.div>
    </main>
  );
}
