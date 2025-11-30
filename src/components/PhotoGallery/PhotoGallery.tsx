import { useState } from 'react';
import styles from './styles.module.scss';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';

export type ImageItem = {
  src: string;
  alt: string;
};

type PhotoGalleryProps = {
  images: ImageItem[];
};

export function PhotoGallery({ images }: PhotoGalleryProps) {
  const [index, setIndex] = useState(0);
  const prev = () => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <div className={styles.slider}>
      <button className={styles.slider_arrow} onClick={prev}>
        <ArrowBigLeft />
      </button>
      <div className={styles.slider_wrapper}>
        {images.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className={`${styles.slider_image} ${i === index ? styles.active : ''}`}
          />
        ))}
      </div>

      <button className={styles.slider_arrow} onClick={next}>
        <ArrowBigRight />
      </button>
    </div>
  );
}
