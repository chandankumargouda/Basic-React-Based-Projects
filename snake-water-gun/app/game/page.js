"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Game() {
  const choices = ["snake", "water", "gun"];

  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState(" ");
  const [playerName, setPlayerName] = useState("");

  const [playerScore, setPlayerScore] = useState(0);
  const [drawScore, setDrawScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [round, setRound] = useState(0);
  const [history, setHistory] = useState([]);
  const resetGame = () => {
    // Remove saved data
    localStorage.removeItem("history");

    // If you also want the player to enter the name again
    // localStorage.removeItem("playerName");

    // Reset React states
    setPlayerChoice("");
    setComputerChoice("");
    setResult("");

    setPlayerScore(0);
    setComputerScore(0);
    setDrawScore(0);

    setRound(0);
    setHistory([]);
  };
  {
    /*Random computer choice */
  }
  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };
  {
    /*Winner logic */
  }
  const findWinner = (player, computer) => {
    if (player === computer) {
      return "Draw";
    }

    if (
      (player === "snake" && computer === "water") ||
      (player === "water" && computer === "gun") ||
      (player === "gun" && computer === "snake")
    ) {
      return "Player";
    }

    return "Computer";
  };
  {
    /*User clicks a symbol */
  }
  const playGame = (playerMove) => {
    const computerMove = getComputerChoice();

    setPlayerChoice(playerMove);
    setComputerChoice(computerMove);

    const winner = findWinner(playerMove, computerMove);
    setHistory((prev) => [
      ...prev,
      {
        round: prev.length + 1,
        playerChoice: playerMove,
        computerChoice: computerMove,
        winner: winner,
      },
    ]);
    if (winner === "Player") {
      setPlayerScore((prev) => prev + 1);
      setResult("You Win!");
    } else if (winner === "Computer") {
      setComputerScore((prev) => prev + 1);
      setResult("Computer Wins!");
    } else {
      setDrawScore((prev) => prev + 1);

      setResult("Draw");
    }

    setRound((prev) => prev + 1);
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("history")) || [];
    const name = localStorage.getItem("playerName");
    if (name) {
      setPlayerName(name);
    }
    setHistory(data);
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
                <h2 className="text-white text-xl font-bold">{playerName}</h2>

                <p className="text-green-400 text-lg">Score : {playerScore}</p>
              </div>
            </div>

            {/* VS */}

            <div className="text-white text-5xl font-bold">VS</div>

            {/* Computer */}

            <div className="flex items-center gap-4">
              <div className="text-right">
                <h2 className="text-white text-xl font-bold">Computer</h2>

                <p className="text-cyan-400 text-lg">Score : {computerScore}</p>
              </div>

              <Image src="/robot.svg" width={70} height={70} alt="Robot" />
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
                    {playerScore}
                  </h1>
                  <p className="text-white">PLAYER</p>
                </div>

                <div className="text-white text-3xl font-bold">VS</div>

                <div className="text-center">
                  <h1 className="text-blue-400 text-6xl font-bold">
                    {computerScore}
                  </h1>
                  <p className="text-white">COMPUTER</p>
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
                      <th className="border p-2">Player</th>
                      <th className="border p-2">Computer</th>
                      <th className="border p-2">Winner</th>
                    </tr>
                  </thead>

                  <tbody>
                    {history.map((item) => (
                      <tr key={item.round}>
                        <td className="border p-2">{item.round}</td>
                        <td className="border p-2">{item.playerChoice}</td>
                        <td className="border p-2">{item.computerChoice}</td>
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
                    {playerScore > computerScore
                      ? "YOU WIN!"
                      : playerScore < computerScore
                        ? "COMPUTER WINS!"
                        : "IT'S A DRAW!"}
                  </h1>

                  <div className="mt-8 flex justify-center">
                    <Image
                      src={
                        playerScore > computerScore
                          ? "/user.svg"
                          : playerScore < computerScore
                            ? "/robot.svg"
                            : "/draw.svg"
                      }
                      width={170}
                      height={170}
                      alt="Winner"
                    />
                  </div>

                  <h2 className="text-3xl text-green-400 mt-5">
                    {playerScore === computerScore
                      ? "Nobody Wins"
                      : playerScore > computerScore
                        ? playerName
                        : "Computer"}
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
