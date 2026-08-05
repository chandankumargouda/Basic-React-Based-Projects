"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ComputerPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleStart = () => {
    if (!name.trim()) {
      alert("Enter your name");
      return;
    }

    // Save in localStorage
    localStorage.setItem("playerName", name);

    router.push("/game");
  };
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl border border-green-500 p-8">
          <div className="flex justify-center">
            <Image src="/robot.svg" width={120} height={120} alt="Robot" />
          </div>

          <h1 className="text-4xl font-bold text-center text-white mt-6">
            VS COMPUTER
          </h1>

          <p className="text-center text-gray-300 mt-2">
            Enter your name to start.
          </p>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full mt-8 p-4 rounded-xl bg-black/40 border border-gray-500 text-white outline-none focus:border-green-400"
          />

          <Link href="/game">
            <button
              onClick={handleStart}
              className="w-full mt-8 py-4 bg-green-500 hover:bg-green-600 rounded-xl text-xl font-bold transition"
            >
              START BATTLE
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
