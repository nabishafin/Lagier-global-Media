import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, Globe } from 'lucide-react';

export function Newspapers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const newspapers = [{
    name: 'Alhayat.media',
    country: 'UAE',
    language: 'Arabic',
    url: '#',
    description: 'Leading Middle Eastern news source'
  }, {
    name: 'Athensnews',
    country: 'Greece',
    language: 'Greek',
    url: '#',
    description: 'Athens metropolitan daily'
  }, {
    name: 'Berlinerboersenzeitung',
    country: 'Germany',
    language: 'German',
    url: '#',
    description: 'Berlin financial newspaper'
  }, {
    name: 'Thejapantimes',
    country: 'Japan',
    language: 'English',
    url: '#',
    description: "Japan's leading English daily"
  }, {
    name: 'Thepeninsulatimes',
    country: 'Qatar',
    language: 'English',
    url: '#',
    description: 'Peninsula region coverage'
  }, {
    name: 'Stockholmsnews',
    country: 'Sweden',
    language: 'Swedish',
    url: '#',
    description: 'Stockholm daily news'
  }, {
    name: 'Londongazette',
    country: 'UK',
    language: 'English',
    url: '#',
    description: 'London metropolitan gazette'
  }, {
    name: 'Parisjournal',
    country: 'France',
    language: 'French',
    url: '#',
    description: 'Parisian daily journal'
  }, {
    name: 'Tokyotimes',
    country: 'Japan',
    language: 'Japanese',
    url: '#',
    description: 'Tokyo metropolitan times'
  }, {
    name: 'Sydneyherald',
    country: 'Australia',
    language: 'English',
    url: '#',
    description: 'Sydney morning herald'
  }, {
    name: 'Dubaipost',
    country: 'UAE',
    language: 'English',
    url: '#',
    description: 'Dubai business post'
  }, {
    name: 'Singaporetoday',
    country: 'Singapore',
    language: 'English',
    url: '#',
    description: 'Singapore daily today'
  }, {
    name: 'Madriddiario',
    country: 'Spain',
    language: 'Spanish',
    url: '#',
    description: 'Madrid daily newspaper'
  }, {
    name: 'Romegazette',
    country: 'Italy',
    language: 'Italian',
    url: '#',
    description: 'Rome city gazette'
  }, {
    name: 'Amsterdampost',
    country: 'Netherlands',
    language: 'Dutch',
    url: '#',
    description: 'Amsterdam daily post'
  }, {
    name: 'Zurichtimes',
    country: 'Switzerland',
    language: 'German',
    url: '#',
    description: 'Zurich financial times'
  }];
  const countries = ['All', ...Array.from(new Set(newspapers.map(n => n.country)))];
  const languages = ['All', ...Array.from(new Set(newspapers.map(n => n.language)))];
  const filteredNewspapers = newspapers.filter(newspaper => {
    const matchesSearch = newspaper.name.toLowerCase().includes(searchTerm.toLowerCase()) || newspaper.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || newspaper.country === selectedCountry;
    const matchesLanguage = selectedLanguage === 'All' || newspaper.language === selectedLanguage;
    return matchesSearch && matchesCountry && matchesLanguage;
  });
  return <div className="min-h-screen pt-20 md:pt-32">
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
      <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4 md:mb-6">
          Global Newspaper Network
        </h1>
        <p className="text-xl text-gray-400 mb-12">
          Explore our portfolio of 115 independent publications worldwide
        </p>

        {/* Filters */}
        <div className="bg-graphite-light border border-graphite-lighter p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input type="text" placeholder="Search newspapers..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-graphite border border-graphite-lighter pl-10 pr-4 py-3 text-white focus:border-soft-red transition-colors" />
            </div>

            <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} className="w-full bg-graphite border border-graphite-lighter px-4 py-3 text-white focus:border-soft-red transition-colors">
              {countries.map(country => <option key={country} value={country}>
                {country}
              </option>)}
            </select>

            <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)} className="w-full bg-graphite border border-graphite-lighter px-4 py-3 text-white focus:border-soft-red transition-colors">
              {languages.map(language => <option key={language} value={language}>
                {language}
              </option>)}
            </select>
          </div>
        </div>

        {/* Newspaper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNewspapers.map((newspaper, index) => <motion.a key={newspaper.name} href={newspaper.url} target="_blank" rel="noopener noreferrer" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: index * 0.05
          }} whileHover={{
            y: -8,
            transition: {
              duration: 0.2
            }
          }} className="bg-graphite-light border border-graphite-lighter p-6 group cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <Globe className="text-soft-red" size={32} />
              <Link to="/newspapers" className="text-[#A2234E] hover:text-[#F5F1E8] transition-colors inline-flex items-center gap-2 luxury-underline font-crimson">
                <ExternalLink size={20} />
              </Link>
            </div>

            <h3 className="text-sm font-crimson text-[#F5F1E8] group-hover:text-[#A2234E] transition-colors">
              {newspaper.name}
            </h3>

            <p className="text-[#8F1F45] font-crimson mt-2">
              {newspaper.description}
            </p>

            <div className="flex gap-2">
              <span className="text-xs bg-graphite border border-graphite-lighter px-2 py-1 text-gray-400">
                {newspaper.country}
              </span>
              <span className="text-xs bg-graphite border border-graphite-lighter px-2 py-1 text-gray-400">
                {newspaper.language}
              </span>
            </div>
          </motion.a>)}
        </div>

        {filteredNewspapers.length === 0 && <div className="text-center py-20">
          <p className="text-gray-500">
            No newspapers found matching your criteria
          </p>
        </div>}
      </motion.div>
    </div>
  </div>;
}