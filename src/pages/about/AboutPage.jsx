import { Link } from 'react-router-dom'


const heroImage =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c";

const interiorImage =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0";

const architectureImage =
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d";

import Hero from './Hero'
import Philosophy from './Philosophy';

function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#0a0a0a] text-white">
      <Hero />



      {/* PHILOSOPHY */}
        <Philosophy />


      
      {/* EDITORIAL IMAGE */}
      <section className="relative flex h-[420px] md:h-[450px] justify-center items-center">
        <span className="text-8xl absolute font-display z-10">
            AUREL
        </span>
        <img
          src={interiorImage}
          alt="Refined contemporary residential interior"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />

      </section>


      {/* BRAND PRINCIPLES */}
      <section className="mx-auto max-w-[1600px] px-8 py-24 md:px-16 md:pb-36">

        <div className=" mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div className="">
            <span className="font-body text-xs tracking-[0.25em] text-white/50">
              WHAT DEFINES US
            </span>

            <h2 className="  mt-5 font-display text-4xl md:text-6xl">

                The AUREL Standard.


            </h2>
            
          </div>

          <p className="max-w-sm font-body text-sm leading-7 text-white/60">
            Three principles guide how we present and
            curate the world of exceptional properties.
          </p>

        </div>


        <div className="grid grid-cols-1 border-t border-white/20 md:grid-cols-3">

          {/* PRINCIPLE 1 */}
          <div className="border-b border-white/20 py-10 md:border-b-0 md:border-r md:pr-10">

            <svg
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="mb-8 h-10 w-10 text-white/80"
            >
              <path d="M24 4L29 17L44 18L33 28L36 43L24 35L12 43L15 28L4 18L19 17L24 4Z" />
            </svg>

            <h3 className="font-display text-3xl">
              Thoughtful Selection
            </h3>

            <p className="mt-4 max-w-xs font-body text-sm leading-7 text-white/50">
              A considered collection of properties
              chosen with attention to quality,
              architecture, and character.
            </p>

          </div>


          {/* PRINCIPLE 2 */}
          <div className="border-b border-white/20 py-10 md:border-b-0 md:border-r md:px-10">

            <svg
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="mb-8 h-10 w-10 text-white/80"
            >
              <path d="M5 40V19L24 5L43 19V40H5Z" />
              <path d="M18 40V27H30V40" />
            </svg>

            <h3 className="font-display text-3xl">
              Distinctive Living
            </h3>

            <p className="mt-4 max-w-xs font-body text-sm leading-7 text-white/50">
              Spaces that go beyond appearance
              and offer something meaningful
              to everyday life.
            </p>

          </div>


          {/* PRINCIPLE 3 */}
          <div className="py-10 md:pl-10">

            <svg
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="mb-8 h-10 w-10 text-white/80"
            >
              <circle cx="24" cy="24" r="18" />
              <path d="M24 6V42M6 24H42M11 11L37 37M37 11L11 37" />
            </svg>

            <h3 className="font-display text-3xl">
              Curated Discovery
            </h3>

            <p className="mt-4 max-w-xs font-body text-sm leading-7 text-white/50">
              A more intentional way to explore
              properties and discover places
              worth calling home.
            </p>

          </div>

        </div>
      </section>


      {/* PHILIPPINE PERSPECTIVE */}
      <section className="grid grid-cols-1 bg-[#111] md:grid-cols-2">

        <div className="flex flex-col justify-center px-8 py-20 md:px-16 lg:px-24">

          <span className="font-body text-xs tracking-[0.25em] text-white/50">
            OUR PERSPECTIVE
          </span>

          <h2 className="mt-6 font-display text-4xl leading-tight md:text-6xl">
            Inspired by
            <br />
            Where We Live.
          </h2>

          <p className="mt-8 max-w-lg font-body text-sm leading-8 text-white/60">
            From the dynamic city life of Makati and
            Bonifacio Global City to the quieter
            residential communities of Alabang, the
            Philippines offers an extraordinary range
            of places and lifestyles.
          </p>

          <p className="mt-5 max-w-lg font-body text-sm leading-8 text-white/60">
            AUREL celebrates this diversity through
            a curated perspective on exceptional
            residential spaces.
          </p>

        </div>

        <div className="min-h-[350px] md:min-h-[600px]">

          <img
            src={architectureImage}
            alt="Contemporary architectural residence"
            className="h-full w-full object-cover"
          />

        </div>

      </section>


      {/* CLOSING CTA */}
      <section className="relative flex min-h-[550px] items-center justify-center overflow-hidden text-center">

        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-3xl px-8 py-24">

          <span className="font-body text-xs tracking-[0.3em] text-white/60">
            DISCOVER AUREL
          </span>

          <h2 className="mt-7 font-display text-5xl leading-tight md:text-7xl">
            Find a Place
            <br />
            That Feels Like Yours.
          </h2>

          <p className="mx-auto mt-7 max-w-md font-body text-sm leading-7 text-white/60">
            Explore distinctive properties and discover
            a different perspective on living.
          </p>

          <Link
            to="/discover"
            className="mt-10 inline-block border border-white/50 px-8 py-4 font-body text-xs tracking-wider transition-all duration-300 hover:bg-white hover:text-black"
          >
            EXPLORE PROPERTIES →
          </Link>

        </div>

      </section>

    </main>
  );
}

export default AboutPage;
