"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Game() {
 const [turn, setTurn] = useState(1);

const [player1Choice, setPlayer1Choice] = useState("");
const [player2Choice, setPlayer2Choice] = useState("");

const [player1Name, setPlayer1Name] = useState("");
const [player2Name, setPlayer2Name] = useState("");

const [player1Score, setPlayer1Score] = useState(0);
const [player2Score, setPlayer2Score] = useState(0);
const [drawScore, setDrawScore] = useState(0);

const [round, setRound] = useState(0);
const [result, setResult] = useState("");

const [history2, setHistory2] = useState([]);

const resetGame = () => {
  setPlayer1Choice("");
  setPlayer2Choice("");
  setResult("");

  setPlayer1Score(0);
  setPlayer2Score(0);
  setDrawScore(0);

  setRound(0);
  setTurn(1);

  setHistory2([]);
};

const findWinner = (player1, player2) => {
  if (player1 === player2) return "Draw";

  if (
    (player1 === "snake" && player2 === "water") ||
    (player1 === "water" && player2 === "gun") ||
    (player1 === "gun" && player2 === "snake")
  ) {
    return "Player1";
  }

  return "Player2";
};

const playGame = (move) => {

  // Stop after 5 rounds
  if (round >= 5) return;

  // -----------------------
  // Player 1 Turn
  // -----------------------
  if (turn === 1) {
    setPlayer1Choice(move);
    setTurn(2);
    return;
  }

  // -----------------------
  // Player 2 Turn
  // -----------------------
  setPlayer2Choice(move);

  const winner = findWinner(player1Choice, move);

  setHistory2((prev) => [
    ...prev,
    {
      round: prev.length + 1,
      player1Choice,
      player2Choice: move,
      winner,
    },
  ]);

  if (winner === "Player1") {
    setPlayer1Score((prev) => prev + 1);
    setResult(`${player1Name} Wins!`);
  }
  else if (winner === "Player2") {
    setPlayer2Score((prev) => prev + 1);
    setResult(`${player2Name} Wins!`);
  }
  else {
    setDrawScore((prev) => prev + 1);
    setResult("Draw");
  }

  setRound((prev) => prev + 1);

  // Prepare next round
  setPlayer1Choice("");
  setPlayer2Choice("");

  setTurn(1);
};

useEffect(() => {
  const name1 = localStorage.getItem("player1Name");
  const name2 = localStorage.getItem("player2Name");

  if (name1) setPlayer1Name(name1);
  if (name2) setPlayer2Name(name2);
}, []);
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
      <h2 className="text-3xl text-white font-bold">
  {turn === 1
    ? `${player1Name}'s Turn`
    : `${player2Name}'s Turn`}
