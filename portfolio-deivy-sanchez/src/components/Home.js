import React from 'react';
import { motion } from 'framer-motion';

function Home() {
  return (
    <motion.section
      id='home'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1>Deivy Jampool Sanchez Coronado</h1>
      <p>Welcome to my portfolio.</p>
      {/* More content will be added here based on the reference */}
    </motion.section>
  );
}

export default Home;
