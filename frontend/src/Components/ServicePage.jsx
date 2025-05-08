import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ServicePage = () => {
    const [selectedService, setSelectedService] = useState('');

    const handleServiceClick = (service) => {
        setSelectedService(service);
    };

    return (
        <motion.div className="container-fluid vh-100 d-flex flex-column" style={{
                    background: 'linear-gradient(to bottom, #ffcc33, #ff6600)',
                    color: '#fff'
                }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    
            <motion.h2 
                className="text-center mt-5"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ color: '#1976D2' }} // Adding Aadhaar-like color for the title
            >
                Aadhaar Services
            </motion.h2>

            <div className="row mt-5">
                {/* Service Cards with Hover Animation */}
                <div className="col-md-3 mb-4">
                    <motion.div 
                        className="service-card"
                        onClick={() => handleServiceClick('kyc')}
                        whileHover={{ scale: 1.05, rotate: -5, backgroundColor: '#1976D2', color: '#fff' }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{ transition: 'all 0.3s ease-in-out', padding: '20px', borderRadius: '10px', cursor: 'pointer' }}
                    >
                        <h4>KYC Update</h4>
                        <p>
                            Update your Know Your Customer (KYC) details online. This process ensures
                            your Aadhaar details are accurate and up to date.
                        </p>
                    </motion.div>
                </div>
                <div className="col-md-3 mb-4">
                    <motion.div 
                        className="service-card"
                        onClick={() => handleServiceClick('update')}
                        whileHover={{ scale: 1.05, rotate: 5, backgroundColor: '#1976D2', color: '#fff' }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        style={{ transition: 'all 0.3s ease-in-out', padding: '20px', borderRadius: '10px', cursor: 'pointer' }}
                    >
                        <h4>Aadhaar Update</h4>
                        <p>
                            Update your Aadhaar information, including address, contact details, and more,
                            to ensure seamless service access.
                        </p>
                    </motion.div>
                </div>
                <div className="col-md-3 mb-4">
                    <motion.div 
                        className="service-card"
                        onClick={() => handleServiceClick('new')}
                        whileHover={{ scale: 1.05, rotate: -5, backgroundColor: '#1976D2', color: '#fff' }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                        style={{ transition: 'all 0.3s ease-in-out', padding: '20px', borderRadius: '10px', cursor: 'pointer' }}
                    >
                        <h4>New Aadhaar Card</h4>
                        <p>
                            Apply for a new Aadhaar card if you are a first-time applicant. Ensure proper
                            documentation for a smooth application process.
                        </p>
                    </motion.div>
                </div>
                <div className="col-md-3 mb-4">
                    <motion.div 
                        className="service-card"
                        onClick={() => handleServiceClick('biometric')}
                        whileHover={{ scale: 1.05, rotate: 5, backgroundColor: '#1976D2', color: '#fff' }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        style={{ transition: 'all 0.3s ease-in-out', padding: '20px', borderRadius: '10px', cursor: 'pointer' }}
                    >
                        <h4>Biometric Aadhaar</h4>
                        <p>
                            Enroll your biometric data for Aadhaar. This step is essential for verification
                            and ensuring the authenticity of your Aadhaar details.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Displaying Service Details */}
            {selectedService && (
                <motion.div 
                    className="service-details"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.9 }}
                    style={{ backgroundColor: '#1976D2', padding: '30px', borderRadius: '10px' }}
                >
                    <h3 className="text-center" style={{ color: 'white' }}>{selectedService} Service Details</h3>
                    {selectedService === 'kyc' && (
                        <p>
                            Updating your KYC details ensures your Aadhaar profile is current and helps
                            facilitate various government services. Make sure to provide accurate
                            information when updating your KYC.
                        </p>
                    )}
                    {selectedService === 'update' && (
                        <p>
                            Aadhaar details such as your name, address, or phone number may need to be
                            updated from time to time. Ensure your details are accurate to continue receiving
                            government benefits without any issues.
                        </p>
                    )}
                    {selectedService === 'new' && (
                        <p>
                            If you are applying for a new Aadhaar card, ensure you have all necessary
                            documents. Your Aadhaar card will serve as a universal identification for various
                            government services.
                        </p>
                    )}
                    {selectedService === 'biometric' && (
                        <p>
                            Biometric Aadhaar registration ensures that your identity is verified through
                            fingerprint and iris scanning, which will be used for secure access to services
                            that require Aadhaar-based authentication.
                        </p>
                    )}
                </motion.div>
            )}
        </motion.div>
        
    );
};

export default ServicePage;
