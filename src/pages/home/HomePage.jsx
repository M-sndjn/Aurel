import HeroBG from '../../assets/HeroBG.png'
import Featured from './Featured'
import About from './About'
import NavBar from '../../components/Navbar'
import { Link } from 'react-router-dom'



function HomePage() {
  return (
    <main>
      <NavBar />
      <img src={HeroBG} 
        alt="" 
        className="absolute inset-0 z-0 h-full w-full object-cover" 
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
      <section className="relative flex w-full p-10 items-center min-h-[100dvh]">
        
        <div className="flex flex-col md:gap-6 gap-8 z-10 text-white">
          <span className="text-xs font-extralight opacity-85 font-body">EXCEPTIONAL PROPERTIES</span>
          <span className="md:text-6xl text-4xl font-display">A Higher <br/> Standard of<br/> Living.</span>
          <span className="md:text-sm text-xs opacity-85 font-body">Discover extraordinary properties across the Philippines.</span>
          <Link to="/discover" className="md:text-sm text-xs opacity-85 font-body underline underline-offset-6 decoration-white/50 hover:scale-105 transition-transform duration-300">Explore Properties →</Link>
        </div>

      </section>
      <section>
        <Featured />
      </section>
      <section>
        <About />
      </section>
      
    </main> 
  )
}

export default HomePage