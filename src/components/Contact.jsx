import React, { useState } from 'react';
import { motion } from 'framer-motion';
import API_URL from '../config/api.js';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage('');

        try {
            const response = await fetch(`${API_URL}/api/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage('Thank you! Your message has been sent successfully.');
                setFormData({ name: '', phone: '', message: '' });
            } else {
                setMessage('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error sending message. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="contact">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Book Your Appointment
                </motion.h2>
                <div className="contact-content">
                    <motion.form
                        className="contact-form"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Message / Date of Event"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <motion.button
                            type="submit"
                            className="submit-btn"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={submitting}
                        >
                            {submitting ? 'Sending...' : 'Send Message'}
                        </motion.button>
                        {message && <p className={`form-message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
                    </motion.form>
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <h3>Get in Touch</h3>
                        <p>Ready to adorn your hands with elegance? Contact us today.</p>
                        <div className="info-item">
                            <span>Email:</span> surajswarnkar839@gmail.com
                        </div>
                        <div className="info-item">
                            <span>Phone:</span> +91 7858036501
                        </div>
                        <div className="info-item">
                            <span>Location:</span> Musaboni, jharkhand
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
