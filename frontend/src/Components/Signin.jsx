import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { motion } from 'framer-motion';

const Signin = () => {
    const [contactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signin', {
                contactNumber,
                password
            });
            console.log('response---', response)
            if (response?.data?.token) {
                window.localStorage.setItem('token', JSON.stringify(response?.data?.token));
                navigate('/home');
            };
        } catch (error) {
            console.error('Signin failed:', error); // Log the full error
            setError(error.response?.data?.error || 'Signin failed');
        }
    };

    return (
        <motion.div 
            className="container-fluid d-flex justify-content-center align-items-center vh-100"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
                background: 'linear-gradient(to bottom, #ffcc33, #ff6600)',
                display: "flex",
                flexDirection: "row",
                padding: "20px"
            }}
        >
            <motion.form 
                onSubmit={handleSignin} 
                className="p-5 shadow-lg rounded bg-white text-center"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{ width: "350px", borderRadius: "12px" }}
            >
                <h2 className="mb-4 text-primary">Aadhaar Update Signin</h2>
                
                <div className="mb-3">
                    <label className="form-label">Contact Number</label>
                    <motion.input 
                        type="text" 
                        className="form-control border-primary" 
                        value={contactNumber} 
                        onChange={(e) => setContactNumber(e.target.value)} 
                        placeholder="Enter your contact number" 
                        required 
                        whileFocus={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <motion.input 
                        type="password" 
                        className="form-control border-primary" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter your password" 
                        required 
                        whileFocus={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Pulsating Button with Rotation on Hover */}
                <motion.button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ opacity: [0.5, 1, 0.5], transition: { duration: 1.5, repeat: Infinity } }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    Sign In
                </motion.button>

                {/* Error Message with Shake Animation */}
                {error && 
                    <motion.p 
                        style={{ color: 'red', marginTop: '10px' }} 
                        animate={{ x: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                    >
                        {error}
                    </motion.p>
                }
            </motion.form>
        </motion.div>
    );
};

export default Signin;
