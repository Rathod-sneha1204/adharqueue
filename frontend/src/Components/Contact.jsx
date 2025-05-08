import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Confetti from 'react-confetti';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/contact/contact', formData);
      setFormData({ name: '', email: '', message: '' });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000); // Hide after 5 seconds
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message.');
    }
  };

  const formVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className=" flex items-center justify-center relative overflow-hidden">
      <motion.div
        className="container-fluid justify-content-center align-items-center vh-100 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'linear-gradient(to bottom, #ffcc33, #ff6600)',
      }}
      >
       
        <motion.h1
          className="text-4xl font-bold text-center text-blue-600 mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          Contact Us
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-8 shadow-md rounded-lg"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="mb-4" variants={fieldVariants}>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
            />
          </motion.div>

          <motion.div className="mb-4" variants={fieldVariants}>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your email address"
            />
          </motion.div>

          <motion.div className="mb-4" variants={fieldVariants}>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your message"
              rows="4"
            ></textarea>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Message
          </motion.button>
        </motion.form>

        {/* Success message */}
        <AnimatePresence>
          {success && (
            <>
              <motion.div
                className="mt-6 text-center text-green-600 font-bold text-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                🎉 Message sent successfully!
              </motion.div>
              <Confetti width={window.innerWidth} height={window.innerHeight} />
            </>
          )}
        </AnimatePresence>
      </motion.div>
     </div>
  );
};

export default Contact;
