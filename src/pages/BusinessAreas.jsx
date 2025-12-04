import React, { useEffect, useState, useRef, Component } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Newspaper, Radio, Smartphone, BarChart3, Users, Globe, ArrowRight } from 'lucide-react';

// 3D Scene Component - Gold wireframe aesthetic
function ThreeScene({ type }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    let geometry;
    switch (type) {
      case 'publishing':
        geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        break;
      case 'broadcasting':
        geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
        break;
      case 'digital':
        geometry = new THREE.OctahedronGeometry(1.2);
        break;
      case 'data':
        geometry = new THREE.IcosahedronGeometry(1.2);
        break;
      case 'advertising':
        geometry = new THREE.ConeGeometry(1, 2, 6);
        break;
      case 'partnerships':
        geometry = new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16);
        break;
      default:
        geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    }

    const material = new THREE.MeshBasicMaterial({
      color: 0xa2234e,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add smaller orbiting shapes
    const smallGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const smallMaterial = new THREE.MeshBasicMaterial({ color: 0xa2234e });
    const orbitingShapes = [];

    for (let i = 0; i < 5; i++) {
      const smallMesh = new THREE.Mesh(smallGeometry, smallMaterial);
      scene.add(smallMesh);
      orbitingShapes.push(smallMesh);
    }

    camera.position.z = 4;

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.003;

      orbitingShapes.forEach((shape, i) => {
        const angle = Date.now() * 0.0008 + (i * (Math.PI * 2)) / 5;
        shape.position.x = Math.cos(angle) * 2;
        shape.position.y = Math.sin(angle) * 2;
        shape.position.z = Math.sin(angle * 2) * 0.5;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      mountRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [type]);

  return <div ref={mountRef} className="w-full h-full" />;
}

export function BusinessAreas() {
  const horizontalRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const businessAreas = [
    {
      id: 'publishing',
      icon: Newspaper,
      title: 'Publishing & Content',
      description: 'Traditional and digital publishing across 115 newspapers worldwide. We maintain editorial independence while leveraging shared infrastructure and best practices.',
      details: [
        'Print and digital editions',
        'Content management systems',
        'Editorial workflows',
        'Distribution networks'
      ],
      stats: { value: '115', label: 'Newspapers' }
    },
    {
      id: 'broadcasting',
      icon: Radio,
      title: 'Broadcasting & Media',
      description: 'Integrated broadcasting solutions spanning radio, podcasts, and streaming media. Modern content delivery for contemporary audiences.',
      details: [
        'Radio networks',
        'Podcast production',
        'Streaming platforms',
        'Audio content distribution'
      ],
      stats: { value: '50M+', label: 'Monthly Listeners' }
    },
    {
      id: 'digital',
      icon: Smartphone,
      title: 'Digital Platforms',
      description: 'Cutting-edge digital infrastructure powering our global network. Mobile-first applications and web platforms for seamless content access.',
      details: [
        'Mobile applications',
        'Web platforms',
        'API infrastructure',
        'Cloud services'
      ],
      stats: { value: '99.9%', label: 'Uptime' }
    },
    {
      id: 'data',
      icon: BarChart3,
      title: 'Data & Analytics',
      description: 'Advanced analytics and business intelligence driving informed decisions. Real-time insights into audience behavior and content performance.',
      details: [
        'Audience analytics',
        'Performance metrics',
        'Predictive modeling',
        'Business intelligence'
      ],
      stats: { value: '2B+', label: 'Data Points Daily' }
    },
    {
      id: 'advertising',
      icon: Users,
      title: 'Advertising & Marketing',
      description: 'Comprehensive advertising solutions connecting brands with engaged audiences. Programmatic and direct sales across our network.',
      details: [
        'Display advertising',
        'Programmatic solutions',
        'Sponsored content',
        'Marketing services'
      ],
      stats: { value: '10K+', label: 'Active Campaigns' }
    },
    {
      id: 'partnerships',
      icon: Globe,
      title: 'Strategic Partnerships',
      description: 'Building collaborative relationships with media organizations, technology partners, and content creators worldwide.',
      details: [
        'Content syndication',
        'Technology partnerships',
        'Joint ventures',
        'Strategic alliances'
      ],
      stats: { value: '200+', label: 'Global Partners' }
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!horizontalRef.current) return;
      const scrollLeft = horizontalRef.current.scrollLeft;
      const cardWidth = horizontalRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(newIndex);
    };

    const ref = horizontalRef.current;
    ref?.addEventListener('scroll', handleScroll);
    return () => ref?.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (!horizontalRef.current) return;

      const maxScroll = horizontalRef.current.scrollWidth - horizontalRef.current.clientWidth;
      const currentScroll = horizontalRef.current.scrollLeft;

      if (currentScroll >= maxScroll) {
        // Reset to start when reaching the end
        horizontalRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll to next card
        const cardWidth = horizontalRef.current.clientWidth;
        horizontalRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 5000); // Change card every 5 seconds

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="min-h-screen pt-20 md:pt-32">
      {/* Hero Section - Magazine Feature Article Style */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="byline mb-6">Special Report</div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 md:mb-8 text-[#F5F1E8] leading-tight">
            Business Areas
          </h1>
          <p className="text-xl font-crimson text-[#D4CFC4] max-w-3xl leading-relaxed drop-cap">
            LEGIER Media Group stands for more than classic journalism. We are a
            comprehensive media ecosystem that combines traditional publishing
            with cutting-edge digital innovation.
          </p>
        </motion.div>

        {/* Scroll Indicator - Editorial style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-6 mb-8"
        >
          <div className="flex gap-2">
            {businessAreas.map((_, index) => (
              <div
                key={index}
                className={`h-[2px] transition-all duration-300 ${index === activeIndex
                  ? 'w-16 bg-[#A2234E]'
                  : 'w-8 bg-[#2A2A2A]'
                  }`}
              />
            ))}
          </div>
          <p className="text-xs font-inter uppercase tracking-widest text-[#8F1F45]">
            Auto-scrolling →
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scroll Section - Magazine Spread Style */}
      <div
        ref={horizontalRef}
        className="overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-20"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex gap-12 px-6" style={{ width: 'max-content' }}>
          {businessAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="snap-center flex-shrink-0"
              style={{ width: 'calc(100vw - 48px)', maxWidth: '1200px' }}
            >
              <div className="magazine-card overflow-hidden h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                  {/* 3D Visualization Side */}
                  <div className="relative bg-[#1A1A1A] p-16 flex items-center justify-center border-r border-[#2A2A2A]">
                    <div className="w-full h-96">
                      <ThreeScene type={area.id} />
                    </div>

                    {/* Floating Stat - Editorial callout */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute top-12 right-12 bg-[#0A0A0A] border-2 border-[#A2234E] p-8"
                    >
                      <p className="text-5xl font-playfair font-bold text-[#A2234E]">
                        {area.stats.value}
                      </p>
                      <p className="text-xs font-inter uppercase tracking-widest text-[#8F1F45] mt-2">
                        {area.stats.label}
                      </p>
                    </motion.div>

                    {/* Section number watermark */}
                    <span
                      className="section-number"
                      style={{ bottom: '2rem', left: '2rem' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Content Side - Editorial layout */}
                  <div className="p-16 flex flex-col justify-center bg-[#0A0A0A]">
                    <div className="byline mb-6">
                      Section {String(index + 1).padStart(2, '0')}
                    </div>

                    <area.icon className="text-[#A2234E] mb-8" size={56} />

                    <h2 className="text-5xl font-playfair font-bold mb-8 text-[#F5F1E8] leading-tight">
                      {area.title}
                    </h2>

                    <p className="text-[#D4CFC4] font-crimson leading-relaxed mb-8 text-lg">
                      {area.description}
                    </p>

                    <div className="space-y-4 mb-10">
                      {area.details.map((detail, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-4"
                        >
                          <div className="w-2 h-[1px] bg-[#A2234E]" />
                          <p className="text-[#D4CFC4] font-crimson">{detail}</p>
                        </motion.div>
                      ))}
                    </div>

                    <button className="btn-primary inline-flex items-center gap-2 w-fit">
                      Learn More
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Legier App Section - Editorial Feature Box */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="ornamental-divider mb-20" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="magazine-card p-16 relative overflow-hidden"
        >
          {/* Background 3D Element */}
          <div className="absolute right-0 top-0 w-96 h-96 opacity-10">
            <ThreeScene type="digital" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-[#A2234E] text-[#0A0A0A] px-6 py-2 text-xs font-inter uppercase tracking-widest font-semibold mb-8"
            >
              Coming Soon
            </motion.div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 md:mb-8 text-[#F5F1E8]">
              Legier App
            </h2>

            <p className="text-[#D4CFC4] font-crimson leading-relaxed mb-6 text-lg drop-cap">
              Experience our entire network through a unified mobile
              application. Access all 115 newspapers, personalized content
              recommendations, and real-time updates in one seamless interface.
            </p>

            <p className="text-[#8F1F45] font-crimson leading-relaxed mb-10">
              The Legier App represents the future of news
              consumption—intelligent, personalized, and globally connected.
              Stay informed with content that matters to you, delivered through
              an elegant, data-driven experience.
            </p>

            <button className="btn-primary" disabled>
              Notify Me at Launch
            </button>
          </div>
        </motion.div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}