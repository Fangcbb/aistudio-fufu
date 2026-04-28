import { useParams } from 'react-router-dom';
import Gallery from './components/Gallery';

export default function ProjectPage() {
  const { projectId } = useParams();
  
  return (
    <main className="min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 md:px-20 pt-48 pb-10">
        <h1 className="font-serif text-4xl md:text-6xl font-light tracking-[0.2em] uppercase border-b border-brand-border pb-10 mb-10">
          {projectId ? projectId.replace(/-/g, ' ') : 'Overview'}
        </h1>
        <p className="text-brand-muted text-sm uppercase tracking-[0.1em] font-medium max-w-2xl leading-relaxed mb-20 opacity-60">
          An exploration into the architectural beauty of the natural world.
        </p>
      </div>
      <Gallery />
    </main>
  );
}
