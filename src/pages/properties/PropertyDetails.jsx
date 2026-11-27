import { useEffect, useState, useRef } from 'react'
import { useLocation, useParams, Link } from 'react-router-dom'
import SampleImg from '../../assets/HeroBG.png'
import Bathtub from '../../assets/BathtubWhite.png'
import Bedroom from '../../assets/BedWhite.png'
import Area from '../../assets/AreaWhite.png'

const API_URL =
  'https://databasesample.com/mock/property-listings/listings?listing_status=active&_expand=property'

const propertyImages = [
  SampleImg,
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498f',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
]


function PropertyDetails() {
const [activeImage, setActiveImage] = useState(0)


  const { id } = useParams()
  const location = useLocation()

    // Reference to the thumbnail scrolling container
  const thumbnailRef = useRef(null)

  // Scroll thumbnails left or right
  function scrollThumbnails(direction) {
    thumbnailRef.current?.scrollBy({
      left: direction * 300,
      behavior: 'smooth'
    })
  }


  const [listing, setListing] = useState(
    location.state?.listing ?? null
  )
  const [loading, setLoading] = useState(!location.state?.listing)
  const [error, setError] = useState('')

  useEffect(() => {
    // We already received the object from DiscoverPage.
    if (location.state?.listing) {
      setListing(location.state.listing)
      setLoading(false)
      return
    }

    // Otherwise, retrieve it using the ID in the URL.
    async function fetchProperty() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Failed to fetch property.')
        }

        const data = await response.json()

        const selectedListing = data.find(
          (item) => String(item.id) === id
        )

        if (!selectedListing) {
          throw new Error('Property not found.')
        }

        setListing(selectedListing)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [id, location.state])

  if (loading) {
    return <main className="min-h-screen bg-[#080808] text-white pt-32 px-10">Loading property...</main>
  }

  if (error) {
    return <main className="min-h-screen bg-[#080808] text-white pt-32 px-10">{error}</main>
  }

  const property = listing.property ?? {}

  function formatPrice(price) {
  if (price == null || price === '') return 'Price upon request'

  const convertedPrice = Number(price) * 60

  return `₱${convertedPrice.toLocaleString('en-PH', {
    maximumFractionDigits: 0
  })}`
}

  return (
    <main className="min-h-screen bg-[#080808] text-white pt-32 px-10">
      {/*      
      <h1 className="text-4xl font-display">
        {property.address} 
      </h1>

      <p>Property ID: {id}</p>
      <p>Price: {listing.current_price}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      <p>Area: {property.square_feet} sq ft</p>
      <p>Type: {property.property_type}</p>
      */}

      <div className="relative flex justify-end h-96 w-full overflow-hidden font-display">
        <img src={propertyImages[activeImage]} alt="" className="absolute object-cover object-center inset-0 h-full w-full" />
        <div className="px-6 relative flex flex-col  z-10 h-full md:w-[30%] w-[40%] md:bg-black/95 bg-black/50 shadow-2xl shadow-black ">
            
            <div className="flex flex-col h-[40%] gap-10 ">
                <span className="md:text-3xl text-xl ">
                    {property.address}
                </span>
                <span className="md:text-xl text-sm font-body ">
                    {formatPrice(listing.current_price)}
                </span>
            </div>

            <div className="flex md:flex-row flex-col h-[30%] md:gap-5 gap-1 font-body justify-around md:items-center items-start text-xl border-t border-white/50 p-2">
                <span className="md:text-xl text-xs flex gap-2">
                    <img src={Bedroom} alt="" className="md:h-6 md:w-6 h-3 w-3" />:{property.bedrooms ?? "—"}
                </span>
                <span className="md:text-xl text-xs flex gap-2">
                    <img src={Bathtub} alt="" className="md:h-6 md:w-6 h-3 w-3" />: {property.bathrooms ?? "—"}
                </span>
                <span className="md:text-xl text-xs flex gap-2">
                    <img src={Area} alt="" className="md:h-6 md:w-6 h-3 w-3" />: {property.square_feet}
                </span>
            </div>
            <div className="flex h-[30%] gap-5 items-center  text-xl border-t border-white/50 p-2">
                <span className="md:text-xl text-xs">
                    Property Type: {property.property_type}
                </span>
            </div>


        </div>
      </div> 
    <div className="relative mt-4 ">

        {/* Left Arrow */}
        <button
            onClick={() => scrollThumbnails(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10
            bg-black/60 hover:bg-black text-white
            w-10 h-10 flex items-center justify-center
            rounded-full transition"
        >
            &#8592;
        </button>
        

        {/* Thumbnail Container */}
        <div
            ref={thumbnailRef}
            className="flex gap-3 overflow-x-hidden overflow-y-hidden pb-2 scroll-smooth"
        >
            {propertyImages.map((image, index) => (
            <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`shrink-0 w-40 h-24 overflow-hidden border-2 transition-all duration-300 ${
                activeImage === index
                    ? 'border-white opacity-100'
                    : 'border-transparent opacity-50 hover:opacity-100'
                }`}
            >
                <img
                src={image}
                alt={`Property view ${index + 1}`}
                className="w-full h-full object-cover"
                />
            </button>
            ))}
        </div>

        {/* Right Arrow */}
        <button
            onClick={() => scrollThumbnails(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10
            bg-black/60 hover:bg-black text-white
            w-10 h-10 flex items-center justify-center
            rounded-full transition"
        >
            &#8594;
        </button>

    </div>


    <div className="px-10 mt-10">  
        <span className="font-body text-xs text-white/50">
            PROPERTY RECORD
        </span>
        <h2 className="font-display text-4xl border-b  border-white/50 py-2 w-[75%]">
            Listing Information
        </h2>
    </div>


    <section className="bg-black pl-10 py-8 text-white flex justify-between">

        <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-3  w-[50%]">
            
            <div>
            <p className="text-xs text-white/50">Listing ID</p>
            <p>{listing.id ?? "—"}</p>
            </div>

            <div>
            <p className="text-xs text-white/50">Date Listed</p>
            <p>
                {listing.listing_date
                ? new Date(listing.listing_date).toLocaleDateString("en-PH")
                : "—"}
            </p>
            </div>

            <div>
            <p className="text-xs text-white/50">Listing Status</p>
            <p className="capitalize">
                {listing.listing_status ?? "—"}
            </p>
            </div>

            <div>
            <p className="text-xs text-white/50">Property Type</p>
            <p>{property.property_type ?? "—"}</p>
            </div>

            <div>
            <p className="text-xs text-white/50">Property ID</p>
            <p>{listing.property_id ?? "—"}</p>
            </div>

        </div>
        <div className=" w-[25%] p-5 flex flex-col gap-1">
            <span className="text-4xl text-white/75 font-display">Interested?</span>
            <span className="text-md text-white/90 font-body">Make this property yours</span>
            <span className="text-xs  text-white/75 font-body">Have questions about this property?<br/>Send and inquiry to get started</span>
            <div className="flex justify-center mt-10 mb-2">
                <Link
                to="/"
                className="border w-[50%] h-9 rounded-md text-center leading-8 ">
                    Inquiry
                </Link>
            </div>

        
        </div>
        
    </section>

    
    </main>
  )
}

export default PropertyDetails