</h2>
      <div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center py-8 px-5">
          {/* Top Score Board */}

          <div className="w-full max-w-6xl flex justify-between items-center bg-white/10 backdrop-blur-lg rounded-3xl p-5 border border-gray-500">
            {/* Player */}

            <div className="flex items-center gap-4">
              <Image src="/user.svg" width={70} height={70} alt="Player" />

              <div>
                <h2 className="text-white text-xl font-bold">{player1Name}</h2>

                <p className="text-green-400 text-lg">Score : {player1Score}</p>
              </div>
            </div>

            {/* VS */}

            <div className="text-white text-5xl font-bold">VS</div>

            {/* Computer */}

            <div className="flex items-center gap-4">
              <div className="text-right">
                <h2 className="text-white text-xl font-bold">{player2Name}</h2>

                <p className="text-cyan-400 text-lg">Score : {player2Score}</p>
              </div>

              <Image src="/user.svg" width={70} height={70} alt="Robot" />
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <h2 className="text-white text-xl font-bold">Draw</h2>

                <p className="text-cyan-400 text-lg">Score : {drawScore}</p>
              </div>
            </div>
          </div>

          {/* Round */}

          <div className="mt-6 px-8 py-2 rounded-full bg-yellow-500 text-black font-bold">
            {round} / 5
          </div>

          {/* Heading */}

          <h1 className="text-4xl text-white font-bold mt-10">
            Choose Your Move
          </h1>

          {/* Cards */}

          <div className="grid grid-cols-3 gap-10 mt-12">
            {/* Snake */}

            <button
              disabled={round >= 5}
              onClick={() => playGame("snake")}
              className={`
bg-white/10 backdrop-blur-lg rounded-3xl p-6 border
transition
${
  round >= 5
    ? "opacity-50 cursor-not-allowed"
    : "hover:scale-105 hover:border-green-400"
}
`}
            >
              <Image src="/snake.jpg" width={160} height={160} alt="Snake" />

              <h2 className="text-white text-3xl font-bold mt-5">Snake</h2>
            </button>

            {/* Water */}

            <button
              disabled={round >= 5}
              onClick={() => playGame("water")}
              className={`
bg-white/10 backdrop-blur-lg rounded-3xl p-6 border
transition
${
  round >= 5
    ? "opacity-50 cursor-not-allowed"
    : "hover:scale-105 hover:border-green-400"
}
`}
            >
              <Image src="/water.jpg" width={160} height={160} alt="Water" />

              <h2 className="text-white text-3xl font-bold mt-5">Water</h2>
            </button>

            {/* Gun */}

            <button
              disabled={round >= 5}
              onClick={() => playGame("gun")}
              className={`
bg-white/10 backdrop-blur-lg rounded-3xl p-6 border
transition
${
  round >= 5
    ? "opacity-50 cursor-not-allowed"
    : "hover:scale-105 hover:border-green-400"
}
`}
            >
              <Image src="/gun.jpg" width={160} height={160} alt="Gun" />

              <h2 className="text-white text-3xl font-bold mt-5">Gun</h2>
            </button>
          </div>

          {/* Bottom Score */}

          <div className="min-h-screen m-5 flex justify-center items-center">
            <div className="bg-black/70 rounded-3xl w-[100vw] p-8">
              <h1 className="text-center text-white text-4xl font-bold mb-8">
                SCORE BOARD
              </h1>

              <div className="flex justify-around items-center bg-zinc-900 rounded-xl p-6">
                <div className="text-center">
                  <h1 className="text-green-400 text-6xl font-bold">
                    {player1Score}
                  </h1>
                  <p className="text-white">PLAYER1</p>
                </div>

                <div className="text-white text-3xl font-bold">VS</div>

                <div className="text-center">
                  <h1 className="text-blue-400 text-6xl font-bold">
                    {player2Score}
                  </h1>
                  <p className="text-white">PLAYER2</p>
                </div>
                <div className="text-white text-3xl font-bold">VS</div>

                <div className="text-center">
                  <h1 className="text-blue-400 text-6xl font-bold">
                    {drawScore}
                  </h1>
                  <p className="text-white">Draw</p>
                </div>
              </div>

              <h2 className="text-center text-yellow-400 mt-5">
                ROUND {round} / 5
              </h2>

              <div className="mt-8">
                <h2 className="text-white text-2xl mb-4">ROUND HISTORY</h2>

                <table className="border border-collapse w-full text-center mt-6">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      <th className="border p-2">Round</th>
                      <th className="border p-2">Player1</th>
                      <th className="border p-2">Player2</th>
                      <th className="border p-2">Winner</th>
                    </tr>
                  </thead>

                  <tbody>
                    {history2.map((item) => (
                      <tr key={item.round}>
                        <td className="border p-2">{item.round}</td>
                        <td className="border p-2">{item.player1Choice}</td>
                        <td className="border p-2">{item.player2Choice}</td>
                        <td className="border p-2">{item.winner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Winner Section */}
              {round === 5 && (
                <div className="m-8 p-5 text-center border-t border-gray-500 mt-10">
                  <h2 className="text-white text-3xl font-bold">
                    CONGRATULATIONS
                  </h2>

                  <h1 className="text-yellow-400 text-6xl font-extrabold mt-3">
                    {player1Score > player2Score
                      ? `${player1Name} WINS!`
                      : player1Score < player2Score
                        ? `${player2Name} WINS!`
                        : "IT'S A DRAW!"}
                  </h1>

                  <div className="mt-8 flex justify-center">
                    <Image
                      src={
                        player1Score > player2Score
                          ? "/user.svg"
                          : player1Score < player2Score
                            ? "/robot.svg"
                            : "/draw.svg"
                      }
                      width={170}
                      height={170}
                      alt="Winner"
                    />
                  </div>

                  <h2 className="text-3xl text-green-400 mt-5">
                    {player1Score === player2Score
                      ? "Nobody Wins"
                      : player1Score > player2Score
                        ? player1Name
                        :player1Name }
                  </h2>
                </div>
              )}
              {round === 5 && (
                <div className="flex justify-center gap-6 mt-10">
                  <button
                    onClick={resetGame}
                    className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-xl text-xl font-bold"
                  >
                    🔄 PLAY AGAIN
                  </button>

                  <Link href="/">
                    <button className="bg-gray-700 hover:bg-gray-800 px-8 py-4 rounded-xl text-xl font-bold text-white">
                      🏠 HOME
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
