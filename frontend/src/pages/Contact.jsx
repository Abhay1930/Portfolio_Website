import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/components.css';
import '../styles/contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('Message Sent Successfully!');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => {
                    setShowForm(false);
                    setStatus('');
                }, 3000);
            } else {
                setStatus('Failed to send message.');
            }
        } catch (error) {
            setStatus('Error connecting to Server.');
        }
    };

    return (
        <motion.div
            className="contact-container dark-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="contact-content">
                <motion.h1
                    className="contact-giant-title"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    CONTACT
                </motion.h1>

                <motion.h2
                    className="contact-subtitle"
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    LET'S BUILD TOGETHER
                </motion.h2>

                <motion.div
                    className="contact-action-wrapper"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <button
                        className="contact-drop-line"
                        onClick={() => setShowForm(!showForm)}
                    >
                        DROP ME A LINE
                    </button>
                </motion.div>

                <motion.a
                    href="mailto:devxabhay@gmail.com"
                    className="contact-email"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    DEVXABHAY@GMAIL.COM
                </motion.a>

                <AnimatePresence>
                    {showForm && (
                        <motion.form
                            className="contact-form"
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginTop: '3rem' }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="text"
                                placeholder="Your Name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <textarea
                                placeholder="Your Message"
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                            <button type="submit" className="submit-btn">{status || 'SEND MESSAGE'}</button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Contact;
