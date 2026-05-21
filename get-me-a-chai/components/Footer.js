import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-orange-400 mb-2">
            ChaiFund ☕
          </h2>
          <p className="text-sm">
            Helping creators grow with support from chai lovers.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-orange-400">Explore Projects</a></li>
            <li><a href="#" className="hover:text-orange-400">Start Campaign</a></li>
            <li><a href="#" className="hover:text-orange-400">How it Works</a></li>
            <li><a href="#" className="hover:text-orange-400">Contact</a></li>
          </ul>
        </div>

        {/* CTA */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support Creators</h3>
          <p className="text-sm mb-3">
            Every chai counts. Fuel someone's dream today.
          </p>
          <button className="bg-orange-400 text-black px-4 py-2 rounded-full font-semibold hover:bg-orange-500 transition">
            Buy a Chai ☕
          </button>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-500">
        © 2026 ChaiFund. Made with ❤️ for creators.
      </div>
    </footer>
  );
}