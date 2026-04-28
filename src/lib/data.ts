import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { GALLERY_IMAGES as DEFAULT_IMAGES, PROJECTS as DEFAULT_PROJECTS } from '../constants';

export function useGallery() {
  const [images, setImages] = useState(DEFAULT_IMAGES);

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setImages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any)));
      }
    }, (error) => {
       console.error("Gallery snapshot error:", error);
    });
    return () => unsubscribe();
  }, []);

  return images;
}

export function useProjects() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setProjects(snapshot.docs.map(doc => ({ 
            id: doc.id, 
            title: doc.data().title, 
            path: `/${doc.id}`,
            ...doc.data() 
        } as any)));
      }
    });
    return () => unsubscribe();
  }, []);

  return projects;
}
