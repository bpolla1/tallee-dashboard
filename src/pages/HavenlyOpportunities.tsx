import { useState } from 'react'
import { Search, Sparkles, ChevronRight } from 'lucide-react'
import Header from '../components/Header'

interface Opportunity {
  id: string
  type: string
  title: string
  impactScore: number
  category: string
}

const opportunities: Opportunity[] = [
  { id: '1', type: 'Blog Post', title: 'Where Do Auburn Students Live Off Campus?', impactScore: 71, category: 'Location' },
  { id: '2', type: 'Blog Post', title: 'Which Off-Campus Apartment Is Walkable to Campus?', impactScore: 71, category: 'Walkability' },
  { id: '3', type: 'Blog Post', title: 'Best Luxury Apartments for Auburn Students?', impactScore: 71, category: 'Best Apartment' },
  { id: '4', type: 'Blog Post', title: "What's the Nicest Place to Live Near Auburn?", impactScore: 71, category: 'Best Apartment' },
  { id: '5', type: 'Blog Post', title: 'Pet-Friendly Student Housing in Auburn', impactScore: 71, category: 'Best Apartment' },
  { id: '6', type: 'Blog Post', title: 'Why Students Want Pools and Gyms in Auburn Apartments', impactScore: 71, category: 'Pool & Gym' },
  { id: '7', type: 'Blog Post', title: 'Why Students Want to Live Near Downtown Auburn', impactScore: 71, category: 'Location' },
  { id: '8', type: 'Blog Post', title: 'Best Affordable Off-Campus Apartments at Auburn', impactScore: 71, category: 'Affordability' },
]

const categories = ['All', 'Affordability', 'Walkability', 'Best Apartment', 'Best Deal', 'Pool & Gym', 'Location', 'Price', 'Deals']

