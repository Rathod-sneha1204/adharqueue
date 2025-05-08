import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import { motion } from 'framer-motion';


const Signup = () => {
    const [contactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                contactNumber,
                password
            });

            alert(response.data.message); // Success message
            navigate('/signin'); // Redirect to Signin page
        } catch (error) {
            setError(error.response?.data?.error || 'Signup failed');
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
            {/* Left Side - Aadhaar Image (Optional) */}
            {/* <motion.img 
                src="frontend/src/image/Aadhaar_Logo.svg" 
                alt="Aadhaar Logo" 
                className="mb-3"
                width="300px"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{ marginRight: "50px" }}
            /> */}

            {/* Floating Form with bounce effect */}
            <motion.form 
                onSubmit={handleSignup} 
                className="p-5 shadow-lg rounded bg-white text-center"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{ width: "350px", borderRadius: "12px" }}
            >
                <h2 className="mb-4 text-primary">Aadhaar Update Signup</h2>
                
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

                {/* Pulsating Button with Rotate on Hover */}
                <motion.button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ opacity: [0.5, 1, 0.5], transition: { duration: 1.5, repeat: Infinity } }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    Sign Up
                </motion.button>

                {/* Error Message */}
                {error && <motion.p style={{ color: 'red', marginTop: '10px' }} animate={{ scale: 1.1 }} transition={{ duration: 0.5 }}>{error}</motion.p>}
            </motion.form>
        </motion.div>
    );
};

export default Signup;
