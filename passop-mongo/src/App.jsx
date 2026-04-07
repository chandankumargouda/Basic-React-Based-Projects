import Manager from './components/Manager'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

function App() {
 

  return (
    <>
    <div className='bg-emerald-100 min-h-screen w-full'>
     <Navbar/>
     <Manager/>
    <Footer/>
    </div>
    </>
  )
}

export default App
