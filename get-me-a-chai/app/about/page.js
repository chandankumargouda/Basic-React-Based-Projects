import React from 'react'

const About = () => {
  return (
   <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            About Get Me A Chai ☕
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Get Me A Chai is a creator support platform where fans can support
            developers, creators, artists, and students by buying them a chai.
            It’s a simple and fun way to appreciate someone’s work with small
            contributions that make a big impact.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <div className="bg-gray-800/60 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-gray-700">
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">
              Our Mission
            </h2>

            <p className="text-gray-300 leading-relaxed text-lg">
              We believe creators deserve appreciation for their hard work.
              Whether someone is building projects, teaching online, creating
              content, or helping others, Get Me A Chai gives supporters an
              easy way to say “Thank You”.
            </p>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-gray-700">
            <h2 className="text-3xl font-bold mb-4 text-orange-400">
              Why Chai?
            </h2>

            <p className="text-gray-300 leading-relaxed text-lg">
              Chai represents warmth, energy, and connection. Instead of large
              donations, supporters can contribute small amounts — just enough
              to buy a chai — while motivating creators to keep building amazing
              things.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Platform Features 🚀
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:scale-105 transition duration-300 shadow-lg">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-2xl font-semibold mb-3">
                Secure Payments
              </h3>
              <p className="text-gray-400">
                Integrated with Razorpay for smooth and secure online payments.
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:scale-105 transition duration-300 shadow-lg">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-2xl font-semibold mb-3">
                Support Community
              </h3>
              <p className="text-gray-400">
                Fans and supporters can directly encourage creators through
                personalized contributions.
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:scale-105 transition duration-300 shadow-lg">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-semibold mb-3">
                Fast & Modern
              </h3>
              <p className="text-gray-400">
                Built using Next.js, MongoDB, Tailwind CSS, and Razorpay for a
                modern full-stack experience.
              </p>
            </div>
          </div>
        </div>

        {/* Developer Section */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-3xl p-10 text-center shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">
            Built With ❤️ By Chandan
          </h2>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            This project was created as a full-stack learning project to explore
            authentication, payment integration, dynamic routing, database
            management, and responsive UI design using modern web technologies.
          </p>

          <button className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg hover:scale-105 transition duration-300 shadow-lg">
            Buy Me A Chai ☕
          </button>
        </div>
      </div>
    </div>
  )
}

export default About

export const metadata={
  title:"About-Get Me A Chai"
}