import React from 'react';
import { motion } from 'framer-motion';

function About() {
  const aboutMeText = "Hello! I'm Deivy Jampool Sanchez Coronado, a passionate and results-oriented individual based in Cañete - Lima - Perú. I thrive on creating engaging and effective web solutions, always eager to explore new technologies and methodologies to bring ideas to life. My journey in web development is driven by a constant curiosity and a commitment to building user-friendly and impactful digital experiences. I'm excited by the challenge of solving complex problems and collaborating on innovative projects. When I'm not coding, I enjoy [Placeholder for a brief hobby or interest - you can fill this in! e.g., 'exploring the latest tech trends', 'learning new skills', 'contributing to open-source projects'].";

  return (
    <motion.section
      id='about'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2>About Me</h2>
      <p><strong>Nombre y Apellidos:</strong> Deivy Jampool Sanchez Coronado</p>
      <p><strong>Correo:</strong> sanchezcoronadodeivy5@gmail.com</p>
      <p><strong>Telefono:</strong> 951108576</p>
      <p><strong>Direccion:</strong> Cañete - Lima - Perú</p>
      <p><strong>Sobre mi:</strong> {aboutMeText}</p>
    </motion.section>
  );
}

export default About;
