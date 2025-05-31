import React from 'react';
import { motion } from 'framer-motion';

function Contact() {
  const whatsappNumber = '51951108576'; // Peruvian country code + number
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <motion.section
      id='contact'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2>Contact</h2>
      <p>Email: sanchezcoronadodeivy5@gmail.com</p>
      <p>Phone: 951108576</p>
      <p>Address: Cañete - Lima - Perú</p>
      <motion.a
        href={whatsappLink}
        target='_blank'
        rel='noopener noreferrer'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Send me a WhatsApp message
      </motion.a>
    </motion.section>
  );
}

export default Contact;
