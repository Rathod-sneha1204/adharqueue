import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
       const localStorageToken = window.localStorage.getItem('token');
       setToken(localStorageToken);
    }, [])
    return (
        <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'linear-gradient(to bottom, #ffcc33, #ff6600)',
            color: '#fff',
            textAlign: 'center',
            padding: '20px'
        }}>
            {/* Title with bouncing effect */}
            <motion.h1 
                initial={{ opacity: 0, y: -60 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ type: 'spring', stiffness: 100, damping: 20, duration: 1.5 }}
                style={{ marginBottom: '20px' }}
            >
                Welcome to the Aadhaar Card Update Management System
            </motion.h1>
            
            {/* Description text with a slide-in effect */}
            <motion.p
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 100, duration: 1.5 }}
                style={{ maxWidth: '600px', fontSize: '18px', marginBottom: '30px' }}
            >
                Manage your Aadhaar card updates easily and efficiently. 
                Book your slots for updates and receive confirmations via SMS.
            </motion.p>

            {/* Button section with staggered entrance */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3, delayChildren: 1 } }
                }}
                style={{ marginTop: '20px' }}
            >
                {token?.length > 0 ? (
                    <>
                        <motion.div 
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ margin: '10px' }}
                        >
                            <Link to="/book-slot" className="btn" style={linkStyle}>Book a Slot</Link>
                        </motion.div>

                        <motion.div 
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ margin: '10px' }}
                        >
                            <Link to="/contact" className="btn" style={linkStyle}>Contact</Link>
                        </motion.div>

                        <motion.div 
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ margin: '10px' }}
                        >
                            <Link to="/ServicePage" className="btn" style={linkStyle}>ServicePage</Link>
                        </motion.div>
                        <motion.div 
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ margin: '10px' }}
                        >
                            <button type='button' style={linkStyle} onClick={() =>{ localStorage.removeItem("token"); location.reload();}}>Logout</button>
                        </motion.div>
                    </>
                ) : (
                    <>
                        <motion.div 
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ margin: '10px' }}
                        >
                            <Link to="/signup" className="btn" style={linkStyle}>Signup</Link>
                        </motion.div>
                        
                        <motion.div 
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ margin: '10px' }}
                        >
                            <Link to="/signin" className="btn" style={linkStyle}>Signin</Link>
                        </motion.div>
                    </>
                )}
            </motion.div>

            {/* Footer with fade-in and slide-up effect */}
            <motion.footer 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 1.8, type: 'spring', stiffness: 100, duration: 1 }}
                style={{ marginTop: '20px', fontSize: '14px' }}
            >
                <p>&copy; {new Date().getFullYear()} Aadhaar Update Management. All Rights Reserved.</p>
            </motion.footer>
        </div>
    );
};

const linkStyle = {
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#d32f2f',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'transform 0.2s ease-in-out'
};

export default Home;
