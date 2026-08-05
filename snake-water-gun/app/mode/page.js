"use client";

import Link from "next/link";
import Image from "next/image";

export default function ModePage() {
  return (
    <main className="relative min-h-screen">

      {/* Background */}
      <Image
        src="/jungle.png"
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Choose Your Mode
        </h1>

        <p className="text-gray-300 mb-12 text-lg">
          Select how you want to play
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Computer */}
          <Link href="/computer">
            <div className="w-80 rounded-3xl bg-white/10 backdrop-blur-md border border-green-500 p-8 hover:scale-105 hover:border-green-400 transition duration-300 cursor-pointer">

              <div className="flex justify-center">
                <img
                  src="/robot.svg"
                  alt="Robot"
                  className="w-28 h-28"
                />
              </div>

              <h2 className="text-3xl font-bold text-center text-white mt-6">
                VS COMPUTER
              </h2>

              <p className="text-center text-gray-300 mt-3">
                Challenge Artificial Intelligence
              </p>

            </div>
          </Link>

          {/* Two Players */}
          <Link href="/twoplayer">
            <div className="w-80 rounded-3xl bg-white/10 backdrop-blur-md border border-cyan-500 p-8 hover:scale-105 hover:border-cyan-400 transition duration-300 cursor-pointer">

              <div className="flex justify-center">
                <img
                  src="/user.svg"
                  alt="Players"
                  className="w-32 h-28"
                />
              </div>

              <h2 className="text-3xl font-bold text-center text-white mt-6">
                TWO PLAYERS
              </h2>

              <p className="text-center text-gray-300 mt-3">
                Play with your Friend
              </p>

            </div>
          </Link>

        </div>

        {/* Bottom Card */}
        <div className="mt-12 bg-white/10 backdrop-blur-md border border-yellow-500 rounded-2xl px-8 py-5">

          <p className="text-yellow-300 text-lg font-semibold">
            🏆 First player to reach <span className="text-white">5</span> points wins!
          </p>

        </div>

      </div>
    </main>
  );
}