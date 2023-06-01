import React from 'react'
import Front from '../../components/Front'
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
const Content = () => {
    const experiences = [
        {
          name: 'MTS School',
          type: 'Full Time',
          startDate: 'JULY 2018',
          location: 'Sawai Madhopur, India',
          description: 'Manage School Online System (like: RTE, BSER). All work of a student (admission form to marksheet).',
        },
        {
          name: 'Bright Sun Sikshan Sansthan',
          type: 'Halp-Time',
          startDate: 'JUNE 2020',
          location: 'Sawai Madhopur, India',
          description: 'Manage School Online System (like: RTE). Admission students and manage things related to online school sites.',
        },
        {
          name: 'Shubham Sr. Sec. School',
          type: 'Few-Time',
          startDate: 'JUNE 2020',
          location: 'Sawai Madhopur, India',
          description: 'Fix issues related to online site work. Solve problems related to online school sites (like: RTE, BSER).',
        },
      ];
      const works = [
        {
          projectName : 'Fan System',
          disc: 'I have developed a fan system using HTML, CSS, and JavaScript. It is a simple web application that allows users to control the speed and rotation of a virtual fan. The project demonstrates my skills in front-end development and working with JavaScript events and animations.  The source code for this project is available on GitHub.',
          language: 'HTML, CSS, and JavaScript.',
          github: 'https://github.com/LochanJangid/FanSystem',
          link: 'https://lochanjangid.github.io/FanSystem/',
        },
        {
          projectName : 'Lochan Blog',
          disc: 'I have developed Sample Blog Site using NEXT.JS, TAILWINDCSS, APIs. It is a simple web application where I will post blogs. The project demonstrates my skills in front-end development and working with JavaScript and APIs . The source code for this project is available on GitHub.',
          language: 'NEXT.JS, TAILWINDCSS.',
          github: 'https://github.com/LochanJangid/LochanBlog',
          link: 'https://lochanblog.vercel.app/',
        },
        {
          projectName : 'MTS School',
          disc: 'I have developed MTS School site using NEXT.JS, TAILWINDCSS, APIs. It is a website of a school where to fill form and visit site. The project demonstrates my skills in Full-stack development and working with JavaScript and APIs . The source code for this project is available on GitHub.',
          language: 'NEXT.JS, TAILWINDCSS.',
          github: 'https://github.com/lochan-code/mts',
          link: 'https://mtsbk.vercel.app/',
        },
        {
          projectName : 'Photographer',
          disc: 'I have developed a photographer using HTML, CSS, JAVASCRIPT. It is a simple web application that allows users to control the speed and rotation of a virtual fan. The project demonstrates my skills in front-end development and working with JavaScript events and Css responsiveness and clean code.  The source code for this project is available on GitHub.',
          language: 'HTML, CSS, JAVASCRIPT.',
          github: 'https://github.com/LochanJangid/photography',
          link: 'https://lochanjangid.github.io/photography/',
        },
        {
          projectName : 'Ketan Portfolio',
          disc: 'I have developed Ketan Portfolio using HTML, CSS, JAVASCRIPT. NODE.JS, MONGODB. It is a simple web application that use (!Cloud) MongoDb and Node.js. Here, I use mustache files as a html template.  The source code for this project is available on GitHub.',
          language: 'HTML, CSS, JAVASCRIPT. NODE.JS, MONGODB',
          github: 'https://github.com/LochanJangid/portfolio-ketan',
        }
      ];
  return (
    <div>
      <Front />
      <div className='bg-slate-900'>
      <div className='h-[100vh] flex items-center justify-start'>
      <div className="space_grotesk">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-cyan-300 font-light m-3 text-md'
        >
          Hi, my name is
        </motion.header>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='text-white text-[8vw] sm:text-[5vw] font-bold m-3'
        >
          Lochan Jangid.
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='text-gray-400 text-[7vw] font-bold m-3'
        >
          I create things for the web.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className='text-gray-400 text-md m-3 sm:w-1/2 w-full'
        >
          I'm a Full-Stack Web Developer. I'm focused on building custom and responsive websites with a backend. I learn something new every time.
        </motion.p>
        <Link target="_blank" href="/resume.pdf">
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className='text-white m-3 p-4 px-6 border rounded-lg border-cyan-300 transition-all hover:px-8 hover:bg-cyan-300 hover:text-black'
          >
            Resume
          </motion.button>
        </Link>
      </div>
    </div>
    <section id='about' className="bg-slate-900 py-10">
            <h2 className="text-center abel text-gray-400 text-2xl">About Me</h2>
      <div className="px-4">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="md:w-1/2 bg-slate-800 p-3 rounded-lg shadow-sm">
            <motion.p initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 , delay: 0.4 }} className="text-lg text-gray-100 mb-4">
              Hello! My name is Lochan and I enjoy creating things that live on the internet. My interest in web development started back in 2019 when I decided to make some different arts on the web. I am started with HTML, CSS and JavaScript.
            </motion.p>
            <motion.p initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 , delay: 0.4 }} className="text-lg text-gray-100 mb-4">
              Here are a few technologies I’ve been working with recently:
            </motion.p>
              <ul>
                <li className='text-cyan-300 text-sm flex'><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill='#fff'><path d="M400-280v-400l200 200-200 200Z"/></svg>HTML</li>
                <li className='text-cyan-300 text-sm flex'><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill='#fff'><path d="M400-280v-400l200 200-200 200Z"/></svg>CSS / SASS</li>
                <li className='text-cyan-300 text-sm flex'><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill='#fff'><path d="M400-280v-400l200 200-200 200Z"/></svg>JAVASCRIPT (ES6+)</li>
                <li className='text-cyan-300 text-sm flex'><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill='#fff'><path d="M400-280v-400l200 200-200 200Z"/></svg>NODE.JS</li>
                <li className='text-cyan-300 text-sm flex'><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill='#fff'><path d="M400-280v-400l200 200-200 200Z"/></svg>REACT (NEXT.JS)</li>
                <li className='text-cyan-300 text-sm flex'><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill='#fff'><path d="M400-280v-400l200 200-200 200Z"/></svg>MONGODB</li>
                <li className='text-cyan-300 text-sm flex'><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill='#fff'><path d="M400-280v-400l200 200-200 200Z"/></svg>TAILWIND</li>
              </ul>
          </div>
          <motion.div initial={{ opacity: 0, x: -20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }} className="md:w-1/2">
            <Image
              src="/img.jpg"
              alt="About Me"
              width={500}
              height={500}
            />
          </motion.div>
        </div>
      </div>
    </section>
    <div>
  <header className='text-center abel text-gray-400 text-2xl ' id='experience'>
    EXPERIENCE
  </header>
  {experiences.map((experience, index) => (
    <motion.div initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }} key={index} className='bg-slate-800 m-3 p-3 rounded-md shadow-lg'>
      <motion.h1 initial={{ opacity: 0, x: -20 }} className='text-white'>{experience.name}</motion.h1>
      <motion.h2           whileInView={{ opacity: 1, x: 0 }} className='text-gray-400'>{experience.type} | {experience.startDate} - | {experience.location}</motion.h2>
      <motion.p            transition={{ duration: 0.2 , delay: 0.4 }} className='text-gray-500'>{experience.description}</motion.p>
    </motion.div>
  ))}
