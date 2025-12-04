import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
export function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('OTP:', otp.join(''));
    navigate('/reset-password');
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
      <div className="text-center mb-8">
        <h1 className="text-4xl font-playfair font-bold mb-2">Verify Code</h1>
        <p className="text-gray-400">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <div className="bg-graphite-light border border-graphite-lighter p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-3 justify-center">
            {otp.map((digit, index) => <input key={index} id={`otp-${index}`} type="text" maxLength={1} value={digit} onChange={e => handleChange(index, e.target.value)} className="w-12 h-14 bg-graphite border border-graphite-lighter text-center text-xl text-white focus:border-soft-red transition-colors" required />)}
          </div>

          <button type="submit" className="w-full btn-primary">
            Verify Code
          </button>

          <div className="text-center">
            <button type="button" className="text-sm text-gray-400 hover:text-soft-red transition-colors">
              Resend code
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  </div>;
}