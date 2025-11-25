import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* About Section */}
                    <div className="footer-section">
                        <h3>Maiya Mehndi</h3>
                        <p>Creating beautiful memories with traditional artistry and modern elegance.</p>
                        {/* <div className="social-links">
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                        </div> */}
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#gallery">Gallery</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#founders">Our Team</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-section">
                        <h4>Contact Us</h4>
                        <ul>
                            <li>
                                <span>surajswarnkar839@gmail.com</span>
                            </li>
                            <li>
                                <span>+91 7858036501</span>
                            </li>
                            <li>
                                <span>Musaboni, Jharkhand</span>
                            </li>
                        </ul>
                    </div>

                    {/* Follow Our Founders */}
                    <div className="footer-section">
                        <h4>Follow Our Founders</h4>
                        <div className="founders-social">
                            <div className="founder-social-item">
                                <span className="founder-name">Suraj Swarnkar</span>
                                <a href="https://www.instagram.com/suraj_swarnkar18" target="_blank" rel="noopener noreferrer" className="instagram-link">
                                    <Instagram size={18} />
                                    <span>@suraj_swarnkar18</span>
                                </a>
                            </div>
                            <div className="founder-social-item">
                                <span className="founder-name">Anjali Kumari</span>
                                <a href="https://www.instagram.com/anjali_verma_1926" target="_blank" rel="noopener noreferrer" className="instagram-link">
                                    <Instagram size={18} />
                                    <span>@anjali_verma_1926</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Maiya Mehndi. All rights reserved.</p>
                    <p className="credit">Crafted with ❤️ by Suraj Swarnkar</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
