import Link from "next/link";

export default function Rules() {
  return (
    <main className="min-h-screen bg-gradient-to-br bg-cover  from-slate-900 via-black to-slate-800 text-white flex justify-center items-center px-6"
    style={{
        backgroundImage: "url('/jungle.png')",
      }}
    >

      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl">

        <h1 className="text-5xl font-bold text-center text-emerald-400 mb-8">
          📖 Game Rules
        </h1>

        <div className="space-y-6 text-xl">

          <div className="flex justify-between bg-slate-800 rounded-xl p-4">
            <span>🐍 Snake drinks Water</span>
            <span className="text-green-400 font-semibold">
              Snake Wins
            </span>
          </div>

          <div className="flex justify-between bg-slate-800 rounded-xl p-4">
            <span>💧 Water damages Gun</span>
            <span className="text-cyan-400 font-semibold">
              Water Wins
            </span>
          </div>

          <div className="flex justify-between bg-slate-800 rounded-xl p-4">
            <span>🔫 Gun kills Snake</span>
            <span className="text-yellow-400 font-semibold">
              Gun Wins
            </span>
          </div>

          <div className="flex justify-between bg-slate-800 rounded-xl p-4">
            <span>🤝 Same Choice</span>
            <span className="text-gray-300 font-semibold">
              Draw
            </span>
          </div>

        </div>

        <div className="mt-10 border-t border-gray-600 pt-6">

          <h2 className="text-3xl font-bold text-center mb-4">
            Winning Order
          </h2>

          <div className="flex flex-col items-center gap-3 text-lg">

            <div className="bg-green-700 px-6 py-2 rounded-lg">
              🐍 Snake &gt; 💧 Water
            </div>

            <div className="bg-cyan-700 px-6 py-2 rounded-lg">
              💧 Water &gt; 🔫 Gun
            </div>

            <div className="bg-yellow-700 px-6 py-2 rounded-lg">
              🔫 Gun &gt; 🐍 Snake
            </div>

          </div>

        </div>

        <div className="text-center mt-10">
          <Link href="/">
            <button className="bg-emerald-500 hover:bg-emerald-600 px-10 py-3 rounded-full text-xl font-bold transition">
              Start Playing
            </button>
          </Link>
        </div>

      </div>

    </main>
  );
}