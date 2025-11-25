import React from 'react';
import { motion } from 'framer-motion';
import './Founders.css';

const Founders = () => {
    const founders = [
        {
            name: 'Suraj Swarnkar',
            role: 'Founder & Creative Director',
            image: '/suraj4.jpg',
            description: 'With a passion for traditional art and modern aesthetics, Suraj brings creative vision and business expertise to Maiya Mehndi.',
        },
        {
            name: 'Anjali Kumari',
            role: 'Co-Founder & Lead Artist',
            image: '/anjali.jpg',
            description: 'A master mehndi artist with years of experience, Anjali specializes in intricate bridal designs and personalized patterns.',
        },
    ];

    return (
        <section className="founders">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Meet Our Founders
                </motion.h2>
                <motion.p
                    className="founders-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    The Creative Minds Behind Maiya Mehndi
                </motion.p>

                <div className="founders-grid">
                    {founders.map((founder, index) => (
                        <motion.div
                            className="founder-card"
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <div className="founder-image-wrapper">
                                <img src={founder.image} alt={founder.name} />
                                <div className="image-overlay"></div>
                            </div>
                            <div className="founder-info">
                                <h3>{founder.name}</h3>
                                <span className="founder-role">{founder.role}</span>
                                <p>{founder.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Founders;
