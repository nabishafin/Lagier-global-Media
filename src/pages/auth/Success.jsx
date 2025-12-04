import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
export function Success() {
  return <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div initial={{
      opacity: 0,
      scale: 0.9
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 0.5
    }} className="w-full max-w-md text-center">
        <motion.div initial={{
        scale: 0
      }} animate={{
        scale: 1
      }} transition={{
        delay: 0.2,
        type: 'spring',
        stiffness: 200
      }} className="inline-block mb-6">
          <CheckCircle className="text-soft-red" size={80} />
        </motion.div>

        <h1 className="text-4xl font-playfair font-bold mb-4">
          Password Reset Successful
        </h1>
        <p className="text-gray-400 mb-8">
          Your password has been successfully reset. You can now sign in with
          your new password.
        </p>

        <Link to="/login" className="btn-primary inline-block">
          Sign In
        </Link>
      </motion.div>
    </div>;
}