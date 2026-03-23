"use client";

import { motion } from "framer-motion";

export default function Contact() {
  const email = "lochanjangidcoder@gmail.com";

  const subject = encodeURIComponent("Opportunity / Collaboration");
  const body = encodeURIComponent(
    "Hi Lochan,\n\nI came across your portfolio and would like to connect.\n\nRegards,"
  );

  const mailLink = `mailto:${email}?subject=${subject}&body=${body}`;

  return (
    <section id="contact" className="px-10 py-24 text-center">

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-[clamp(2.5rem,7vw,5rem)] font-bold mb-6"
      >
        Let’s build something <br />
        <span className="text-cyan-400">meaningful.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-gray-400 max-w-xl mx-auto mb-10"
      >
        Whether it's data, ideas, or collaboration — feel free to reach out.
        I usually respond faster than your model trains.
      </motion.p>

      {/* BUTTONS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex flex-wrap justify-center gap-4"
      >
        {/* EMAIL */}
        <a
          href={mailLink}
          className="bg-cyan-400 text-black px-6 py-3 rounded font-medium hover:opacity-80 transition"
        >
          Send Email
        </a>

        {/* LINKEDIN */}
        <a
          href="https://www.linkedin.com/in/lochan-jangid-9a1073271/"
          target="_blank"
          className="border border-white/10 px-6 py-3 rounded hover:border-cyan-400 hover:text-cyan-400 transition"
        >
          Connect on LinkedIn →
        </a>
      </motion.div>

    </section>
  );
}