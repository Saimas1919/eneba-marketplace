import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import FilterSidebar from "../components/store/FilterSidebar";
import ProductCard from "../components/ui/ProductCard";
import StoreSEO from "../components/store/StoreSEO";
import { api } from "../lib/api";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import type { ProductCardProps } from "../components/ui/ProductCard";
import type { FilterState, FilterData } from "../components/store/FilterSidebar";

const getDynamicTitle = (filters: FilterState) => {
  if (filters.category.length === 1) {
    const cat = filters.category[0];
    if (cat === 'eGift Cards') return 'Buy eGift cards at the best price! | Prepaid gift cards';
    if (cat === 'Games') return 'Buy Games at the best price! | Instant Delivery';
    return `Buy ${cat} at the best price!`;
  }
  if (filters.platform.length === 1) return `Buy ${filters.platform[0]} Keys at the best price!`;
  if (filters.genre.length === 1) return `Buy ${filters.genre[0]} Games at the best price!`;
  return 'Games, Gift Cards, Top-Ups & More | Best Deals';
};

export default function Store() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const hideFilters = searchParams.get('hideFilters') === 'true';
  const section = searchParams.get('section') || '';
  
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = hideFilters ? 25 : 20;

  const [filterData, setFilterData] = useState<FilterData>({
    categories: [], platforms: [], regions: [], os: [], genres: []
  });

  const filters: FilterState = {
    category: searchParams.getAll('category'),
    platform: searchParams.getAll('platform'),
    region: searchParams.getAll('region'),
    os: searchParams.getAll('os'),
    genre: searchParams.getAll('genre'),
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || ''
  };

  const sortBy = searchParams.get('sort') || 'popular';

  const getPageTitle = () => {
    if (section === 'recommended') return 'All Recommended Products';
    if (section === 'topgames') return 'All Top Games';
    if (section === 'egifts') return 'All Best Selling eGift Cards';
    if (section === 'gifts') return 'All Best Selling Gift Cards';
    if (section === 'upcoming') return 'All Upcoming Games';
    
    if (hideFilters) return 'Explore All Products | Best Deals';
    return getDynamicTitle(filters);
  };

  useDocumentTitle(`${getPageTitle()} | Eneba`);

  const setFilters = (updater: any) => {
    const currentFilters = { ...filters };
    const nextFilters = typeof updater === 'function' ? updater(currentFilters) : updater;
    
    const params = new URLSearchParams();
    nextFilters.category.forEach((c: string) => params.append('category', c));
    nextFilters.platform.forEach((p: string) => params.append('platform', p));
    nextFilters.region.forEach((r: string) => params.append('region', r));
    nextFilters.os.forEach((o: string) => params.append('os', o));
    nextFilters.genre.forEach((g: string) => params.append('genre', g));
    if (nextFilters.minPrice) params.set('minPrice', nextFilters.minPrice);
    if (nextFilters.maxPrice) params.set('maxPrice', nextFilters.maxPrice);
    if (sortBy !== 'popular') params.set('sort', sortBy);
    
    setSearchParams(params);
    setCurrentPage(1); 
  };

  const setSortBy = (newSort: string) => {
    const params = new URLSearchParams(searchParams);
    if (newSort !== 'popular') {
      params.set('sort', newSort);
    } else {
      params.delete('sort');
    }
    setSearchParams(params);
    setCurrentPage(1);
  };

  useEffect(() => {
    api.getFilters().then(setFilterData).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    
    const apiFilters = {
      section: section,
      category: filters.category,
      platform: filters.platform,
      region: filters.region,
      os: filters.os,
      genre: filters.genre,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      sort: sortBy
    };

    api.getProducts(apiFilters)
      .then(data => { setProducts(data || []); setLoading(false); })
      .catch(err => { console.error(err); setProducts([]); setLoading(false); });
  }, [searchParams]); 

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const hasActiveFilters = 
    filters.category.length > 0 || filters.platform.length > 0 || 
    filters.region.length > 0 || filters.os.length > 0 || 
    filters.genre.length > 0 || filters.minPrice !== '' || filters.maxPrice !== '';

  const clearAllFilters = () => {
    setSearchParams({});
    setCurrentPage(1);
  };

  const clearFilterGroup = (key: keyof FilterState) => {
    const nextFilters = { ...filters, [key]: [] };
    setFilters(nextFilters);
  };

  return (
    <div className="min-h-screen bg-[#4618ac] py-8 px-6">
      <div className="max-w-[1300px] mx-auto">
        
        <div className="flex items-center gap-2 text-[13px] text-white/60 mb-6 font-medium overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} className="shrink-0" />
          <Link to="/store" className="hover:text-white transition-colors">Store</Link>
          {section && (
            <>
              <ChevronRight size={14} className="shrink-0" />
              <span className="text-white capitalize">{section}</span>
            </>
          )}
          {filters.category.length > 0 && !hideFilters && (
            <>
              <ChevronRight size={14} className="shrink-0" />
              <span className="text-white/60">Categories</span>
              <ChevronRight size={14} className="shrink-0" />
              <span className="text-white">{filters.category[0]}</span>
            </>
          )}
        </div>

        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-8">
          {getPageTitle()}
        </h1>

        <div className="flex flex-col lg:flex-row gap-4 mb-12 justify-center">
          
          {!hideFilters && (
            <div className="w-full lg:w-[280px] shrink-0">
              <FilterSidebar filters={filters} setFilters={setFilters} filterData={filterData} />
            </div>
          )}

          <div className={`${hideFilters ? 'w-full' : 'flex-1'}`}>
            
            {!hideFilters && hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {filters.category.length > 0 && (
                  <button onClick={() => clearFilterGroup('category')} className="bg-[#311178] border border-white/20 rounded-full px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-[#4e1a9e] transition-colors group">
                    <span className="text-white">Type ({filters.category.length})</span>
                    <X size={12} className="text-white/60 group-hover:text-white" />
                  </button>
                )}
                {filters.platform.length > 0 && (
                  <button onClick={() => clearFilterGroup('platform')} className="bg-[#311178] border border-white/20 rounded-full px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-[#4e1a9e] transition-colors group">
                    <span className="text-white">Platforms ({filters.platform.length})</span>
                    <X size={12} className="text-white/60 group-hover:text-white" />
                  </button>
                )}
                {filters.region.length > 0 && (
                  <button onClick={() => clearFilterGroup('region')} className="bg-[#311178] border border-white/20 rounded-full px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-[#4e1a9e] transition-colors group">
                    <span className="text-white">Regions ({filters.region.length})</span>
                    <X size={12} className="text-white/60 group-hover:text-white" />
                  </button>
                )}
                {filters.genre.length > 0 && (
                  <button onClick={() => clearFilterGroup('genre')} className="bg-[#311178] border border-white/20 rounded-full px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-[#4e1a9e] transition-colors group">
                    <span className="text-white">Genres ({filters.genre.length})</span>
                    <X size={12} className="text-white/60 group-hover:text-white" />
                  </button>
                )}
                <button onClick={clearAllFilters} className="text-[#FFCC00] text-xs hover:underline font-bold ml-2">
                  Clear all
                </button>
              </div>
            )}

            <div className="flex justify-between items-center mb-6 text-white border-b border-white/10 pb-4">
              <span className="text-sm">Results found: <strong>{loading ? '...' : products.length}</strong></span>
              
              <div className="relative flex items-center gap-2 text-sm font-semibold">
                <SlidersHorizontal size={16} />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-white outline-none cursor-pointer appearance-none pr-6"
                >
                  <option value="popular" className="bg-[#4618ac]">Popularity: Most popular</option>
                  <option value="price_asc" className="bg-[#4618ac]">Price: Low to High</option>
                  <option value="price_desc" className="bg-[#4618ac]">Price: High to Low</option>
                  <option value="title_asc" className="bg-[#4618ac]">Name: A to Z</option>
                </select>
                <ChevronDown size={16} className="absolute right-0 pointer-events-none" />
              </div>
            </div>

            {loading ? (
              <div className="text-white py-20 text-center text-lg animate-pulse">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="bg-[#5825cc] border border-white/10 rounded-sm p-12 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                <p className="text-white/60 mb-6">Try adjusting your filters or price range.</p>
                <button onClick={clearAllFilters} className="bg-[#FFCC00] hover:bg-[#ffdc4d] text-black font-bold text-sm px-6 py-2 transition-colors rounded-sm">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-x-4 gap-y-6 justify-items-center mx-auto ${hideFilters ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-[1200px]' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 max-w-[960px]'}`}>
                {paginatedProducts.map((product, index) => (
                  <ProductCard key={index} {...product} showAddToCart={true} showViewOffers={true} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mb-16">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="w-10 h-10 border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"><ChevronLeft size={20} /></button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-10 h-10 flex items-center justify-center font-bold text-lg transition-colors ${currentPage === i + 1 ? 'text-[#FFCC00]' : 'text-white hover:text-[#FFCC00]'}`}>{i + 1}</button>
              ))}
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="w-10 h-10 border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"><ChevronRight size={20} /></button>
            </div>
          )}

          {!hideFilters && <StoreSEO />}
        </div>

      </div>
    </div>
  );
}