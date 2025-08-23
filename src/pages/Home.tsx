import React from "react";

const Home = () => (
  <div className="p-8 flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-5xl font-bold mb-6 text-red-600 flicker" style={{ fontFamily: "'UnifrakturCook', cursive, serif" }}>
      Welcome to the Author's Lair
    </h1>
    <p className="text-xl text-red-400 max-w-xl text-center">
      Discover dark tales, haunting blogs, and reach out to the author from the shadows.
    </p>
  </div>
);

export default Home;