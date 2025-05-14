'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Locale } from '@/i18n/settings';

interface HeroProps {
  locale: Locale;
  dictionary: any;
}

export default function Hero({ locale, dictionary }: HeroProps) {
  // Add fallback for home dictionary
  const home = dictionary?.home || {
    hero: {
      title: 'MIRA ACADEMY',
      subtitle: 'Center of Excellence for Professional Training',
      description: 'Transform your future with our innovative training programs tailored to meet market needs. Discover learning paths designed by experts to ensure your professional success.'
    }
  };
  
  const common = dictionary?.common || {
    viewPrograms: 'Discover Programs',
    contact: 'Contact Us'
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate parallax values
  const yScroll = scrollY * -0.3; // Similar to useTransform(scrollY, [0, 500], [0, -150])
  const opacityScroll = Math.max(0, 1 - (scrollY / 300)); // Similar to useTransform(scrollY, [0, 300], [1, 0])

  // Generate random particles
  const generateParticles = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 15 + 5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 20 + 15
    }));
  };

  const particles = generateParticles(25);
  const floatingShapes = generateParticles(8);

  return (
    <section className="relative pt-24 pb-16 md:pt-28 md:pb-24 lg:pt-36 lg:pb-32 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light z-0" />
      
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] mix-blend-overlay opacity-10 z-1" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden z-1">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: 0.1
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.2, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden z-1">
        {floatingShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className={`absolute ${
              shape.id % 3 === 0 ? 'rounded-full bg-secondary/30' :
              shape.id % 3 === 1 ? 'rounded-xl bg-accent/30' : 
              'rounded-2xl bg-primary-light/30'
            }`}
            style={{
              width: shape.size * 3,
              height: shape.size * 3,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              backdropFilter: 'blur(5px)',
              boxShadow: 'inset 0 0 15px rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
            animate={{
              x: [0, shape.id % 2 === 0 ? 50 : -50, 0],
              y: [0, shape.id % 2 === 0 ? -30 : 30, 0],
              rotate: [0, shape.id % 2 === 0 ? 15 : -15, 0],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Main content with parallax effect */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ transform: `translateY(${yScroll}px)` }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Text content */}
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Glowing effect behind title */}
              <div className="absolute -inset-4 bg-secondary/20 blur-3xl rounded-full opacity-50" />
              
              <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/80 drop-shadow-[0_5px_15px_rgba(255,255,255,0.15)]">
                  {home.hero.title}
                </span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <p className="text-xl md:text-2xl font-light mb-8 text-white/90 drop-shadow-md">
                {home.hero.subtitle}
              </p>
            </motion.div>
            
            <motion.p 
              className="text-lg mb-10 max-w-2xl mx-auto lg:mx-0 text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{ opacity: opacityScroll }}
            >
              {home.hero.description}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link
                href={`/${locale}/programs`}
                className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-secondary to-secondary-dark text-white font-medium rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(255,64,129,0.4)]"
              >
                <span className="relative z-10">{common.viewPrograms}</span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <motion.span 
                  className="absolute -inset-x-full -bottom-2 h-2 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50"
                  animate={{ x: ['0%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="group relative overflow-hidden px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-medium rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(255,255,255,0.2)] border border-white/20"
              >
                <span className="relative z-10">{common.contact}</span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Animated 3D-like graphic */}
          <motion.div 
            className="lg:w-1/2 mt-10 lg:mt-0 px-4"
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Animated glowing background */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary/30 via-primary-light/20 to-accent/30 blur-3xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              {/* Main 3D card with glassmorphism */}
              <motion.div 
                className="absolute inset-8 rounded-3xl overflow-hidden perspective-[1000px] shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                animate={{
                  rotateX: mousePosition.y * 0.01,
                  rotateY: mousePosition.x * -0.01
                }}
                style={{
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-light/90 to-primary-dark/90 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm border border-white/10">
                  {/* Inner content with depth */}
                  <div className="relative w-full h-full flex items-center justify-center p-8">
                    {/* Grid pattern background */}
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    
                    {/* Floating elements with different parallax speeds */}
                    <motion.div 
                      className="absolute top-1/4 right-[20%] w-20 h-20 rounded-2xl"
                      style={{
                        background: 'linear-gradient(135deg, #FF4081 0%, #F50057 100%)',
                        boxShadow: '0 10px 30px rgba(255,64,129,0.3)',
                        transform: 'translateZ(30px)'
                      }}
                      animate={{ 
                        rotate: [0, 20, 0],
                        y: [0, -15, 0]
                      }}
                      transition={{ 
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    />
                    <motion.div 
                      className="absolute bottom-1/3 left-[15%] w-16 h-16 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #FFAB40 0%, #FF9100 100%)',
                        boxShadow: '0 10px 30px rgba(255,171,64,0.3)',
                        transform: 'translateZ(50px)'
                      }}
                      animate={{ 
                        x: [0, 15, 0],
                        y: [0, 10, 0]
                      }}
                      transition={{ 
                        duration: 7,
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    />
                    <motion.div 
                      className="absolute top-[60%] left-[30%] w-12 h-12 rounded-lg"
                      style={{
                        background: 'linear-gradient(135deg, #4F6BFF 0%, #3F51B5 100%)',
                        boxShadow: '0 10px 30px rgba(79,107,255,0.3)',
                        transform: 'translateZ(40px)'
                      }}
                      animate={{ 
                        rotate: [0, -15, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 6,
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    />
                    
                    {/* Center logo */}
                    <motion.div
                      className="relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 px-8 py-6"
                      style={{
                        boxShadow: '0 15px 50px rgba(0,0,0,0.3)',
                        transform: 'translateZ(60px)'
                      }}
                      animate={{
                        y: [0, -5, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">MA</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          style={{ opacity: opacityScroll }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-14 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-white opacity-70"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
} 