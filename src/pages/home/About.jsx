
import AboutBG from '../../assets/AboutBG.png'
import { Link } from 'react-router-dom'

function About(){
    
    
    
    
    
    return(
        <main className=" relative">
                  <img src={AboutBG} 
                    alt="" 
                    className="absolute inset-0 z-0 h-full w-full object-cover" 
                  />
                  <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                  <section className="relative flex w-full md:right-30  justify-end  items-center min-h-[60dvh]">
                    
                    <div className="flex flex-col md:gap-6 gap-8 z-10 text-white">
                      <span className="text-xs font-extralight opacity-85 font-body">THE AUREL PERSPECTIVE</span>
                      <span className="md:text-6xl text-4xl font-display">More Than Properties.<br/> A Lifestyle.</span>
                      <span className="md:text-sm text-xs opacity-85 font-body">
                            At AUREL, we believe in finding more than just a house— <br/>
                            but a place to belong. Our curated portfolio offers <br/>
                            exceptional properties in the Philippines’ most desirable locations.
                      </span>
                      <Link to="/about" className="md:text-sm text-xs opacity-85 font-body underline underline-offset-6 decoration-white/50">Learn More →</Link>
                    </div>
            
                  </section>
        
        </main>


    );
} export default About;