import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login:', {
      email,
      password
    });
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
          Welcome Back
        </h1>
        <p className="text-gray-400">Access your LEGIER account</p>
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

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-graphite border border-graphite-lighter pl-10 pr-4 py-3 text-white focus:border-soft-red transition-colors" placeholder="••••••••" required />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-soft-red" />
              <span className="text-sm text-gray-400">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-soft-red hover:underline">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="w-full btn-primary">
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-soft-red hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  </div>;
}