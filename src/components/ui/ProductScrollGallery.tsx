import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './ProductScrollGallery.module.css';

interface Product {
  name: string;
  image: string;
  company: string;
}

interface ProductScrollGalleryProps {
  products: Product[];
}

const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${styles.productCard} ${isHovered ? styles.hovered : ''}`}
      style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.cardInner}>
        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.productImage}
            loading="lazy"
          />
          <div className={styles.imageOverlay} />
        </div>
        <div className={styles.productInfo}>
          <span className={styles.productName}>{product.name}</span>
          <span className={styles.companyName}>{product.company}</span>
        </div>
      </div>
    </div>
  );
};

export const ProductScrollGallery: React.FC<ProductScrollGalleryProps> = ({ products }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 20);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', checkScrollPosition, { passive: true });
    checkScrollPosition();

    return () => container.removeEventListener('scroll', checkScrollPosition);
  }, [checkScrollPosition]);

  // Auto-scroll animation
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId: number;
    let lastTime: number;
    const scrollSpeed = 0.08; // pixels per millisecond - smooth scrolling

    const animate = (currentTime: number) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (!isPaused && !isDragging && container) {
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScroll - 1) {
          // Smoothly scroll back to start
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollLeft += deltaTime * scrollSpeed;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 320;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={styles.galleryWrapper}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button
        className={`${styles.navArrow} ${styles.leftArrow} ${showLeftArrow ? styles.visible : ''}`}
        onClick={() => scroll('left')}
        onMouseEnter={() => setIsPaused(true)}
        aria-label="Scroll left"
      >
        ‹
      </button>

      <div
        ref={scrollContainerRef}
        className={`${styles.scrollContainer} ${isDragging ? styles.dragging : ''}`}
        onMouseDown={handleMouseDown}
      >
        <div className={styles.scrollTrack}>
          {products.map((product, index) => (
            <ProductCard key={`${product.name}-${index}`} product={product} index={index} />
          ))}
        </div>
      </div>

      <button
        className={`${styles.navArrow} ${styles.rightArrow} ${showRightArrow ? styles.visible : ''}`}
        onClick={() => scroll('right')}
        onMouseEnter={() => setIsPaused(true)}
        aria-label="Scroll right"
      >
        ›
      </button>

      <div className={styles.fadeLeft} />
      <div className={styles.fadeRight} />
    </div>
  );
};
