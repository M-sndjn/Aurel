
import { useEffect, useState, } from "react";
import { Link } from 'react-router-dom'

import HeroBG from "../../assets/HeroBG.png";
import Area from "../../assets/AreaWhite.png";
import Bathtub from "../../assets/BathtubWhite.png";
import Bed from "../../assets/BedWhite.png";

const API_URL =
  "https://databasesample.com/mock/property-listings/listings?_limit=10&listing_status=active&_expand=property";

function Featured() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Unable to fetch properties.");
        }

        const data = await response.json();

        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  // Format price
  function formatPrice(price) {
    if (price == null) return "Price upon request";

    return `PHP ${(Number(price)*60).toLocaleString("en-US")}`;
  }

  return (
    <main>
      <section className="bg-black py-10 text-white">

        {/* Section Heading */}
        <div className="mb-6 flex flex-col pl-10 gap-2">
          <span className="font-body text-xs sm:text-sm opacity-75">
            FEATURED PROPERTIES 
          </span>

          <h2 className="font-display text-4xl sm:text-6xl">
            Exceptional Properties
          </h2>

          <p className="font-body text-xs sm:text-sm opacity-75">
            A curated collection of places worth discovering
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <p className="px-10 py-10 font-body text-sm text-white/60">
            Loading featured properties...
          </p>
        )}

        {/* Error State */}
        {error && (
          <p className="px-10 py-10 font-body text-sm text-red-400">
            {error}
          </p>
        )}

        {/* Property Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-8 px-10 md:grid-cols-2 lg:grid-cols-3">

            {properties.slice(0,3).map((listing) => {
              const property = listing.property ?? {};

              return (
                <Link
                  key={listing.id}
                  to={`/properties/${listing.id}`}
                  state={{ listing }}
                  className="group flex flex-col overflow-hidden"
                >

                  {/* Property Image */}
                  <div className="relative h-56 overflow-hidden">

                    <img
                      src={HeroBG}
                      alt={property.address || "Featured property"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Listing Status */}
                    <div className="absolute inset-x-0 top-0 flex justify-between p-4">

                      <span className="rounded-full bg-black/50 px-3 py-1 font-body text-xs backdrop-blur-sm">
                        For Sale
                      </span>

                      {/* Favorite Button */}
                      <button
                        type="button"
                        aria-label="Save property"
                        className="transition-transform duration-300 hover:scale-110"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                        </svg>
                      </button>

                    </div>
                  </div>

                  {/* Property Information */}
                  <div className="flex flex-1 flex-col justify-between gap-4 py-4">

                    <div className="flex flex-col gap-1">

                      <h3 className="font-body text-sm">
                        {property.address || "Property address unavailable"}
                      </h3>

                      <p className="font-body text-xs text-white/50 capitalize">
                        {property.property_type || "Property"}
                      </p>

                      <p className="font-body text-base">
                        {formatPrice(listing.current_price)}
                      </p>

                    </div>

                    {/* Property Specifications */}
                    <div className="flex flex-wrap items-center gap-5 border-t border-white/25 pt-3">

                      {/* Bedrooms */}
                      <div className="flex items-center gap-2">
                        <img
                          src={Bed}
                          alt=""
                          className="h-5 w-5 object-contain"
                        />
                        <span className="font-body text-xs">
                          {property.bedrooms ?? "—"}
                        </span>
                      </div>

                      {/* Bathrooms */}
                      <div className="flex items-center gap-2">
                        <img
                          src={Bathtub}
                          alt=""
                          className="h-5 w-5 object-contain"
                        />
                        <span className="font-body text-xs">
                          {property.bathrooms ?? "—"}
                        </span>
                      </div>

                      {/* Floor Area */}
                      <div className="flex items-center gap-2">
                        <img
                          src={Area}
                          alt=""
                          className="h-5 w-5 object-contain"
                        />
                        <span className="font-body text-xs">
                          {property.square_feet != null
                            ? `${property.square_feet.toLocaleString()} ft²`
                            : "—"}
                        </span>
                      </div>

                    </div>
                  </div>

                </Link>
              );
            })}

          </div>
        )}

      </section>
    </main>
  );
}

export default Featured;
