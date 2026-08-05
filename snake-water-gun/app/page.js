import Link from "next/link";

export default function Home() {
  return (
    <main
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/jungle.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-5"
      
      >

        {/* Game Title */}
        <h1 className="text-6xl md:text-8xl font-extrabold text-center leading-tight rounded-full  bg-cover bg-center bg-no-repeat"
        style={{
        backgroundImage: "url('/MainLogo.png')",
      }}
        >
          <span className="text-green-400 drop-shadow-lg ">SNAKE</span>
          <br />
          <span className="text-cyan-400 drop-shadow-lg">WATER</span>
          <br />
          <span className="text-yellow-400 drop-shadow-lg">& GUN</span>
        </h1>

        {/* Subtitle */}
        <p className="text-white text-lg mt-4 tracking-wider">
          Classic Indian Hand Game
        </p>

        {/* Start Button */}
        <Link href="/mode">
          <button className="cursor-pointer mt-10 px-10 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 text-white font-bold text-xl shadow-lg hover:scale-105">
            START GAME
          </button>
        </Link>

        {/* Bottom Cards */}
        
      <div className="last flex m-3 p-2 gap-6">
       <Link href="/rules">
        <div className="w-36 h-30  rounded-2xl flex flex-col justify-around items-center border border-green-500  backdrop-blur-md ">
           <h2 className="text-3xl">⚡</h2>
          <div className="text-white font-bold ">Simple Rules</div>
        </div>
       </Link>
        <div className="w-36 h-30  rounded-2xl flex flex-col justify-around items-center border border-green-500  backdrop-blur-md ">
          <h2 className="text-3xl">🎮</h2>
          <div className="text-white font-bold ">Fun Gameplay</div>
        </div>
        <div className="w-36 h-30  rounded-2xl flex flex-col justify-around items-center border border-green-500  backdrop-blur-md ">
           <h2 className="text-3xl">👥</h2>
          <div className="text-white font-bold ">Challenge Friends</div>
        </div>
      </div>
      </div>
    </main>
  );
}