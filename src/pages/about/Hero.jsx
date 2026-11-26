

const heroImage =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c";

function Hero(){




    return(


       
        <section className="relative flex min-h-[85dvh] items-center overflow-hidden">
            
            <img
            src={heroImage}
            alt="Contemporary luxury architecture"
            className="absolute inset-0 h-full w-full object-cover opacity-50"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

            <div className="relative z-10 mx-auto w-full max-w-[1600px] px-8 py-32 md:px-16">

            <span className="mb-8 block font-body text-xs tracking-[0.3em] text-white/70">
                ABOUT AUREL
            </span>

            <h1 className="max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl lg:text-8xl">
                A Different
                <br />
                Perspective
                <br />
                on Living.
            </h1>

            <p className="mt-8 max-w-md font-body text-sm leading-7 text-white/70 md:text-base">
                We believe that finding a property is more than
                finding an address. It is about discovering a
                space that reflects the way you want to live.
            </p>

            </div>
        </section>
    );

} export default Hero;