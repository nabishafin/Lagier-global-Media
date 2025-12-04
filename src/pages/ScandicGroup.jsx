import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CreditCard, Building, TrendingUp, Plane, Anchor, Shield } from 'lucide-react';

export function ScandicGroup() {
  const brands = [{
    icon: CreditCard,
    name: 'ScandicPay',
    description: 'Next-generation payment solutions and fintech infrastructure. Secure, fast, and globally accessible payment processing for modern businesses.',
    url: '#',
    metrics: ['Global Coverage', 'Instant Settlement', 'Multi-Currency']
  }, {
    icon: Building,
    name: 'ScandicEstate',
    description: 'Premium real estate development and property management. Creating sustainable, innovative spaces for living and working across major cities.',
    url: '#',
    metrics: ['20+ Cities', 'Sustainable Design', 'Smart Buildings']
  }, {
    icon: TrendingUp,
    name: 'ScandicTrade',
    description: 'Advanced trading platforms and investment solutions. Empowering traders with cutting-edge technology and real-time market intelligence.',
    url: '#',
    metrics: ['24/7 Trading', 'AI Analytics', 'Risk Management']
  }, {
    icon: Plane,
    name: 'ScandicFly',
    description: 'Private aviation services and charter solutions. Luxury air travel with uncompromising safety standards and personalized service.',
    url: '#',
    metrics: ['Global Network', 'On-Demand', 'Premium Service']
  }, {
    icon: Anchor,
    name: 'ScandicYachts',
    description: 'Luxury yacht sales, charter, and management. Curating exceptional maritime experiences with world-class vessels and crew.',
    url: '#',
    metrics: ['Exclusive Fleet', 'Global Destinations', 'Concierge Service']
  }, {
    icon: Shield,
    name: 'ScandicTrust',
    description: 'Wealth management and fiduciary services. Protecting and growing assets through expert guidance and sophisticated strategies.',
    url: '#',
    metrics: ['Asset Protection', 'Tax Optimization', 'Legacy Planning']
  }];

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4 md:mb-6">
            Scandic Group
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            A diversified portfolio of premium brands spanning fintech, real
            estate, aviation, maritime, and wealth management. Each brand
            operates independently while benefiting from our integrated
            ecosystem.
          </p>
          <p className="text-lg text-gray-400 max-w-3xl">
            The Scandic Group represents our commitment to excellence across
            multiple industries. We build businesses that combine innovation,
            sustainability, and exceptional service delivery.
          </p>
        </motion.div>

        {/* Brand Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {brands.map((brand, index) => (
            <motion.a
              key={brand.name}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-graphite-light border border-graphite-lighter p-8 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-graphite border border-[#A2234E] flex items-center justify-center">
                  <brand.icon className="text-[#A2234E]" size={32} />
                </div>
                <ExternalLink className="text-gray-500 group-hover:text-[#A2234E] transition-colors" size={24} />
              </div>

              <h2 className="text-3xl font-playfair font-bold mb-4 group-hover:text-[#A2234E] transition-colors">
                {brand.name}
              </h2>

              <p className="text-gray-300 leading-relaxed mb-6">
                {brand.description}
              </p>

              {/* Metrics */}
              <div className="flex flex-wrap gap-2">
                {brand.metrics.map(metric => (
                  <span key={metric} className="text-xs bg-graphite border border-graphite-lighter px-3 py-1 text-gray-400">
                    {metric}
                  </span>
                ))}
              </div>

              {/* Data Bar (Visual Element) */}
              <div className="mt-6 space-y-2">
                <div className="h-1 bg-graphite-lighter">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${60 + index * 5}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="h-full bg-[#A2234E]"
                  />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Ecosystem Overview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-graphite-light border border-graphite-lighter p-12"
        >
          <h2 className="text-4xl font-playfair font-bold mb-6">
            Integrated Ecosystem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-playfair font-semibold mb-4 text-[#A2234E]">
                Synergies
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Our brands benefit from shared infrastructure, cross-industry
                expertise, and collaborative innovation. Clients gain access to
                a comprehensive suite of premium services through a single
                trusted relationship.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• Shared technology platforms</li>
                <li>• Cross-brand partnerships</li>
                <li>• Unified client experience</li>
                <li>• Collaborative innovation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-playfair font-semibold mb-4 text-[#A2234E]">
                Values
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Every Scandic brand is built on a foundation of excellence,
                integrity, and innovation. We maintain the highest standards
                across all operations while continuously pushing boundaries.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• Excellence in execution</li>
                <li>• Client-first approach</li>
                <li>• Sustainable practices</li>
                <li>• Continuous innovation</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 bg-graphite-light border border-[#A2234E] p-12 text-center"
        >
          <h2 className="text-4xl font-playfair font-bold mb-4">
            Partner with Scandic
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover how our integrated ecosystem can serve your needs across
            multiple industries. Connect with our team to explore partnership
            opportunities.
          </p>
          <button className="btn-primary">Get in Touch</button>
        </motion.div>
      </div>
    </div>
  );
}