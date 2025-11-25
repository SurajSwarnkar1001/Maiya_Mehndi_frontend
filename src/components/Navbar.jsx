import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Image, Info, Phone } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuItems = [
        { title: 'Home', path: '/', section: null, icon: <Home size={20} /> },
        { title: 'Gallery', path: '/', section: 'gallery', icon: <Image size={20} /> },
        { title: 'Services', path: '/', section: 'services', icon: <Info size={20} /> },
        { title: 'Contact', path: '/', section: 'contact', icon: <Phone size={20} /> },
    ];

    const handleNavClick = (e, section) => {
        if (!section) return; // Home link just goes to top

        e.preventDefault();

        // If not on home page, navigate first
        if (location.pathname !== '/') {
            window.location.href = `/#${section}`;
            return;
        }

        // Smooth scroll to section
        const element = document.querySelector(`.${section}`);
        if (element) {
            const navHeight = 80; // Navbar height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }

        if (isOpen) toggleMenu();
    };

    const sidebarVariants = {
        closed: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
        open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <Link to="/" className="nav-logo">
                        Maiya Mehndi
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="nav-links">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                {item.section ? (
                                    <a
                                        href={`#${item.section}`}
                                        onClick={(e) => handleNavClick(e, item.section)}
                                    >
                                        {item.title}
                                    </a>
                                ) : (
                                    <Link to={item.path}>{item.title}</Link>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Button */}
                    <div className="nav-toggle" onClick={toggleMenu}>
                        <Menu size={28} color="var(--color-primary)" />
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu}
                        />
                        <motion.div
                            className="sidebar"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={sidebarVariants}
                        >
                            <div className="sidebar-header">
                                <h3>Menu</h3>
                                <div className="close-btn" onClick={toggleMenu}>
                                    <X size={28} color="var(--color-primary)" />
                                </div>
                            </div>
                            <ul className="sidebar-links">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        {item.section ? (
                                            <a
                                                href={`#${item.section}`}
                                                onClick={(e) => handleNavClick(e, item.section)}
                                            >
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </a>
                                        ) : (
                                            <Link to={item.path} onClick={toggleMenu}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