</div>
<div id='work'>
  <header className='text-center abel text-gray-400 text-2xl z-40 ' id='experience'>WORK</header>
  <div className='flex flex-wrap justify-center items-center'>
    {works.map((work, index) => (
      <motion.div initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }} key={index} className='bg-slate-800 m-3 p-3 rounded-md shadow-lg w-96 relative'>
        <div className='flex items-center'>
          <h1 className='text-white text-xl mr-10'>{work.projectName}</h1>
          <div className='absolute right-6 flex space-x-3'>
            {work.github && (
              <Link target="_blank" href={work.github}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" role="img" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
                  <title>GitHub</title>
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </Link>
            )}
            {work.link && (
              <Link target="_blank" href={work.link}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" role="img" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-external-link">
                  <title>External Link</title>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </Link>
            )}
          </div>
        </div>
        <p className='text-gray-500 w-50'>{work.disc} Made by <span className='text-cyan-300'>{work.language}</span></p>
      </motion.div>
    ))}
  </div>
</div>
<div id="contact">
<header className='text-center abel text-gray-400 text-2xl z-40 ' id='experience'>CONTACT</header>
<div className="flex space-x-2 justify-center items-center p-5">
  <Link href={'https://github.com/LochanJangid'} className='pointer' target='_blank'><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" width='50' height='50' stroke="#67e8f9" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><title>GitHub</title><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></Link>
  <Link href={'https://www.linkedin.com/in/lochan-jangid-9a1073271/'} className='pointer' target='_blank'><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" width='50' height='50' stroke="#67e8f9" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin"><title>LinkedIn</title><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></Link>
  <Link href={'mailto:lochanjangidcoder@gmail.com'} className='pointer' target='_blank'><Image src={'/mail.png'} width={50} height={50} /></Link>
</div>
</div>
  </div>
    </div>
  )
}

export default Content
