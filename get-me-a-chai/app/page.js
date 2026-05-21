"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Home() {
  const images1 = [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=8",
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=500&q=8",
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&q=8",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&q=8",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=8",
  ];
  const images2 = [
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80", // chai
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80", // cafe
    "https://images.unsplash.com/photo-1521305916504-4a1121188589?w=600&q=80", // creator
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=600&q=80", // laptop work
  ];

  const [index, setIndex] = useState(0);

  // Auto change every 3 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images2.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className=" text-white flex flex-col justify-center items-center h-[44vh] gap-3">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5 text-3xl sm:text-5xl font-bold text-center">

  <span>Buy Me a Chai</span>

  <img
    src="/tea.gif"
    alt="Tea"
    className="w-16 sm:w-20 md:w-24"
  />

</div>
        <p>
          A crowdfunding platform for creators. Get funded by your fans and
          followers. start now!
        </p>
        <div className=" flex gap-4">
          <Link href={"/login"}>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-3xl"
          >
            Start Now
          </button>
          </Link>
           <Link href={"/about"}>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-3xl"
          >
            Read More
          </button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="flex justify-center items-end gap-6 mt-10 overflow-hidden ">
        {/* Left tilted */}
        <img
          src={images1[0]}
          className="w-40 h-40 object-cover rounded-2xl rotate-[-20deg] translate-y-10"
          alt=""
        />

        <img
          src={images1[1]}
          className="w-44 h-44 object-cover rounded-2xl rotate-[-10deg] translate-y-5"
          alt=""
        />

        {/* Center image */}
        <img
          src={images1[2]}
          className="w-52 h-52 object-cover rounded-2xl shadow-xl z-10"
          alt=""
        />

        <img
          src={images1[3]}
          className="w-44 h-44 object-cover rounded-2xl rotate-[10deg] translate-y-5"
          alt=""
        />

        {/* Right tilted */}
        <img
          src={images1[4]}
          className="w-40 h-40 object-cover rounded-2xl rotate-[20deg] translate-y-10"
          alt=""
        />
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white container mx-auto pb-32 pt-14 px-10">
        <h2 className="text-3xl font-bold text-center mb-14">
          Your Fans can buy you a Chai
        </h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              className="bg-slate-400 rounded-full p-2 text-black"
              width={88}
              src="/man.gif"
              alt=""
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">
              Your fans are available to support you
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              className="bg-slate-400 rounded-full p-2 text-black"
              width={88}
              src="/coin.gif"
              alt=""
            />
            <p className="font-bold text-center">Fans want to contribute</p>
            <p className="text-center">
              Your fans are willing to contribute financially
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              className="bg-slate-400 rounded-full p-2 text-black"
              width={88}
              src="/group.gif"
              alt=""
            />
            <p className="font-bold text-center">Fans want to collaborate</p>
            <p className="text-center">
              Your fans are ready to collaborate with you
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 py-12">
        {/* LEFT SIDE - Image Slider */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-[320px] h-[320px] overflow-hidden rounded-2xl shadow-xl">
            {images2.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="chai"
                className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Overlay text */}
            <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg text-sm">
              Support with a cup of chai ☕
            </div>
          </div>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">
            Support creators with chai ☕
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="text-orange-400 font-bold text-xl">1</div>
              <div>
                <h3 className="font-semibold text-neutral-400 ">
                  Create your page
                </h3>
                <p className="text-gray-400 text-sm">
                  Set up your profile and tell people what you create.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="text-orange-400 font-bold text-xl">2</div>
              <div>
                <h3 className="font-semibold text-neutral-400">
                  Share with your audience
                </h3>
                <p className="text-gray-400 text-sm">
                  Share your page link with your fans and supporters.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="text-orange-400 font-bold text-xl">3</div>
              <div>
                <h3 className="font-semibold text-neutral-400">
                  Receive chai support
                </h3>
                <p className="text-gray-400 text-sm">
                  Get donations and grow your creative journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-14">
          Learn more about us
        </h2>
        {/* Responsive youtube embed  */}
        <div className="w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/ojuUnfqnUI0?si=wMUv4DG3ia6Wt4zn"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}
