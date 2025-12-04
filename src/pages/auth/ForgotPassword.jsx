import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset email sent to:', email);
    navigate('/otp-verification');
  };
  return <div className="min-h-screen flex items-center justify-center px-6 py-20">
    <motion.div initial={{
      opacity: 0,
      y: 30
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8
    }} className="w-full max-w-md">
      <Link to="/login" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={20} />
        Back to login
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-playfair font-bold mb-2">
          Reset Password
        </h1>
        <p className="text-gray-400">
          Enter your email to receive a verification code
        </p>
      </div>

      <div className="bg-graphite-light border border-graphite-lighter p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-graphite border border-graphite-lighter pl-10 pr-4 py-3 text-white focus:border-soft-red transition-colors" placeholder="your@email.com" required />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary">
            Send Verification Code
          </button>
        </form>
      </div>
    </motion.div>
  </div>;
}