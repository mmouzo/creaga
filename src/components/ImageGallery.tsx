import { useState, useEffect } from 'react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  title: string;
  description: string;
  metadata?: {
    date?: string;
    location?: string;
    type?: string;
  };
}

interface ImageGalleryProps {
  images: GalleryImage[];
  categories: string[];
  title?: string;
}

export default function ImageGallery({ images, categories, title = "Galería Multimedia" }: ImageGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(images);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.category === selectedCategory));
    }
  }, [selectedCategory, images]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const handleImageLoad = (imageId: string) => {
    setImagesLoaded(prev => new Set([...prev, imageId]));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-serif text-criaga-red mb-4">{title}</h2>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-criaga-red text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas ({images.length})
          </button>
          {categories.map((category) => {
            const count = images.filter(img => img.category === category).length;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-criaga-red text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in"
            onClick={() => openLightbox(index)}
          >
            <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
              {!imagesLoaded.has(image.id) && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                onLoad={() => handleImageLoad(image.id)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-criaga-red mb-1 line-clamp-1">{image.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">{image.description}</p>
              {image.metadata && (
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  {image.metadata.type && (
                    <span className="bg-gray-100 px-2 py-1 rounded">{image.metadata.type}</span>
                  )}
                  {image.metadata.location && (
                    <span className="bg-gray-100 px-2 py-1 rounded">{image.metadata.location}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500">No se encontraron imágenes en esta categoría</p>
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Buttons */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image */}
            <div className="flex flex-col items-center justify-center max-w-full max-h-full">
              <img
                src={filteredImages[currentImageIndex]?.src}
                alt={filteredImages[currentImageIndex]?.alt}
                className="max-w-full max-h-[80vh] object-contain"
              />
              
              {/* Image Info */}
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 mt-4 max-w-2xl">
                <h3 className="font-bold text-criaga-red mb-2">
                  {filteredImages[currentImageIndex]?.title}
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  {filteredImages[currentImageIndex]?.description}
                </p>
                {filteredImages[currentImageIndex]?.metadata && (
                  <div className="flex flex-wrap gap-2 text-xs">
                    {Object.entries(filteredImages[currentImageIndex].metadata || {}).map(([key, value]) => (
                      <span key={key} className="bg-gray-100 px-2 py-1 rounded">
                        {key}: {value}
                      </span>
                    ))}
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-2">
                  {currentImageIndex + 1} de {filteredImages.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}