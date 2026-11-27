

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSavedProperties } from '../../context/SavedPropertiesContext'

const API_URL =
  'https://databasesample.com/mock/property-listings/listings?listing_status=active&_expand=property'

const propertyImages = [
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
]

function formatPrice(price) {
  if (price == null || price === '') return 'Price upon request'

  const convertedPrice = Number(price) * 60

  return `₱${convertedPrice.toLocaleString('en-PH')}`
}

function SavedPage() {
  const { savedProperties, toggleSaved } = useSavedProperties()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  // Display only saved listings
  const savedListings = properties.filter((listing) =>
    savedProperties.includes(String(listing.id))
  )

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <section className="mx-auto w-full max-w-[1600px] px-6 pb-24 pt-36 md:px-12 lg:px-16">

        {/* Page Heading */}
        <div className="mb-12">
          <span className="mb-4 block text-xs tracking-[0.3em] text-white/40">
            AUREL / YOUR COLLECTION
          </span>

          <h1 className="font-display text-4xl md:text-6xl">
            Saved Properties
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/50">
            A collection of properties you've chosen to keep close.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-24 text-center text-sm text-white/40">
            Loading saved properties...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="border border-red-500/20 py-12 text-center">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && savedListings.length === 0 && (
          <div className="border border-white/10 py-24 text-center">
            <h2 className="font-display text-3xl">
              No Saved Properties
            </h2>

            <p className="mt-3 text-sm text-white/40">
              Properties you save will appear here.
            </p>

            <Link
              to="/discover"
              className="mt-6 inline-block border border-white/30 px-6 py-3 text-xs tracking-wider transition hover:bg-white hover:text-black"
            >
              EXPLORE PROPERTIES
            </Link>
          </div>
        )}

        {/* Saved Property Grid */}
        {!loading && !error && savedListings.length > 0 && (
          <>
            <div className="mb-8">
              <p className="text-xs tracking-[0.15em] text-white/50">
                YOUR COLLECTION
              </p>

              <p className="mt-2 text-sm text-white/70">
                {savedListings.length} SAVED PROPERTIES
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">

              {savedListings.map((listing, index) => {
                const property = listing.property ?? {}
                const image = propertyImages[index % propertyImages.length]

                return (
                  <Link
                    key={listing.id}
                    to={`/properties/${listing.id}`}
                    state={{ listing }}
                    className="group"
                  >
                    {/* Property Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                      <img
                        src={image}
                        alt={property.address || 'Property architecture'}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      {/* Remove from Saved */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleSaved(String(listing.id))
                        }}
                        className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black text-xl transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white active:scale-95"
                        aria-label="Remove from saved properties"
                      >
                        ♥
                      </button>

                      <span className="absolute left-4 top-4 bg-black/70 px-3 py-2 text-[10px] tracking-wider text-white">
                        {listing.listing_status?.toUpperCase() || 'PROPERTY'}
                      </span>
                    </div>

                    {/* Property Information */}
                    <div className="mt-5">
                      <h2 className="font-display text-2xl transition group-hover:text-white/70">
                        {property.address || 'Property Address Unavailable'}
                      </h2>

                      <p className="mt-2 text-xs text-white/40">
                        {property.property_type || 'Residential Property'}
                      </p>

                      <p className="mt-4 text-lg font-medium">
                        {formatPrice(listing.current_price)}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-xs text-white/50">
                        <span>{property.bedrooms ?? '—'} Beds</span>
                        <span>{property.bathrooms ?? '—'} Baths</span>
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
          </>
        )}

      </section>
    </main>
  )
}

export default SavedPage
