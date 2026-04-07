import React from 'react'

const Navbar = () => {
  return (
   
        <nav className='nav w-full  h-[10vh] bg-cyan-950 p-5 flex text-1xl justify-between text-amber-50'>
            <div>
                <span className='text-emerald-700 font-bold text-2xl' >&lt; </span><span className='text-2xl'> Pass</span><span className='text-emerald-700 font-bold text-2xl' >Op/&gt;</span>
            </div>
            <ul >
                <li className='nav flex gap-4 '>
                    <a className='hover:font-bold' href="#">Home</a>
                    <a className='hover:font-bold' href="#">About</a>
                    <a className='hover:font-bold' href=""><img src="git.svg" alt="" /></a>
                </li>
                
            </ul>
        </nav>
  )
}

export default Navbar
