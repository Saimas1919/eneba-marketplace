import { useState } from 'react'
import { ChevronUp, ChevronDown, Search } from 'lucide-react'

export interface FilterState {
  category: string[]
  platform: string[]
  region: string[]
  os: string[]
  genre: string[]
  minPrice: string
  maxPrice: string
  [key: string]: string | string[]; 
}

export interface FilterOption {
  label: string
  value: string
  count: number
}

export interface FilterData {
  categories: FilterOption[]
  platforms: FilterOption[]
  regions: FilterOption[]
  os: FilterOption[]
  genres: FilterOption[]
}

interface FilterSidebarProps {
  filters: FilterState
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>
  filterData: FilterData
  sortBy?: string
  setSortBy?: (val: string) => void
}

interface FilterGroupProps {
  title: string
  items: FilterOption[]
  selectedItems: string[]
  onToggle: (value: string) => void
  hasSearch?: boolean
  defaultOpen?: boolean
}

function FilterGroup({ title, items, selectedItems, onToggle, hasSearch, defaultOpen = true }: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const limit = 6
  const hasMoreItems = filteredItems.length > limit
  const activeCount = selectedItems.length

  return (
    <div className="border-b border-white/10 pb-2 mb-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 cursor-pointer hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-sm text-white">{title}</h3>
          {activeCount > 0 && (
            <span className="bg-[#FFCC00] text-[#1b0f36] text-[11px] font-extrabold w-5 h-5 flex items-center justify-center rounded-full">
              {activeCount}
            </span>
          )}
        </div>
        {isOpen ? <ChevronUp size={16} className="text-white/60" /> : <ChevronDown size={16} className="text-white/60" />}
      </button>

      <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="px-4 pb-4">
            
            {hasSearch && (
              <div className="relative mb-4">
                <input 
                  type="text" 
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#4618ac] border border-white/20 h-9 pl-3 pr-9 text-sm text-white outline-none focus:border-[#FFCC00] transition-colors"
                />
                <Search size={16} className="absolute right-3 top-2.5 text-white/60" />
              </div>
            )}

            <ul className="space-y-3 text-[13px]">
              {(isExpanded ? filteredItems : filteredItems.slice(0, limit)).map(item => (
                <li 
                  key={item.value} 
                  onClick={() => onToggle(item.value)} 
                  className="flex items-center justify-between group cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 border rounded-sm flex items-center justify-center shrink-0 transition-colors ${
                      selectedItems.includes(item.value) ? 'bg-[#FFCC00] border-[#FFCC00]' : 'border-white/40 group-hover:border-white'
                    }`}>
                      {selectedItems.includes(item.value) && (
                        <svg viewBox="0 0 14 14" className="w-3.5 h-3.5 text-black fill-current">
                          <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        </svg>
                      )}
                    </div>
                    
                    <span className="text-white font-bold group-hover:text-[#FFCC00] transition-colors leading-tight">
                      {item.label}
                    </span>
                  </div>
                  
                  <span className="text-white/40 text-[11px] font-medium shrink-0 ml-2">
                    {item.count}
                  </span>
                </li>
              ))}
            </ul>

            {hasMoreItems && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-[#FFCC00] text-[13px] font-bold mt-4 hover:underline flex items-center gap-1"
              >
                {isExpanded ? "Show less" : `Show ${filteredItems.length - limit} more`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FilterSidebar({ filters, setFilters, filterData, sortBy, setSortBy }: FilterSidebarProps) {
  const toggleFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[key] as string[]
      const updated = current.includes(value) 
        ? current.filter(item => item !== value)
        : [...current, value]
      return { ...prev, [key]: updated }
    })
  }

  return (
    <div className="bg-[#5825cc] lg:rounded-sm border-none lg:border lg:border-white/10 text-white flex flex-col mb-0 lg:mb-10 py-2 h-full">
      
      {/* SORT BY SECTION - Only visible on mobile inside the drawer */}
      {sortBy !== undefined && setSortBy && (
        <div className="lg:hidden border-b border-white/10 pb-4 mb-2">
          <div className="w-full flex justify-between items-center px-4 pt-2 pb-3">
            <h3 className="font-bold text-sm text-white">Sort by</h3>
          </div>
          <div className="px-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-[#4618ac] border border-white/20 h-10 px-3 text-sm text-white outline-none focus:border-[#FFCC00] transition-colors cursor-pointer appearance-none rounded-sm"
            >
              <option value="popular">Popularity: Most popular</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="title_asc">Name: A to Z</option>
            </select>
          </div>
        </div>
      )}

      <div className="border-b border-white/10 pb-2 mb-2">
        <div className="w-full flex justify-between items-center p-4">
          <h3 className="font-bold text-sm text-white">Price range (EUR)</h3>
          <ChevronUp size={16} className="text-white/60" />
        </div>
        <div className="px-4 pb-2 flex items-center gap-2">
          <input 
            type="number" 
            value={filters.minPrice}
            onChange={e => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
            className="w-full bg-[#4618ac] border border-white/20 h-9 px-2 text-sm text-white outline-none focus:border-[#FFCC00] transition-colors"
          />
          <span className="text-white/50 text-sm">-</span>
          <input 
            type="number" 
            value={filters.maxPrice}
            onChange={e => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
            className="w-full bg-[#4618ac] border border-white/20 h-9 px-2 text-sm text-white outline-none focus:border-[#FFCC00] transition-colors"
          />
        </div>
      </div>

      <FilterGroup 
        title="Type" 
        items={filterData.categories} 
        selectedItems={filters.category} 
        onToggle={v => toggleFilter('category', v)} 
        hasSearch={true}
      />
      
      <FilterGroup 
        title="Operating system" 
        items={filterData.os} 
        selectedItems={filters.os} 
        onToggle={v => toggleFilter('os', v)} 
        hasSearch={true}
      />
      
      <FilterGroup 
        title="Platforms" 
        items={filterData.platforms} 
        selectedItems={filters.platform} 
        onToggle={v => toggleFilter('platform', v)} 
        hasSearch={true}
      />
      
      <FilterGroup 
        title="Genres" 
        items={filterData.genres} 
        selectedItems={filters.genre} 
        onToggle={v => toggleFilter('genre', v)} 
        hasSearch={true}
      />
      
      <FilterGroup 
        title="Regions" 
        items={filterData.regions} 
        selectedItems={filters.region} 
        onToggle={v => toggleFilter('region', v)} 
        hasSearch={true}
      />

    </div>
  )
}