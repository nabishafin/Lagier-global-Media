import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
export function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Password reset');
    navigate('/success');
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
        <h1 className="text-4xl font-playfair font-bold mb-2">
          New Password
        </h1>
        <p className="text-gray-400">
          Create a strong password for your account
        </p>
      </div>

      <div className="bg-graphite-light border border-graphite-lighter p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input type="password" value={formData.password} onChange={e => setFormData({
                ...formData,
                password: e.target.value
              })} className="w-full bg-graphite border border-graphite-lighter pl-10 pr-4 py-3 text-white focus:border-soft-red transition-colors" placeholder="••••••••" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input type="password" value={formData.confirmPassword} onChange={e => setFormData({
                ...formData,
                confirmPassword: e.target.value
              })} className="w-full bg-graphite border border-graphite-lighter pl-10 pr-4 py-3 text-white focus:border-soft-red transition-colors" placeholder="••••••••" required />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary">
            Reset Password
          </button>
        </form>
      </div>
    </motion.div>
  </div>;
}