import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API_URL from '../config/api.js';
import './Gallery.css';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);
    const loader = useRef(null);

    const fetchImages = async () => {
        if (loading || error || !hasMore) return;
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/images`);
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();

            if (data.length === 0 && images.length === 0) {
                const placeholders = Array.from({ length: 6 }).map((_, i) => ({
                    _id: Date.now() + i,
                    imageUrl: `https://placehold.co/600x800/800020/FDFBF7?text=Design+${i + 1}`,
                    title: `Mehndi Design ${i + 1}`
                }));
                setImages(placeholders);
                setHasMore(false); // No more to load
            } else if (data.length > 0) {
                // Simple deduplication based on ID to avoid key errors if re-fetching same data
                setImages(prev => {
                    const newImages = data.filter(d => !prev.some(p => (p._id || p.id) === (d._id || d.id)));
                    if (newImages.length === 0) {
                        setHasMore(false); // No new images
                    }
                    return [...prev, ...newImages];
                });
            } else {
                setHasMore(false); // No more images
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            setError(true);
            setHasMore(false);
        } finally {
            setLoading(false);
            setInitialLoad(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && !error && hasMore) {
                // Only fetch more if we have more to load
                // fetchImages(); // Disabled for now - single fetch only
            }
        }, { threshold: 0.1 });

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [loading, error]);

    const openFullscreen = (img) => {
        setFullscreenImage(img);
        document.body.style.overflow = 'hidden';
    };

    const closeFullscreen = () => {
        setFullscreenImage(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <section className="gallery" id="gallery">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Our Masterpieces
                </motion.h2>
                <div className="gallery-grid">
                    {images.map((img) => (
                        <motion.div
                            className="gallery-item"
                            key={img._id || img.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ y: -5 }}
                        >
                            <img src={img.base64Data || img.imageUrl || img.url} alt={img.title} loading="lazy" />
                            <button
                                className="fullscreen-btn"
                                onClick={() => openFullscreen(img)}
                                aria-label="View fullscreen"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                                </svg>
                            </button>
                            <div className="overlay">
                                <h3>{img.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div ref={loader} className="loader">
                    {loading && <div className="spinner"></div>}
                    {error && (
                        <div className="error-container">
                            <p>Failed to load images.</p>
                            <button onClick={() => { setError(null); fetchImages(); }} className="retry-btn">
                                Retry
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Fullscreen Modal */}
            <AnimatePresence>
                {fullscreenImage && (
                    <motion.div
                        className="fullscreen-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeFullscreen}
                    >
                        <button className="close-btn" onClick={closeFullscreen} aria-label="Close fullscreen">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <motion.div
                            className="fullscreen-content"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={fullscreenImage.imageUrl || fullscreenImage.url} alt={fullscreenImage.title} />
                            <div className="fullscreen-info">
                                <h3>{fullscreenImage.title}</h3>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
