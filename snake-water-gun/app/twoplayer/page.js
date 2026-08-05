"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TwoPlayerPage() {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const router = useRouter();

  const handleStart = () => {
    if (!player1Name.trim()) {
      alert("Enter a valid name");
      return;
    }
    if (!player2Name.trim()) {
      alert("Enter a valid name");
      return;
    }

    // Save in localStorage
    localStorage.setItem("player1Name", player1Name);
    localStorage.setItem("player2Name", player2Name);

    router.push("/usergame");
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
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-3xl border border-cyan-500 p-8">
          <h1 className="text-4xl font-bold text-center text-white mb-8">
            TWO PLAYERS
          </h1>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Player 1 */}
            <div className="text-center">
              <Image
                src="/user.svg"
                width={100}
                height={100}
                alt="Player 1"
                className="mx-auto"
              />

              <h2 className="text-2xl text-white mt-4">Player 1</h2>

              <input
                type="text"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                placeholder="Enter name"
                className="w-full mt-4 p-4 rounded-xl bg-black/40 border border-gray-500 text-white outline-none"
              />
            </div>

            {/* Player 2 */}
            <div className="text-center">
              <Image
                src="/user.svg"
                width={100}
                height={100}
                alt="Player 2"
                className="mx-auto"
              />

              <h2 className="text-2xl text-white mt-4">Player 2</h2>

              <input
                type="text"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                placeholder="Enter name"
                className="w-full mt-4 p-4 rounded-xl bg-black/40 border border-gray-500 text-white outline-none"
              />
            </div>
          </div>

          <Link href="/usergame">
            <button
              onClick={handleStart}
              className="w-full mt-10 py-4 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-xl font-bold transition"
            >
              START GAME
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
