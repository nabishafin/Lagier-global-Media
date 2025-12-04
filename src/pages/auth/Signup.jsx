import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
export function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Signup:', formData);
    navigate('/login');
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
          Create Account
        </h1>
        <p className="text-gray-400">Join the LEGIER network</p>
      </div>

      <div className="bg-graphite-light border border-graphite-lighter p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input type="text" value={formData.name} onChange={e => setFormData({
                ...formData,
                name: e.target.value
              })} className="w-full bg-graphite border border-graphite-lighter pl-10 pr-4 py-3 text-white focus:border-soft-red transition-colors" placeholder="John Doe" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input type="email" value={formData.email} onChange={e => setFormData({
                ...formData,
                email: e.target.value
              })} className="w-full bg-graphite border border-graphite-lighter pl-10 pr-4 py-3 text-white focus:border-soft-red transition-colors" placeholder="your@email.com" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Password
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
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-soft-red hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  </div>;
}