import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import FilterSidebar from "../components/store/FilterSidebar";
import ProductCard from "../components/ui/ProductCard";
import StoreSEO from "../components/store/StoreSEO";
import { api } from "../lib/api";
import type { ProductCardProps } from "../components/ui/ProductCard";
import type { FilterState, FilterData } from "../components/store/FilterSidebar";

export default function Store() {
  const [searchParams] = useSearchParams();
  
  // State
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Standard grid size (3 rows of 4)

  // Dynamic Filter Data
  const [filterData, setFilterData] = useState<FilterData>({
    categories: [], platforms: [], regions: [], os: [], genres: []
  });

  // Active Filters (Initialized from URL if coming from a breadcrumb)
  const [filters, setFilters] = useState<FilterState>({
    category: searchParams.getAll('category'),
    platform: searchParams.getAll('platform'),
    region: searchParams.getAll('region'),
    os: searchParams.getAll('os'),
    genre: searchParams.getAll('genre'),
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || ''
  });

  // Fetch available filter counts
  useEffect(() => {
    api.getFilters()
      .then(data => setFilterData(data))
      .catch(err => console.error("Failed to load filters", err));
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    setLoading(true);
    setCurrentPage(1); // Reset to page 1 on new filter
    api.getProducts(filters)
      .then(data => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setProducts([]);
        setLoading(false);
      });
  }, [filters]);

  // Pagination Logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-[#4618ac] py-12 px-6">
      <div className="max-w-[1300px] mx-auto">
        
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-8">
          Games, Gift Cards, Top-Ups & More | Best Deals
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          
          {/* LEFT SIDEBAR */}
          <div className="w-full lg:w-[280px] shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} filterData={filterData} />
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex-1">
            
            {/* TOP BAR */}
            <div className="flex justify-between items-center mb-6 text-white">
              <span className="text-sm">Results found: <strong>{loading ? '...' : products.length}</strong></span>
              <button className="flex items-center gap-2 text-sm font-semibold hover:text-[#FFCC00] transition-colors">
                <SlidersHorizontal size={16} />
                Popularity: Most popular
                <ChevronDown size={16} />
              </button>
            </div>

            {/* PRODUCT GRID / LOADING / EMPTY STATE */}
            {loading ? (
              <div className="text-white py-20 text-center text-lg animate-pulse">
                Loading products...
              </div>
            ) : products.length === 0 ? (
              <div className="bg-[#5825cc] border border-white/10 rounded-sm p-12 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                <p className="text-white/60 mb-6">Try adjusting your filters or price range to find what you're looking for.</p>
                <button 
                  onClick={() => setFilters({ category: [], platform: [], region: [], os: [], genre: [], minPrice: '', maxPrice: '' })}
                  className="bg-[#FFCC00] hover:bg-[#ffdc4d] text-black font-bold text-sm px-6 py-2 transition-colors rounded-sm"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
                {paginatedProducts.map((product, index) => (
                  <ProductCard key={index} {...product} showAddToCart={true} showViewOffers={true} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div>
          {/* DYNAMIC PAGINATION - Only shows if there is more than 1 page */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mb-16">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 flex items-center justify-center font-bold text-lg transition-colors ${
                    currentPage === i + 1 ? 'text-[#FFCC00]' : 'text-white hover:text-[#FFCC00]'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          <StoreSEO />
        </div>

      </div>
    </div>
  );
}