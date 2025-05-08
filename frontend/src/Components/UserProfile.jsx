import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';


const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [contactNumber, setContactNumber] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log("Token being sent:", token); // Add this line
                const response = await axios.get("http://localhost:5000/api/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data); // or whatever you're doing with user data
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
    
        fetchUserProfile();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/auth/profile', { contactNumber }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center min-h-screen"
        >
            {user ? (
                <motion.div
                    className="bg-white shadow-lg rounded-lg p-6 text-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                >
                    <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
                    <p className="text-gray-700 mb-2">Contact Number: {user.contactNumber}</p>
                    <motion.input
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        className="border rounded px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        whileFocus={{ scale: 1.05 }}
                    />
                    <motion.button
                        onClick={handleUpdateProfile}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Update Profile
                    </motion.button>
                </motion.div>
            ) : (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-gray-500"
                >
                    Loading user profile...
                </motion.p>
            )}
        </motion.div>
    );
};

export default UserProfile;
