
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const API_URL =
  'https://databasesample.com/mock/property-listings/listings?listing_status=active&_expand=property'

// Representative property photos.
// The API doesn't provide property image URLs, so these are manually assigned.
const propertyImages = [
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
]

function formatPrice(price) {
  if (price == null || price === '') return 'Price upon request'

  // Demo conversion factor, not a live exchange rate.
  const convertedPrice = Number(price) * 60

  return `₱${convertedPrice.toLocaleString('en-PH')}`
}

function DiscoverPage() {

    const [currentPage, setCurrentPage] = useState(1)

    const propertiesPerPage = 9
  // Original API data
  const [properties, setProperties] = useState([])

  // API states
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Filter states
  const [location, setLocation] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [bathrooms, setBathrooms] = useState('')
  const [minArea, setMinArea] = useState('')

  // Fetch property listings
  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Failed to fetch properties.')
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('Unexpected API response format.')
        }

        setProperties(data)
      } catch (err) {
        setError(err.message || 'Something went wrong.')
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [location, maxPrice, bedrooms, bathrooms, minArea])

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter((listing) => {
      const property = listing.property ?? {}

      const price = Number(listing.current_price)
      const propertyBedrooms = Number(property.bedrooms)
      const propertyBathrooms = Number(property.bathrooms)
      const propertyArea = Number(property.square_feet)

      // Location filter
      const matchesLocation =
        location.trim() === '' ||
        (property.address ?? '')
          .toLowerCase()
          .includes(location.trim().toLowerCase())

      // Maximum price filter
      const matchesPrice =
        maxPrice === '' ||
        (Number.isFinite(price) && price * 60 <= Number(maxPrice))

      // Minimum bedroom filter
      const matchesBedrooms =
        bedrooms === '' ||
        (Number.isFinite(propertyBedrooms) &&
          propertyBedrooms >= Number(bedrooms))

      // Minimum bathroom filter
      const matchesBathrooms =
        bathrooms === '' ||
        (Number.isFinite(propertyBathrooms) &&
          propertyBathrooms >= Number(bathrooms))

      // Minimum floor area filter
      const matchesArea =
        minArea === '' ||
        (Number.isFinite(propertyArea) &&
          propertyArea >= Number(minArea))

      return (
        matchesLocation &&
        matchesPrice &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesArea
      )
    })
    
  }, [properties, location, maxPrice, bedrooms, bathrooms, minArea])
  // Calculate pagination
    const totalPages = Math.ceil(
    filteredProperties.length / propertiesPerPage
    )

    const indexOfLastProperty = currentPage * propertiesPerPage

    const indexOfFirstProperty =
    indexOfLastProperty - propertiesPerPage

    const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
    )
  // Clear all filters
  function clearFilters() {
    setLocation('')
    setMaxPrice('')
    setBedrooms('')
    setBathrooms('')
    setMinArea('')
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">

      {/* Page Content */}
      <section className="mx-auto w-full max-w-[1600px] px-6 pb-24 pt-36 md:px-12 lg:px-16">

        {/* Page Heading */}
        <div className="mb-12">
          <span className="mb-4 block text-xs tracking-[0.3em] text-white/40">
            AUREL / PROPERTY COLLECTION
          </span>

          <h1 className="font-display text-4xl md:text-6xl">
            Discover Properties
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/50">
            Explore a curated collection of properties and discover
            a place that feels like yours.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 border-y border-white/10 py-6">

          {/* Location Search */}
          <div className="mb-5">
            <label
              htmlFor="location"
              className="mb-2 block text-[10px] tracking-[0.2em] text-white/40"
            >
              LOCATION OR ADDRESS
            </label>

            <input
              id="location"
              type="text"
              placeholder="Search by location or address..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-white/15 bg-transparent px-4 py-3 text-sm outline-none transition placeholder:text-white/25 focus:border-white/50"
            />
          </div>

          {/* Horizontal Filter Controls */}
          <div className="flex flex-wrap items-end gap-4">

            {/* Maximum Price */}
            <div className="min-w-[150px] flex-1">
              <label
                htmlFor="price"
                className="mb-2 block text-[10px] tracking-[0.2em] text-white/40"
              >
                MAXIMUM PRICE (PHP)
              </label>

              <input
                id="price"
                type="number"
                min="0"
                placeholder="Any price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full border border-white/15 bg-transparent px-4 py-3 text-sm outline-none transition placeholder:text-white/25 focus:border-white/50"
              />
            </div>

            {/* Bedrooms */}
            <div className="min-w-[130px] flex-1">
              <label
                htmlFor="bedrooms"
                className="mb-2 block text-[10px] tracking-[0.2em] text-white/40"
              >
                BEDROOMS
              </label>

              <select
                id="bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full border border-white/15 bg-[#080808] px-4 py-3 text-sm text-white outline-none focus:border-white/50 appearance-none"
              >
                <option value="">Any</option>
                <option value="1">1+ Bedrooms</option>
                <option value="2">2+ Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>

            </div>

            {/* Bathrooms */}
            <div className="min-w-[130px] flex-1">
              <label
                htmlFor="bathrooms"
                className="mb-2 block text-[10px] tracking-[0.2em] text-white/40"
              >
                BATHROOMS
              </label>

              <select
                id="bathrooms"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full border border-white/15 bg-[#080808] px-4 py-3 text-sm text-white outline-none focus:border-white/50 appearance-none"
              >
                <option value="">Any</option>
                <option value="1">1+ Bathrooms</option>
                <option value="2">2+ Bathrooms</option>
                <option value="3">3+ Bathrooms</option>
                <option value="4">4+ Bathrooms</option>
                <option value="5">5+ Bathrooms</option>
              </select>
            </div>

            {/* Minimum Area */}
            <div className="min-w-[150px] flex-1">
              <label
                htmlFor="area"
                className="mb-2 block text-[10px] tracking-[0.2em] text-white/40"
              >
                MINIMUM AREA (SQFT)
              </label>

              <input
                id="area"
                type="number"
                min="0"
                placeholder="Any size"
                value={minArea}
                onChange={(e) => setMinArea(e.target.value)}
                className="w-full border border-white/15 bg-transparent px-4 py-3 text-sm outline-none transition placeholder:text-white/25 focus:border-white/50"
              />
            </div>

            {/* Clear Filters */}
            <button
              type="button"
              onClick={clearFilters}
              className="border border-white/20 px-5 py-3 text-xs tracking-wider text-white/70 transition hover:border-white hover:text-white"
            >
              CLEAR FILTERS
            </button>

          </div>
        </div>

        {/* Property Results Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.15em] text-white/50">
              PROPERTY COLLECTION
            </p>

            <p className="mt-2 text-sm text-white/70">
              {loading
                ? 'Loading properties...'
                : `${filteredProperties.length} PROPERTIES FOUND`}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-24 text-center text-sm text-white/40">
            Loading properties...
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="border border-red-500/20 py-12 text-center">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProperties.length === 0 && (
          <div className="border border-white/10 py-24 text-center">
            <h2 className="font-display text-3xl">
              No Properties Found
            </h2>

            <p className="mt-3 text-sm text-white/40">
              Try adjusting your filters to find more properties.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 border border-white/30 px-6 py-3 text-xs tracking-wider transition hover:bg-white hover:text-black"
            >
              CLEAR FILTERS
            </button>
          </div>
        )}

        {/* Property Grid */}
        {!loading && !error && filteredProperties.length > 0 && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">

            {currentProperties.map((listing, index) => {
              const property = listing.property ?? {}

              const image =
                propertyImages[index % propertyImages.length]

              return (
                <Link
                    to={`/properties/${listing.id}`}
                    state={{ listing }}
                >

                  {/* Property Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                    <img
                      src={image}
                      alt={property.address || 'Property architecture'}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 bg-black/70 px-3 py-2 text-[10px] tracking-wider text-white">
                      {listing.listing_status?.toUpperCase() || 'PROPERTY'}
                    </span>
                  </div>

                  {/* Property Information */}
                  <div className="mt-5">

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-display text-2xl transition group-hover:text-white/70">
                          {property.address || 'Property Address Unavailable'}
                        </h2>

                        <p className="mt-2 text-xs text-white/40">
                          {property.property_type || 'Residential Property'}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-lg font-medium">
                      {formatPrice(listing.current_price)}
                    </p>

                    {/* Property Details */}
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-xs text-white/50">
                      <span>
                        {property.bedrooms ?? '—'} Beds
                      </span>

                      <span>
                        {property.bathrooms ?? '—'} Baths
                      </span>

                      <span>
                        {property.square_feet
                          ? `${Number(property.square_feet).toLocaleString()} sqft`
                          : '— sqft'}
                      </span>
                    </div>

                  </div>
                </Link>
              )
            })}

          </div>
          
        )}
        {/* Pagination */}
        {totalPages > 1 && (
        <div className="mt-16 flex items-center justify-center gap-6">

            {/* Previous */}
            <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="text-xs tracking-wider text-white/60 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
            >
            PREVIOUS
            </button>

            {/* Page Number */}
            <span className="text-sm text-white/70">
            {currentPage} / {totalPages}
            </span>

            {/* Next */}
            <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="text-xs tracking-wider text-white/60 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
            >
            NEXT
            </button>

        </div>
        )}
      </section>
    </main>
  )
}

export default DiscoverPage
