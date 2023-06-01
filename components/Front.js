"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'
const Front = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
 return (
    <>
    {/* Menu button */}
      <button
    className="focus:outline-none fixed right-3 top-2 z-50"
     onClick={toggleMenu}
  >
    <Image
      src={'/menu.gif'}
      width={50}
      height={50}
      className={`${isMenuOpen ? 'hidden' : 'block'} filter brightness-0 invert`}
    />
    <Image
      src={'/cross.gif'}
      width={50}
      height={50}
      className={`${isMenuOpen ? 'block' : 'hidden'} filter brightness-0 invert`}
    />
  </button>

      {/* Sidebar menu */}
      <div
        className={`bg-slate-800 fixed top-0 left-0 h-full w-[100vw] flex flex-col justify-center z-40 p-4 transition duration-300 ease-in-out transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul>
          <Link onClick={toggleMenu} href="#about"><li className="py-2 abel text-gray-400 text-[7vw] cursor-pointer transition-all hover:text-gray-100  hover:font-bold hover:translate-x-7 hover:list-disc">ABOUT</li></Link>
          <Link onClick={toggleMenu} href="#experience"><li className="py-2 abel text-gray-400 text-[7vw] cursor-pointer transition-all hover:text-gray-100  hover:font-bold hover:translate-x-7 hover:list-disc">EXPERIENCE</li></Link>
          <Link onClick={toggleMenu} href="#work"><li className="py-2 abel text-gray-400 text-[7vw] cursor-pointer transition-all hover:text-gray-100  hover:font-bold hover:translate-x-7 hover:list-disc">WORK</li></Link>
          <Link onClick={toggleMenu} href="#contact"><li className="py-2 abel text-gray-400 text-[7vw] cursor-pointer transition-all hover:text-gray-100  hover:font-bold hover:translate-x-7 hover:list-disc">CONTACT</li></Link>
        </ul>
      </div>
        <motion.a  drag dragConstraints={{
          top: -300,
      left: -300,
      right: 300,
      bottom: 300,
    }} href="mailto:lochanjangidcoder@gmail.com" className='text-cyan-300 rotate-90 z-50 hidden sm:block fixed -right-20 bottom-60 hover:bottom-64'>lochanjangidcoder@gmail.com</motion.a>
       <motion.span  drag dragConstraints={{
          top: -300,
      left: -300,
      right: 300,
      bottom: 300,
    }} className='fixed right-7 -bottom-7 w-[2px] h-40 bg-gray-400 hover:bottom-0 z-50 hidden sm:block'></motion.span>
      </>
  )
};

export default Front;
