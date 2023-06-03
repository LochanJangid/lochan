"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Content from './Content';
import { motion } from 'framer-motion';

export default function Home() {
  useEffect(() => {

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress(prevProgress => prevProgress + 1);
      } else {
        setIsLoading(false);
      }
    }, 5);

    return () => {
      clearInterval(timer);
    };
  }, [progress]);

  if (isLoading) {
    return (
      <div className='w-[100vw] h-[100vh] bg-slate-900 flex flex-col justify-center items-center'>
        <motion.div
          className='animate-bounce'
          initial={{ scale: 0 }}
          animate={{ rotate: 180, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <h1 className='text-5xl font-bold space_grotesk text-cyan-300 animate-pulse'>LJ</h1>
        </motion.div>
        <div className='w-64 h-4 mt-8 bg-slate-600 rounded-md'>
          <div
            className='h-full bg-cyan-300 rounded-md'
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Content />
      </div>
    );
  }
}
