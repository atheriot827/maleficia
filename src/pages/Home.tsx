import React from "react";
import { motion } from "framer-motion";

const Home = () => (
  <section className="mx-auto max-w-5xl px-4 py-16">
    <motion.div
      className="glass p-10 text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="gothic text-5xl md:text-6xl text-slate-100 mb-4">
        Welcome to the Author&apos;s Lair
      </h1>
      <p className="text-lg text-slate-300 max-w-2xl mx-auto">
        Dark tales in a modern shell. Explore books, wander the blog, or send a message from the calm before the storm.
      </p>
    </motion.div>
  </section>
);

export default Home;