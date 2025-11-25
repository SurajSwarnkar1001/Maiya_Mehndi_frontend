import React from 'react';
import { motion } from 'framer-motion';
import './Services.css';

const services = [
    {
        title: "Bridal Mehndi",
        description: "Intricate and traditional designs for your special day. We specialize in Marwari, Arabic, and contemporary styles.",
        icon: "👰"
    },
    {
        title: "Guest Mehndi",
        description: "Beautiful and quick designs for friends and family at weddings and parties.",
        icon: "✨"
    },
    {
        title: "Festive Henna",
        description: "Celebrate Karwa Chauth, Teej, and Eid with our exclusive festive patterns.",
        icon: "🎉"
    },
    {
        title: "Custom Designs",
        description: "Have a specific design in mind? We bring your vision to life with precision.",
        icon: "🎨"
    }
];

const Services = () => {
    return (
        <section className="services">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Our Services
                </motion.h2>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <motion.div
                            className="service-card"
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(128, 0, 32, 0.15)" }}
                        >
                            <div className="icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
