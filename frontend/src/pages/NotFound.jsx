import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-8xl mb-8"
        >
          😕
        </motion.div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="btn-primary w-full block text-center"
          >
            Go Home
          </Link>
          
          <Link
            to="/contact"
            className="btn-secondary w-full block text-center"
          >
            Get Help
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-sm text-gray-500"
        >
          <p>If you believe this is an error, please <a href="mailto:support@obagaTeam.com" className="text-primary-600 hover:text-primary-700">contact our support team</a>.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;