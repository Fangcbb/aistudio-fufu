import ImageCard from './ImageCard';
import { useGallery } from '../lib/data';

export default function Gallery() {
  const images = useGallery();

  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-20 pt-32 pb-20">
      <div className="columns-3 gap-8 md:gap-16">
        {images.map((image, index) => (
          <ImageCard
            key={image.id}
            url={image.url}
            title={image.title}
            category={image.category}
            aspect={image.aspect}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
