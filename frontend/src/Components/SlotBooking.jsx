import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

const SlotBooking = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bookingConfirmed, setBookingConfirmed] = useState(null);

    // Fetch available slots based on date and time
    const fetchAvailableSlots = useCallback(async () => {
        if (date && time) {
            setLoading(true);
            setBookingConfirmed(null);
            try {
                // Fetch available slots for the given date and time
                const response = await axios.get(`http://localhost:5000/api/slots/available?date=${date}&time=${time}`);
                setAvailableSlots(response.data);
            } catch (error) {
                console.error('Error fetching slots:', error);
                alert('Failed to load available slots');
            }
            setLoading(false);
        }
    }, [date, time]);


    const handleSlotBooking = async (slotId) => {
        const slotToBook = availableSlots.find(slot => slot._id === slotId);
        if (slotToBook) {
            try {
                await axios.post('http://localhost:5000/api/slots/book', {
                    userId: slotToBook.userId,
                    slotId: slotToBook._id,
                    date: slotToBook.date,
                    time: slotToBook.time,
                    // serviceType: 'Aadhaar Update', // Replace this with actual service type
                }).then((res) => {
                    setBookingConfirmed({
                        date: res.date,
                        time: res.time,
                        serviceType: 'Aadhaar Update',  // Update with actual service type if necessary
                    });
                }).finally(() => {
                    setTimeout(() => {
                        fetchAvailableSlots();
                        location.reload();
                    }, 3000)
                });
            } catch (error) {
                console.error('Error booking slot:', error);
                alert('Failed to book the slot');
            }
        }
    };
    return (
        <motion.div className="container-fluid vh-100 d-flex flex-column" style={{
            background: 'linear-gradient(to bottom, #ffcc33, #ff6600)',
            color: '#fff'
        }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            
            {/* <motion.div className="mb-3  text-light" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                <Link to="/home" className="btn m-2" style={linkStyle}>Home</Link>
                <Link to="/contact" className="btn me-2" style={linkStyle}>Contact</Link>
                <Link to="/ServicePage" className="btn" style={linkStyle}>ServicePage</Link>
            </motion.div> */}
            <motion.h2 className="mb-3 text-center text-light" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                Aadhaar Slot Booking
            </motion.h2>

            <div className="row mb-3">
                <motion.div className="col-md-4" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
                    <label className="form-label text-light">Select Aadhaar Service</label>
                    <select className="form-control" value={serviceType} onChange={(e) => setServiceType(e.target.value)} required>
                        <option value="">-- Select Service --</option>
                        <option value="KYC">KYC Update</option>
                        <option value="New Aadhaar">New Aadhaar Card</option>
                        <option value="Update">Aadhaar Update</option>
                        <option value="Biometric">Biometric Aadhaar</option>
                    </select>
                </motion.div>

                <motion.div className="col-md-4" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
                    <label className="form-label text-light">Select Date</label>
                    <input type="date" className="form-control" onChange={(e) => setDate(e.target.value)} required />
                </motion.div>

                <motion.div className="col-md-4" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
                    <label className="form-label text-light">Select Time</label>
                    <input type="time" className="form-control" onChange={(e) => setTime(e.target.value)} required />
                </motion.div>
            </div>

            <div className="row mb-3">
                <div className="col-md-12 d-flex justify-content-end">
                    <motion.button
                        className="btn btn-warning"
                        onClick={fetchAvailableSlots}
                        disabled={loading}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        {loading ? 'Loading...' : 'Check Availability'}
                    </motion.button>
                </div>
            </div>

            {bookingConfirmed && (
                <motion.div className="alert alert-success text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    🎉 Slot booked for <strong>{bookingConfirmed.date}</strong> at <strong>{bookingConfirmed.time}</strong> for <strong>{bookingConfirmed.serviceType}</strong>!
                </motion.div>
            )}

            <motion.h4 className="mt-4 text-light" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }}>
                Available Slots
            </motion.h4>

            <ul className="list-group">
                {availableSlots.length > 0 ? (
                    availableSlots.map(slot => (
                        <motion.li
                            key={slot._id}
                            className={`list-group-item d-flex justify-content-between align-items-center ${slot.booked ? 'list-group-item-danger' : 'list-group-item-light'}`}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            {slot.time} - {slot.booked ? 'Booked' : 'Available'}
                            {!slot.booked && (
                                <motion.button
                                    className="btn btn-success"
                                    onClick={() => handleSlotBooking(slot._id)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Book
                                </motion.button>
                            )}
                        </motion.li>
                    ))
                ) : (
                    <motion.li className="list-group-item text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        No available slots for the selected date and time.
                    </motion.li>
                )}
            </ul>
        </motion.div>
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

export default SlotBooking;
