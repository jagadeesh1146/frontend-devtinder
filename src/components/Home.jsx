import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
        <div className="inline-block px-4 py-2 mb-6 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm">
          Built for Developers
        </div>

        <h1 className="text-4xl md:text-7xl font-bold leading-tight">
          Find Your Developer
          <span className="block text-purple-400">
            Community
          </span>
        </h1>

        <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Discover developers, build meaningful connections,
          exchange ideas, and grow together with DevTinder.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 font-semibold transition"
          >
            Get Started →
          </Link>

          <a
            href="#features"
            className="px-8 py-4 rounded-xl border border-gray-700 hover:bg-gray-800 font-semibold transition"
          >
            Explore Features
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-6 pb-24"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          Connect. Collaborate. Grow.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800">
            <div className="text-4xl mb-5">👨‍💻</div>
            <h3 className="text-xl font-semibold mb-3">
              Discover Developers
            </h3>
            <p className="text-gray-400 leading-7">
              Explore developer profiles and discover people
              with different skills and interests.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800">
            <div className="text-4xl mb-5">🤝</div>
            <h3 className="text-xl font-semibold mb-3">
              Build Connections
            </h3>
            <p className="text-gray-400 leading-7">
              Send connection requests and expand your
              professional developer network.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800">
            <div className="text-4xl mb-5">🚀</div>
            <h3 className="text-xl font-semibold mb-3">
              Grow Together
            </h3>
            <p className="text-gray-400 leading-7">
              Meet like-minded developers, share ideas,
              and explore opportunities to collaborate.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center px-6 py-16 bg-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to make your next connection?
        </h2>

        <p className="mt-4 text-gray-400">
          Start discovering your developer community today.
        </p>

        <Link
          to="/login"
          className="inline-block mt-8 px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 font-semibold transition"
        >
          Join DevTinder
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 border-t border-gray-800">
        © {new Date().getFullYear()} DevTinder. Built for developers.
      </footer>
    </div>
  );
};

export default Home
