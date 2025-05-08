import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        const fetchUsersAndSlots = async () => {
            try {
                const userResponse = await axios.get('http://localhost:5000/api/auth/users');
                const slotResponse = await axios.get('http://localhost:5000/api/slots');
                setUsers(userResponse.data);
                setSlots(slotResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUsersAndSlots();
    }, []);

    return (
        <motion.div 
            className="container-fluid d-flex flex-column align-items-center vh-100 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
                background: "linear-gradient(135deg, #FFD700, #FF4500)",
                color: "#fff",
                fontFamily: "Arial, sans-serif"
            }}
        >
            <motion.h2
                className="mb-4 text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                Aadhaar Update - Admin Dashboard
            </motion.h2>

            <motion.div
                className="card shadow-lg p-4 mb-4"
                style={{ width: "80%", borderRadius: "12px", background: "#fff", color: "#333" }}
            >
                <h3 className="text-center text-primary">Users</h3>
                <ul className="list-group">
                    {users.map(user => (
                        <motion.li 
                            key={user._id} 
                            className="list-group-item"
                            whileHover={{ scale: 1.05 }}
                        >
                            {user.contactNumber}
                        </motion.li>
                    ))}
                </ul>
            </motion.div>

            <motion.div
                className="card shadow-lg p-4"
                style={{ width: "80%", borderRadius: "12px", background: "#fff", color: "#333" }}
            >
                <h3 className="text-center text-primary">Slots</h3>
                <ul className="list-group">
                    {slots.map(slot => (
                        <motion.li 
                            key={slot._id} 
                            className="list-group-item"
                            whileHover={{ scale: 1.05 }}
                        >
                            {slot.date} - {slot.time} - {slot.booked ? 'Booked' : 'Available'}
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>
    );
};

export default AdminDashboard;
