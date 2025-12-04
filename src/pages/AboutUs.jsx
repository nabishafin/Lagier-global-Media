import React, { useEffect, useRef, Component } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Globe, Target, Users, Shield, Zap, Award, Building2, Network } from 'lucide-react';
// 3D Globe Component - Gold wireframe
function ThreeGlobe() {
  const mountRef = useRef(null);
  useEffect(() => {
    if (!mountRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    // Create globe
    const globeGeometry = new THREE.SphereGeometry(2, 32, 32);
    const globeMaterial = new THREE.MeshBasicMaterial({
      color: 0xa2234e,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    // Add connection points
    const pointGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    const pointMaterial = new THREE.MeshBasicMaterial({
      color: 0xa2234e
    });
    const points = [];
    for (let i = 0; i < 115; i++) {
      const phi = Math.acos(-1 + 2 * i / 115);
      const theta = Math.sqrt(115 * Math.PI) * phi;
      const x = 2 * Math.cos(theta) * Math.sin(phi);
      const y = 2 * Math.sin(theta) * Math.sin(phi);
      const z = 2 * Math.cos(phi);
      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      point.position.set(x, y, z);
      scene.add(point);
      points.push(point);
    }
    // Add connecting lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xa2234e,
      transparent: true,
      opacity: 0.15
    });
    for (let i = 0; i < 20; i++) {
      const p1 = points[Math.floor(Math.random() * points.length)];
      const p2 = points[Math.floor(Math.random() * points.length)];
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([p1.position, p2.position]);
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
    }
    camera.position.z = 5;
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      globe.rotation.y += 0.001;
      points.forEach(point => {
        point.rotation.y += 0.001;
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
      renderer.dispose();
    };
  }, []);
  return <div ref={mountRef} className="w-full h-full" />;
}
// 3D Icon Component
function ThreeIcon({
  type
}) {
  const mountRef = useRef(null);
  useEffect(() => {
    if (!mountRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    let geometry;
    switch (type) {
      case 'globe':
        geometry = new THREE.SphereGeometry(0.7, 16, 16);
        break;
      case 'target':
        geometry = new THREE.TorusGeometry(0.5, 0.15, 16, 32);
        break;
      case 'users':
        geometry = new THREE.OctahedronGeometry(0.6);
        break;
      case 'shield':
        geometry = new THREE.ConeGeometry(0.5, 1, 4);
        break;
      case 'zap':
        geometry = new THREE.TetrahedronGeometry(0.7);
        break;
      case 'award':
        geometry = new THREE.IcosahedronGeometry(0.6);
        break;
      default:
        geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    }
    const material = new THREE.MeshBasicMaterial({
      color: 0xa2234e,
      wireframe: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.position.z = 2;
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      mesh.rotation.x += 0.008;
      mesh.rotation.y += 0.008;
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [type]);
  return <div ref={mountRef} className="w-full h-full" />;
}
export function AboutUs() {
  const sections = [{
    icon: Globe,
    type: 'globe',
    title: 'Global Identity',
    content: 'LEGIER is a worldwide media network connecting 115 independent newspapers across six continents. We believe in the power of local journalism amplified through global infrastructure and shared innovation.'
  }, {
    icon: Target,
    type: 'target',
    title: 'Mission',
    content: 'To empower independent journalism through cutting-edge technology and collaborative infrastructure. We provide the tools and platforms that enable local newsrooms to thrive in the digital age while maintaining editorial independence.'
  }, {
    icon: Users,
    type: 'users',
    title: 'Culture & Values',
    content: 'We champion editorial independence, journalistic integrity, and technological innovation. Our culture celebrates diversity of thought, collaborative problem-solving, and a commitment to serving communities through quality journalism.'
  }, {
    icon: Shield,
    type: 'shield',
    title: 'Editorial Integrity',
    content: 'Each publication in our network maintains complete editorial independence. We provide infrastructure and support while respecting the unique voice and mission of every newsroom. Trust is earned through consistent, ethical journalism.'
  }, {
    icon: Zap,
    type: 'zap',
    title: 'Innovation',
    content: 'We invest heavily in technology that serves journalism. From AI-powered content tools to advanced analytics platforms, we build systems that help journalists work smarter and reach audiences more effectively.'
  }, {
    icon: Award,
    type: 'award',
    title: 'Excellence',
    content: 'Our network has earned recognition for journalistic excellence, digital innovation, and business sustainability. We measure success not just in metrics, but in the impact our journalism has on communities worldwide.'
  }];
  const stats = [{
    value: '115',
    label: 'Newspapers',
    icon: Building2
  }, {
    value: '50M+',
    label: 'Daily Readers',
    icon: Users
  }, {
    value: '45',
    label: 'Countries',
    icon: Globe
  }, {
    value: '25+',
    label: 'Languages',
    icon: Network
  }];
  return <div className="min-h-screen pt-20 md:pt-32">
    {/* Hero Section with 3D Globe - Magazine cover style */}
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
        <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }}>
          <div className="byline mb-6">In-Depth Profile</div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 md:mb-8 text-[#F5F1E8] leading-tight">
            About LEGIER
          </h1>
          <p className="text-xl font-crimson text-[#D4CFC4] leading-relaxed drop-cap">
            Building the future of independent journalism through global
            collaboration and technological innovation.
          </p>
        </motion.div>

        <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="h-96 relative">
          <ThreeGlobe />
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-xs font-inter uppercase tracking-widest text-[#8F1F45]">
              Global Network Visualization
            </p>
          </div>
        </motion.div>
      </div>

      <div className="ornamental-divider" />

      {/* Stats Grid - Editorial callouts */}
      <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.4
      }} className="grid grid-cols-2 md:grid-cols-4 gap-6 my-20">
        {stats.map((stat, index) => <motion.div key={stat.label} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.5 + index * 0.1
        }} className="magazine-card p-8 text-center relative overflow-hidden group">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-10 transition-opacity">
            <stat.icon size={120} className="text-[#A2234E]" />
          </div>

          <div className="relative z-10">
            <p className="text-5xl font-playfair font-bold text-[#A2234E] mb-2">
              {stat.value}
            </p>
            <p className="text-xs font-inter uppercase tracking-widest text-[#8F1F45]">
              {stat.label}
            </p>
          </div>
        </motion.div>)}
      </motion.div>

      <div className="ornamental-divider" />

      {/* Content Sections - Magazine article layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-20">
        {sections.map((section, index) => <motion.div key={section.title} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: index * 0.1
        }} viewport={{
          once: true,
          margin: '-100px'
        }} className="magazine-card p-10 group">
          <div className="flex items-start gap-6">
            {/* 3D Icon Container */}
            <div className="flex-shrink-0 w-24 h-24 relative">
              <div className="absolute inset-0 bg-[#1A1A1A] border border-[#2A2A2A] group-hover:border-[#A2234E] transition-colors" />
              <div className="absolute inset-0">
                <ThreeIcon type={section.type} />
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-playfair font-bold mb-4 text-[#F5F1E8] group-hover:text-[#A2234E] transition-colors">
                {section.title}
              </h2>
              <p className="text-[#D4CFC4] font-crimson leading-relaxed">
                {section.content}
              </p>
            </div>
          </div>
        </motion.div>)}
      </div>

      <div className="ornamental-divider" />

      {/* Infrastructure Section - Editorial spread */}
      <motion.div initial={{
        opacity: 0,
        y: 50
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }} className="magazine-card p-16 my-20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 opacity-5">
          <ThreeIcon type="globe" />
        </div>

        <div className="relative z-10">
          <span className="issue-number mb-6 block">
            Technical Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-bold mb-8 md:mb-12 text-[#F5F1E8]">
            Infrastructure Capabilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.2
            }} viewport={{
              once: true
            }}>
              <h3 className="text-2xl font-playfair font-semibold mb-8 text-[#A2234E]">
                Technology Platform
              </h3>
              <ul className="space-y-4 text-[#D4CFC4] font-crimson">
                <li className="flex items-start gap-4">
                  <div className="w-2 h-[1px] bg-[#A2234E] mt-3" />
                  <span>Cloud-native content management systems</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-[1px] bg-[#A2234E] mt-3" />
                  <span>Advanced analytics and business intelligence</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-[1px] bg-[#A2234E] mt-3" />
                  <span>Mobile-first publishing platforms</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-[1px] bg-[#A2234E] mt-3" />
                  <span>Real-time collaboration tools</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-[1px] bg-[#A2234E] mt-3" />
                  <span>Automated workflow systems</span>
                </li>
              </ul>
            </motion.div>

            <motion.div initial={{
              opacity: 0,
              x: 20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.3
            }} viewport={{
              once: true
            }}>
              <h3 className="text-2xl font-playfair font-semibold mb-8 text-[#A2234E]">
                Support Services
              </h3>
              <ul className="space-y-4 text-[#D4CFC4] font-crimson">
                <li className="flex items-start gap-4">
                  <div className="w-2 h-[1px] bg-[#A2234E] mt-3" />
                  <span>24/7 technical support</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-[1px] bg-[#A2234E] mt-3" />
                  <span>Training and development programs</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-[1px] bg-[#A2234E] mt-3" />
                  <span>Best practice sharing networks</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-[1px] bg-[#A2234E] mt-3" />
                  <span>Legal and compliance guidance</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-[1px] bg-[#A2234E] mt-3" />
                  <span>Revenue optimization consulting</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Governance Section - Editorial feature */}
      <motion.div initial={{
        opacity: 0,
        y: 50
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }} className="magazine-card p-16 border-2 border-[#A2234E]">
        <span className="issue-number mb-6 block">Leadership</span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 md:mb-8 text-[#F5F1E8]">
          Governance & Leadership
        </h2>

        <div className="pull-quote mb-8">
          LEGIER operates under a distributed governance model that respects
          local autonomy while enabling global collaboration.
        </div>

        <p className="text-[#D4CFC4] font-crimson leading-relaxed text-lg">
          Each publication maintains its own editorial board and leadership
          team, with shared services provided through our central
          organization. Our leadership team brings decades of experience in
          journalism, technology, and business management. We are committed to
          sustainable growth, ethical practices, and the long-term health of
          independent journalism worldwide.
        </p>
      </motion.div>
    </div>
  </div>;
}