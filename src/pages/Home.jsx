import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { ArrowRight, Globe, Newspaper, Building2 } from 'lucide-react';
export function Home() {
  const sphereCanvasRef = useRef(null);
  useEffect(() => {
    if (!sphereCanvasRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 30;
    const renderer = new THREE.WebGLRenderer({
      canvas: sphereCanvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(500, 500);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Create particle sphere with gold color
    const particleCount = 3000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xa2234e,
      size: 0.2,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    // Add connecting lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    for (let i = 0; i < particleCount * 3; i += 30) {
      for (let j = i + 30; j < Math.min(i + 150, particleCount * 3); j += 30) {
        const dx = positions[i] - positions[j];
        const dy = positions[i + 1] - positions[j + 1];
        const dz = positions[i + 2] - positions[j + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (distance < 5) {
          linePositions.push(positions[i], positions[i + 1], positions[i + 2]);
          linePositions.push(positions[j], positions[j + 1], positions[j + 2]);
        }
      }
    }
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xa2234e,
      transparent: true,
      opacity: 0.1
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      particles.rotation.y += 0.001;
      lines.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  const newspapers = ['Alhayat.media', 'Athensnews', 'Berlinerboersenzeitung', 'Thejapantimes', 'Thepeninsulatimes', 'Stockholmsnews', 'Londongazette', 'Parisjournal', 'Tokyotimes', 'Sydneyherald', 'Dubaipost', 'Singaporetoday'];
  return <div className="min-h-screen pt-20 md:pt-32">
    {/* Hero Section - Magazine Cover Style */}
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 1,
          ease: [0.4, 0, 0.2, 1]
        }}>
          <div className="byline mb-6">Feature Story</div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 md:mb-8 leading-[0.95] text-[#F5F1E8]">
            LEGIER
            <br />
            <span className="text-[#A2234E]" style={{
              fontStyle: 'italic'
            }}>
              Global Network
            </span>
          </h1>

          <p className="text-xl font-crimson text-[#D4CFC4] mb-6 leading-relaxed drop-cap">
            Worldwide. Independent. Reliable. Digitally networked. Connecting
            115 newspapers worldwide through a living data ecosystem.
            Experience journalism as a unified information network.
          </p>

          <div className="flex gap-4 mt-8">
            <Link to="/newspapers" className="btn-primary flex items-center gap-2">
              Discover our newspapers
              <ArrowRight size={18} />
            </Link>
            <Link to="/business-areas" className="btn-secondary">
              Business areas
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 1.2,
          delay: 0.2,
          ease: [0.4, 0, 0.2, 1]
        }} className="flex justify-center relative">
          <div className="relative">
            <canvas ref={sphereCanvasRef} className="w-full max-w-[500px]" />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-xs font-inter uppercase tracking-widest text-[#8F1F45]">
                Data Visualization
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    <div className="ornamental-divider mb-20" />

    {/* Newspapers Section - Editorial Grid */}
    <section className="max-w-7xl mx-auto px-6 py-20">
      <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }}>
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="issue-number mb-4 block">Section I</span>
            <h2 className="text-5xl font-playfair font-bold text-[#F5F1E8]">
              Newspaper Network
            </h2>
            <p className="text-[#8F1F45] font-crimson mt-2">
              Our global portfolio of independent publications
            </p>
          </div>
          <Link to="/newspapers" className="text-[#A2234E] hover:text-[#F5F1E8] transition-colors inline-flex items-center gap-2 luxury-underline font-crimson">
            View all newspapers
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newspapers.map((newspaper, index) => <motion.div key={newspaper} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.05
          }} viewport={{
            once: true
          }} className="magazine-card p-6 cursor-pointer group">
            <Newspaper className="text-[#A2234E] mb-4 group-hover:scale-110 transition-transform duration-300" size={28} />
            <h3 className="text-sm font-crimson text-[#F5F1E8] group-hover:text-[#A2234E] transition-colors">
              {newspaper}
            </h3>
            <p className="text-xs text-[#8F1F45] mt-2 font-inter uppercase tracking-wider">
              Independent
            </p>
          </motion.div>)}
        </div>
      </motion.div>
    </section>

    <div className="ornamental-divider mb-20" />

    {/* Core Data Section - Pull Quote Style */}
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }}>
          <span className="issue-number mb-4 block">Section II</span>
          <h2 className="text-5xl font-playfair font-bold mb-8 text-[#F5F1E8]">
            Beyond Classic Journalism
          </h2>

          <div className="pull-quote mb-8">
            LEGIER Media Group stands for more than classic journalism.
          </div>

          <p className="text-[#D4CFC4] font-crimson leading-relaxed mb-6">
            We are a comprehensive media ecosystem that combines traditional
            publishing with cutting-edge digital innovation. Our integrated
            approach spans content creation, digital distribution, data
            analytics, and strategic partnerships, creating a unified platform
            for modern media delivery.
          </p>

          <Link to="/business-areas" className="text-[#A2234E] hover:text-[#F5F1E8] transition-colors inline-flex items-center gap-2 luxury-underline font-crimson">
            Explore business areas
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="space-y-6">
          {[{
            icon: Globe,
            label: 'Global Reach',
            value: '115 Publications'
          }, {
            icon: Newspaper,
            label: 'Daily Readers',
            value: '50M+'
          }, {
            icon: Building2,
            label: 'Business Units',
            value: '12 Active'
          }].map((stat, index) => <motion.div key={stat.label} initial={{
            opacity: 0,
            x: 20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} viewport={{
            once: true
          }} className="magazine-card p-8 flex items-center gap-6">
            <stat.icon className="text-[#A2234E]" size={40} />
            <div>
              <p className="text-3xl font-playfair font-bold text-[#F5F1E8]">
                {stat.value}
              </p>
              <p className="text-sm text-[#8F1F45] font-inter uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          </motion.div>)}
        </motion.div>
      </div>
    </section>

    <div className="ornamental-divider mb-20" />

    {/* Scandic Group Section */}
    <section className="max-w-7xl mx-auto px-6 py-20">
      <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }} className="magazine-card p-16 relative overflow-hidden">
        <span className="section-number" style={{
          top: '-2rem',
          right: '2rem'
        }}>
          III
        </span>

        <div className="relative z-10">
          <span className="issue-number mb-4 block">Section III</span>
          <h2 className="text-5xl font-playfair font-bold mb-6 text-[#F5F1E8]">
            Scandic Group Ecosystem
          </h2>
          <p className="text-[#D4CFC4] font-crimson mb-8 max-w-3xl leading-relaxed text-lg">
            A diversified portfolio of brands spanning fintech, real estate,
            aviation, maritime, and trust services. Each brand operates
            independently while benefiting from our integrated network.
          </p>
          <Link to="/scandic-group" className="btn-primary inline-flex items-center gap-2">
            Explore Scandic brands
            <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </section>

    {/* Legier App Section */}
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative z-10">
            <img
              src="/legier-app-mockup.png"
              alt="Legier App Interface"
              className="w-full max-w-md mx-auto "
            />
          </div>
          {/* Decorative background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#A2234E] opacity-5 blur-3xl rounded-full -z-0" />
        </motion.div>

        {/* Right Column - Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-left"
        >
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-8 text-[#F5F1E8]">
            Available soon: <br />
            <span className="relative inline-block text-[#E63946]">
              Legier App
              <svg className="absolute w-[110%] h-4 -bottom-2 -left-[5%] text-[#E63946]" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 12 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="text-xl text-[#D4CFC4] font-crimson leading-relaxed mb-8">
            With the LEGIER app, you always have our entire media world in your pocket.
            Access news from over 100 daily newspapers worldwide in real time, personalize
            your topics and always stay up to date - whether it's politics, business, culture or
            sport.
          </p>

          <div className="flex gap-4">
            <button className="btn-primary" disabled>
              Get Notified
            </button>
          </div>
        </motion.div>
      </div>
    </section>

    <div className="ornamental-divider mb-20" />

    {/* Contact Section - Editorial Form */}
    <section className="max-w-7xl mx-auto px-6 py-20">
      <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }} className="magazine-card p-16">
        <span className="issue-number mb-4 block">Correspondence</span>
        <h2 className="text-5xl font-playfair font-bold mb-4 text-[#F5F1E8]">
          Get in Touch
        </h2>
        <p className="text-[#8F1F45] font-crimson mb-12">
          Connect with our global network
        </p>

        <form className="max-w-2xl space-y-8">
          <div>
            <label className="block text-xs font-inter uppercase tracking-widest text-[#A2234E] mb-3">
              Name
            </label>
            <input type="text" className="w-full bg-[#0A0A0A] border-b border-[#2A2A2A] px-0 py-3 text-[#F5F1E8] focus:border-[#A2234E] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-inter uppercase tracking-widest text-[#A2234E] mb-3">
              Email
            </label>
            <input type="email" className="w-full bg-[#0A0A0A] border-b border-[#2A2A2A] px-0 py-3 text-[#F5F1E8] focus:border-[#A2234E] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-inter uppercase tracking-widest text-[#A2234E] mb-3">
              Message
            </label>
            <textarea rows={5} className="w-full bg-[#0A0A0A] border-b border-[#2A2A2A] px-0 py-3 text-[#F5F1E8] focus:border-[#A2234E] transition-colors resize-none" />
          </div>
          <button type="submit" className="btn-primary">
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  </div>;
}