"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [showdropDown, setShowdropDown] = useState(false);
  // if(session){
  //   return <>
  //   Signed in as {session.user.email}<br/>
  //   <button onClick={()=>signOut()}>Sign Out</button>
  //   </>
  // }
  return (
    <>
      <nav className="bg-gray-900 shadow-xl shadow-white text-white flex justify-between items-center px-4 md:h-16">
        <Link
          className="logo font-bold text-lg flex justify-center items-center"
          href={"/"}
        >
          <img className="invertImg" src="/tea.gif" width={44} alt="tea" />
          <span className="text-xl md:text-base my-3 md:my-0">
            Get Me a Chai!
          </span>
        </Link>
        {/* <ul className='flex justify-between items-center gap-5 '>
        <li>Home</li>
        <li>Contact Us</li>
        <li>About</li>
        <li>Read More</li>
      </ul> */}
        <div>
          {session && (
            <>
              <button
                onClick={() => setShowdropDown(!showdropDown)}
                onBlur={() => {
                  setTimeout(() => {
                    setShowdropDown(false);
                  }, 600);
                }}
                id="dropdownHoverButton"
                data-dropdown-toggle="dropdownHover"
                data-dropdown-trigger="hover"
                className=" inline-flex items-center justify-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                type="button"
              >
                WelCome {session.user.email[0]}
                <svg
                  className="w-4 h-4 ms-1.5 -me-0.5 mx-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 9-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              <div
                id="dropdownHover"
                className={`z-10 ${showdropDown ? " " : "hidden"} absolute bg-blue-900  rounded-base shadow-lg w-44`}
              >
                <ul
                  className="p-2 text-sm text-body font-medium"
                  aria-labelledby="dropdownHoverButton"
                >
                  <li>
                    <Link
                      href="#"
                      className="flex w-full p-2 break-all hover:bg-blue-700 hover:text-heading rounded"
                    >
                      {session.user.email}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/dashboard"}
                      className="inline-flex items-center w-full p-2 hover:bg-blue-700 hover:text-heading rounded"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${session.user.name}`}
                      className="inline-flex items-center w-full p-2 hover:bg-blue-700 hover:text-heading rounded"
                    >
                      Your Page
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        signOut();
                      }}
                      href="/login"
                      className="inline-flex items-center w-full p-2 hover:bg-blue-700 hover:text-heading rounded"
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}

          {!session && (
            <Link href={"/login"}>
              <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