function HavenlyOpportunities() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('Most Recent')
  const [showFilter, setShowFilter] = useState('All')

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesCategory = selectedCategory === 'All' || opp.category === selectedCategory
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const completedCount = 5
  const totalCount = 20
  const coveragePercent = 63

  return (
    <div className="min-h-screen bg-white">
      <Header account="havenly" />
      
      <div className="max-w-[1400px] mx-auto px-9 py-6">
        {/* Page Title */}
        <h1 
          className="text-black mb-6"
          style={{
            fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
            fontSize: '32px',
            fontWeight: '600',
            lineHeight: '32px',
            letterSpacing: '-0.64px',
          }}
        >
          Visibility Opportunities: Balcony
        </h1>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Total Opportunity Coverage */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#000',
                  }}
                >
                  Total Opportunity Coverage
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#000',
                  }}
                >
                  {coveragePercent}% ({completedCount}/{totalCount})
                </span>
              </div>
              <div className="h-[12px] w-full rounded-full bg-gray-200">
                <div 
                  className="h-full rounded-full"
                  style={{
                    width: `${coveragePercent}%`,
                    backgroundColor: '#0bc762',
                  }}
                />
              </div>
            </div>

            {/* Opportunities Section */}
            <h2
              className="text-black mb-4"
              style={{
                fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                fontSize: '24px',
                fontWeight: '600',
                letterSpacing: '-0.48px',
              }}
            >
              Opportunities
            </h2>

            {/* Category Filters */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`h-[32px] px-4 rounded-full flex-shrink-0 transition-colors ${
                    selectedCategory === category
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-black hover:bg-gray-300'
                  }`}
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '13px',
                    fontWeight: '500',
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search and Filters */}
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Footprint Expansion Opportunities"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-[40px] pl-10 pr-4 border border-gray-300 rounded-lg"
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '14px',
                  }}
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-[40px] px-4 border border-gray-300 rounded-lg"
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '14px',
                }}
              >
                <option>Sort by Most Recent</option>
                <option>Sort by Impact Score</option>
                <option>Sort by Title</option>
              </select>
              <select
                value={showFilter}
                onChange={(e) => setShowFilter(e.target.value)}
                className="h-[40px] px-4 border border-gray-300 rounded-lg"
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '14px',
                }}
              >
                <option>Show All</option>
                <option>Show Completed</option>
                <option>Show Pending</option>
              </select>
            </div>

            {/* Opportunity Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredOpportunities.map((opportunity) => (
                <div
                  key={opportunity.id}
                  className="rounded-[12px] p-6"
                  style={{
                    background: 'rgba(0, 0, 0, 0.02)',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                  }}
                >
                  {/* Type Badge */}
                  <div 
                    className="inline-flex items-center h-[24px] px-3 rounded-full mb-4"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                        fontSize: '11px',
                        fontWeight: '500',
                        color: '#000',
                      }}
                    >
                      {opportunity.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-5"
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '16px',
                      fontWeight: '500',
                      lineHeight: '1.4',
                      color: '#000',
                    }}
                  >
                    {opportunity.title}
                  </h3>

                  {/* Impact Score */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        style={{
                          fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                          fontSize: '12px',
                          fontWeight: '500',
                          color: 'rgba(0, 0, 0, 0.64)',
                        }}
                      >
                        Impact Score
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                          fontSize: '13px',
                          fontWeight: '600',
                          color: '#000',
                        }}
                      >
                        {opportunity.impactScore}%
                      </span>
                    </div>
                    <div className="h-[6px] rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(0, 0, 0, 0.08)' }}>
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          width: `${opportunity.impactScore}%`, 
                          backgroundColor: '#0bc762' 
                        }} 
                      />
                    </div>
                  </div>

                  {/* Write Article Button */}
                  <button
                    onClick={() => window.location.href = `/havenly/opportunities/${opportunity.id}/write`}
                    className="w-full flex items-center justify-between h-[36px] px-4 rounded-full transition-colors hover:bg-gray-800"
                    style={{
                      backgroundColor: '#000',
                      color: '#fff',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-[14px] h-[14px]" />
                      <span
                        style={{
                          fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                          fontSize: '13px',
                          fontWeight: '500',
                        }}
                      >
                        Write Article
                      </span>
                    </div>
                    <ChevronRight className="w-[14px] h-[14px]" strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-[320px] flex-shrink-0">
            <div
              className="rounded-[12px] p-6 mb-4"
              style={{
                background: 'rgba(0, 0, 0, 0.02)',
              }}
            >
              <h3
                className="mb-3"
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#000',
                }}
              >
                Strategy Overview
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '13px',
                  fontWeight: '400',
                  lineHeight: '1.6',
                  color: 'rgba(0, 0, 0, 0.72)',
                }}
              >
                Our strategy is to help Havenly stand out in apartment search by highlighting great apartments and clear communication.
              </p>
            </div>

            <div
              className="rounded-[12px] p-6"
              style={{
                background: 'rgba(0, 0, 0, 0.02)',
              }}
            >
              <h3
                className="mb-3"
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#000',
                }}
              >
                Key Actions
              </h3>
              <ul className="space-y-3">
                <li
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '13px',
                    fontWeight: '400',
                    lineHeight: '1.6',
                    color: 'rgba(0, 0, 0, 0.72)',
                    paddingLeft: '16px',
                    position: 'relative',
                  }}
                >
                  <span style={{ position: 'absolute', left: 0 }}>•</span>
                  Highlight best deals and top-reviewed apartments across all formats to quickly show value and build trust.
                </li>
                <li
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '13px',
                    fontWeight: '400',
                    lineHeight: '1.6',
                    color: 'rgba(0, 0, 0, 0.72)',
                    paddingLeft: '16px',
                    position: 'relative',
                  }}
                >
                  <span style={{ position: 'absolute', left: 0 }}>•</span>
                  Use clear, helpful content and videos that make comparing and choosing apartments feel easy.
                </li>
                <li
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '13px',
                    fontWeight: '400',
                    lineHeight: '1.6',
                    color: 'rgba(0, 0, 0, 0.72)',
                    paddingLeft: '16px',
                    position: 'relative',
                  }}
                >
                  <span style={{ position: 'absolute', left: 0 }}>•</span>
                  Keep messaging consistent around great prices, popular models, and strong customer satisfaction.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HavenlyOpportunities

