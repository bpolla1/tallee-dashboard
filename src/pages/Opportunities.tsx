import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Search, ChevronDown, CheckCircle2, Circle, X } from 'lucide-react'
import Header from '../components/Header'

// Hardcoded opportunity data with new structure
const opportunitiesData = [
  {
    id: '1',
    type: 'Website Content',
    status: 'Backlog',
    description: 'Create a blog article that talks about the top energy-saving features of x product. Include yearly savings, environmental benefits.',
    date: 'Mar 5 2026',
    impactScore: 9,
    category: 'Refrigerator'
  },
  {
    id: '2',
    type: 'Whitepaper',
    status: 'Complete',
    description: 'Create a blog article that talks about the top energy-saving features of x product. Include yearly savings, environmental benefits.',
    date: 'Mar 5 2026',
    impactScore: 9,
    category: 'Refrigerator'
  },
  {
    id: '3',
    type: 'How-to Guide',
    status: 'In Progress',
    description: 'Create a blog article that talks about the top energy-saving features of x product. Include yearly savings, environmental benefits.',
    date: 'Mar 5 2026',
    impactScore: 9,
    category: 'Refrigerator'
  },
  {
    id: '4',
    type: 'Case Study',
    status: 'Backlog',
    description: 'Create a blog article that talks about the top energy-saving features of x product. Include yearly savings, environmental benefits.',
    date: 'Mar 5 2026',
    impactScore: 9,
    category: 'Refrigerator'
  },
  {
    id: '5',
    type: 'Interview',
    status: 'Backlog',
    description: 'Create a blog article that talks about the top energy-saving features of x product. Include yearly savings, environmental benefits.',
    date: 'Mar 5 2026',
    impactScore: 9,
    category: 'Refrigerator'
  },
  {
    id: '6',
    type: 'FAQs',
    status: 'Complete',
    description: 'Create a blog article that talks about the top energy-saving features of x product. Include yearly savings, environmental benefits.',
    date: 'Mar 5 2026',
    impactScore: 9,
    category: 'Refrigerator'
  },
  {
    id: '7',
    type: 'Product Description',
    status: 'Backlog',
    description: 'Create a blog article that talks about the top energy-saving features of x product. Include yearly savings, environmental benefits.',
    date: 'Mar 5 2026',
    impactScore: 9,
    category: 'Refrigerator'
  },
  {
    id: '8',
    type: 'Blog Articles',
    status: 'Complete',
    description: 'Create a blog article that talks about the top energy-saving features of x product. Include yearly savings, environmental benefits.',
    date: 'Mar 5 2026',
    impactScore: 9,
    category: 'Refrigerator'
  },
  {
    id: '9',
    type: 'Social Media Content',
    status: 'In Progress',
    description: 'Create a blog article that talks about the top energy-saving features of x product. Include yearly savings, environmental benefits.',
    date: 'Mar 5 2026',
    impactScore: 9,
    category: 'Refrigerator'
  }
]

const contentTypes = [
  { name: 'All', count: 0 },
  { name: 'Website Content', count: 2 },
  { name: 'Email Marketing', count: 1 },
  { name: 'Blog Articles', count: 4 },
  { name: 'Social Media Content', count: 2 },
  { name: 'Owned Content', count: 1 },
  { name: 'PR Content', count: 4 }
]

const statuses = [
  { name: 'All', icon: null },
  { name: 'Complete', icon: 'check' },
  { name: 'In Progress', icon: 'dot' },
  { name: 'Backlog', icon: 'circle' }
]

function Opportunities() {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedContentType, setSelectedContentType] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('Most Recent')
  const [showFilter, setShowFilter] = useState('All')

  // Determine account from current path
  const account = location.pathname.startsWith('/havenly') ? 'havenly' : 'lowes'

  // Filter opportunities
  const filteredOpportunities = opportunitiesData.filter(opp => {
    const matchesType = selectedContentType === 'All' || opp.type === selectedContentType
    const matchesStatus = selectedStatus === 'All' || opp.status === selectedStatus
    return matchesType && matchesStatus
  })

  const handleWriteArticle = (opportunityId: string) => {
    navigate(`/${account}/opportunities/${opportunityId}/write`)
  }

  const handleViewEditArticle = (opportunityId: string) => {
    navigate(`/${account}/opportunities/${opportunityId}/view`)
  }

  const getStatusIcon = (statusName: string) => {
    const status = statuses.find(s => s.name === statusName)
    if (!status || !status.icon) return null
    
    if (status.icon === 'check') {
      return <CheckCircle2 className="w-[14px] h-[14px] text-black" fill="currentColor" />
    } else if (status.icon === 'dot') {
      return <Circle className="w-[14px] h-[14px] text-black" fill="currentColor" />
    } else if (status.icon === 'circle') {
      return <Circle className="w-[14px] h-[14px] text-black" strokeWidth={2} />
    }
    return null
  }

  const getStatusColor = (status: string) => {
    if (status === 'Complete') return { bg: '#A8FBCE', text: '#000' }
    if (status === 'In Progress') return { bg: '#FFFCAD', text: '#000' }
    if (status === 'Backlog') return { bg: '#AFF8F3', text: '#000' }
    return { bg: 'rgba(0, 0, 0, 0.08)', text: '#000' }
  }

  const getCardBackgroundColor = (status: string) => {
    if (status === 'Complete') return '#ECFEF4'
    if (status === 'In Progress') return '#FFFEEB'
    return 'rgba(0, 0, 0, 0.02)' // Default light grey for Backlog and other statuses
  }

  const getTypeColor = (type: string) => {
    // Different colors for different types
    const colors: { [key: string]: { bg: string; text: string } } = {
      'Website Content': { bg: 'rgba(0, 0, 0, 0.08)', text: '#000' },
      'Whitepaper': { bg: '#A8FBCE', text: '#000' },
      'How-to Guide': { bg: '#FFFCAD', text: '#000' },
      'Case Study': { bg: 'rgba(0, 0, 0, 0.08)', text: '#000' },
      'Interview': { bg: 'rgba(0, 0, 0, 0.08)', text: '#000' },
      'FAQs': { bg: 'rgba(0, 0, 0, 0.08)', text: '#000' },
      'Product Description': { bg: 'rgba(0, 0, 0, 0.08)', text: '#000' },
      'Blog Articles': { bg: 'rgba(0, 0, 0, 0.08)', text: '#000' },
      'Social Media Content': { bg: 'rgba(0, 0, 0, 0.08)', text: '#000' }
    }
    return colors[type] || { bg: 'rgba(0, 0, 0, 0.08)', text: '#000' }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[1400px] mx-auto px-[30px] py-[40px]">
        {/* Page Title */}
        <h1 
          className="mb-[30px]"
          style={{
            fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
            fontSize: '32px',
            fontWeight: '600',
            lineHeight: '1.2',
            color: '#000',
            letterSpacing: '-0.32px',
          }}
        >
          Visibility Opportunities: Refrigerators
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-[40px]">
          {/* Main Content */}
          <div>
            {/* Content Type Filters */}
            <div className="flex items-center gap-[6px] mb-[20px] flex-wrap">
              {contentTypes.map((contentType) => (
                <button
                  key={contentType.name}
                  onClick={() => setSelectedContentType(contentType.name)}
                  className="h-[34px] px-[18px] rounded-full transition-colors whitespace-nowrap"
                  style={{
                    backgroundColor: selectedContentType === contentType.name ? '#000' : 'rgba(0, 0, 0, 0.04)',
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '13px',
                    fontWeight: '365',
                    lineHeight: '1.2',
                    color: selectedContentType === contentType.name ? '#fff' : '#000',
                    letterSpacing: '-0.13px',
                  }}
                >
                  {contentType.name} ({contentType.count})
                </button>
              ))}
            </div>

            {/* Search and Filters */}
            <div className="mb-[20px] space-y-[16px]">
              {/* Search Bar */}
              <div 
                className="flex items-center h-[46px] px-[18px] rounded-[9px]"
                style={{
                  background: 'rgba(0, 0, 0, 0.04)',
                }}
              >
                <Search className="w-[18px] h-[18px] text-black mr-[9px] flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search Opportunities"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-0 outline-0"
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '13.5px',
                    fontWeight: '90',
                    lineHeight: '1.6',
                    color: 'rgba(0, 0, 0, 0.4)',
                    letterSpacing: '-0.27px',
                  }}
                />
              </div>

              {/* Sort and Show Filters */}
              <div className="flex items-center gap-[16px]">
                <div className="flex items-center gap-[8px]">
                  <span 
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '13.5px',
                      fontWeight: '365',
                      lineHeight: '1.2',
                      color: 'rgba(0, 0, 0, 0.64)',
                      letterSpacing: '-0.135px',
                    }}
                  >
                    Sort by
                  </span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-transparent border-0 outline-0 pr-[20px] cursor-pointer"
                      style={{
                        fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                        fontSize: '13.5px',
                        fontWeight: '365',
                        lineHeight: '1.2',
                        color: '#000',
                        letterSpacing: '-0.135px',
                      }}
                    >
                      <option>Most Recent</option>
                      <option>Impact Score</option>
                      <option>Type</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-[14px] h-[14px] pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center gap-[8px]">
                  <span 
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '13.5px',
                      fontWeight: '365',
                      lineHeight: '1.2',
                      color: 'rgba(0, 0, 0, 0.64)',
                      letterSpacing: '-0.135px',
                    }}
                  >
                    Show
                  </span>
                  <div className="relative">
                    <select
                      value={showFilter}
                      onChange={(e) => setShowFilter(e.target.value)}
                      className="appearance-none bg-transparent border-0 outline-0 pr-[20px] cursor-pointer"
                      style={{
                        fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                        fontSize: '13.5px',
                        fontWeight: '365',
                        lineHeight: '1.2',
                        color: '#000',
                        letterSpacing: '-0.135px',
                      }}
                    >
                      <option>All</option>
                      <option>High Impact</option>
                      <option>Medium Impact</option>
                      <option>Low Impact</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-[14px] h-[14px] pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Status Filters */}
            <div className="flex items-center gap-[6px] mb-[24px] flex-wrap">
              {statuses.map((status) => {
                const statusColor = getStatusColor(status.name)
                const isSelected = selectedStatus === status.name
                return (
                  <button
                    key={status.name}
                    onClick={() => setSelectedStatus(status.name)}
                    className="h-[34px] px-[18px] rounded-full transition-colors whitespace-nowrap flex items-center gap-[6px]"
                    style={{
                      backgroundColor: isSelected ? '#000' : statusColor.bg,
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '13px',
                      fontWeight: '365',
                      lineHeight: '1.2',
                      color: isSelected ? '#fff' : statusColor.text,
                      letterSpacing: '-0.13px',
                    }}
                  >
                    {status.icon && getStatusIcon(status.name)}
                    {status.name}
                  </button>
                )
              })}
            </div>

            {/* Opportunity Cards List */}
            <div className="space-y-[24px]">
              {filteredOpportunities.map((opportunity) => {
                const statusColor = getStatusColor(opportunity.status)
                const typeColor = getTypeColor(opportunity.type)
                const cardBackgroundColor = getCardBackgroundColor(opportunity.status)
                
                return (
                  <div 
                    key={opportunity.id}
                    className="p-[36px] rounded-[18px]"
                    style={{
                      background: cardBackgroundColor,
                      border: '1px solid rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    {/* Type and Status Pills with Date */}
                    <div className="flex items-center justify-between mb-[16px] flex-wrap gap-[8px]">
                      <div className="flex items-center gap-[8px] flex-wrap">
                        <div
                          className="inline-flex items-center h-[28px] px-[14px]"
                          style={{
                            backgroundColor: typeColor.bg,
                            borderRadius: '9px',
                            fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                            fontSize: '12.5px',
                            fontWeight: '365',
                            lineHeight: '1.2',
                            color: typeColor.text,
                            letterSpacing: '-0.125px',
                          }}
                        >
                          {opportunity.type}
                        </div>
                        <div
                          className="inline-flex items-center h-[28px] px-[14px] gap-[6px]"
                          style={{
                            backgroundColor: statusColor.bg,
                            borderRadius: '9px',
                            fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                            fontSize: '12.5px',
                            fontWeight: '365',
                            lineHeight: '1.2',
                            color: statusColor.text,
                            letterSpacing: '-0.125px',
                          }}
                        >
                          {getStatusIcon(opportunity.status)}
                          {opportunity.status}
                        </div>
                      </div>
                      <span 
                        style={{
                          fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                          fontSize: '12.5px',
                          fontWeight: '365',
                          lineHeight: '1.2',
                          color: 'rgba(0, 0, 0, 0.64)',
                          letterSpacing: '-0.125px',
                        }}
                      >
                        {opportunity.date}
                      </span>
                    </div>

                    {/* Description */}
                    <p 
                      className="mb-[20px]"
                      style={{
                        fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                        fontSize: '15px',
                        fontWeight: '400',
                        lineHeight: '1.4',
                        color: '#000',
                        letterSpacing: '-0.15px',
                      }}
                    >
                      {opportunity.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-[8px] flex-wrap">
                      {opportunity.status === 'Backlog' && (
                        <button
                          onClick={() => handleViewEditArticle(opportunity.id)}
                          className="h-[32px] px-[16px] rounded-full transition-colors flex items-center gap-[6px]"
                          style={{
                            backgroundColor: '#000',
                            fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                            fontSize: '12.5px',
                            fontWeight: '365',
                            lineHeight: '1.2',
                            color: '#fff',
                            letterSpacing: '-0.125px',
                          }}
                        >
                          <span>◆</span>
                          View Content
                        </button>
                      )}
                      {opportunity.status === 'Complete' && (
                        <>
                          <button
                            onClick={() => handleViewEditArticle(opportunity.id)}
                            className="h-[32px] px-[16px] rounded-full transition-colors flex items-center gap-[6px]"
                            style={{
                              backgroundColor: '#000',
                              fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                              fontSize: '12.5px',
                              fontWeight: '365',
                              lineHeight: '1.2',
                              color: '#fff',
                              letterSpacing: '-0.125px',
                            }}
                          >
                            <span>◆</span>
                            View Content
                          </button>
                          <button
                            className="h-[32px] px-[16px] rounded-full transition-colors flex items-center gap-[6px]"
                            style={{
                              backgroundColor: 'rgba(0, 0, 0, 0.04)',
                              fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                              fontSize: '12.5px',
                              fontWeight: '365',
                              lineHeight: '1.2',
                              color: '#000',
                              letterSpacing: '-0.125px',
                            }}
                          >
                            <X className="w-[12px] h-[12px]" />
                            Delete Article
                          </button>
                        </>
                      )}
                      {opportunity.status === 'In Progress' && (
                        <button
                          onClick={() => handleViewEditArticle(opportunity.id)}
                          className="h-[32px] px-[16px] rounded-full transition-colors flex items-center gap-[6px]"
                          style={{
                            backgroundColor: '#000',
                            fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                            fontSize: '12.5px',
                            fontWeight: '365',
                            lineHeight: '1.2',
                            color: '#fff',
                            letterSpacing: '-0.125px',
                          }}
                        >
                          <span>◆</span>
                          View Content
                        </button>
                      )}
                      <button
                        className="h-[32px] px-[16px] rounded-full transition-colors flex items-center gap-[6px]"
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                          fontSize: '12.5px',
                          fontWeight: '365',
                          lineHeight: '1.2',
                          color: '#000',
                          letterSpacing: '-0.125px',
                        }}
                      >
                        <X className="w-[12px] h-[12px]" />
                        Delete Opportunity
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Sidebar */}
          <div 
            style={{
              display: 'flex',
              minWidth: '300px',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '36px',
              alignSelf: 'stretch',
            }}
          >
            {/* Opportunity Score */}
            <div className="flex flex-col items-center">
              {/* Circular Progress with Conic Gradient Design */}
              <div 
                className="relative mb-[24px] flex items-center justify-center"
                style={{
                  width: '286.13px',
                  height: '286.13px',
                  flexShrink: 0,
                }}
              >
                {/* Ring with conic gradient using CSS mask */}
                <div
                  style={{
                    position: 'absolute',
                    width: '286.13px',
                    height: '286.13px',
                    borderRadius: '50%',
                    background: 'conic-gradient(from 90deg, rgba(18, 242, 123, 1) 0deg, rgba(18, 242, 123, 1) 225deg, rgba(0, 0, 0, 0.16) 263.077deg, rgba(0, 0, 0, 0.12) 360deg)',
                    maskImage: 'radial-gradient(circle, transparent 131px, black 132px)',
                    WebkitMaskImage: 'radial-gradient(circle, transparent 131px, black 132px)',
                  }}
                />
                {/* Center Content */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <span 
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '15px',
                      fontWeight: '600',
                      lineHeight: '1.2',
                      color: 'rgba(0, 0, 0, 0.64)',
                      letterSpacing: '-0.15px',
                      marginBottom: '15px',
                    }}
                  >
                    Opportunity Score
                  </span>
                  <span 
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '40px',
                      fontWeight: '600',
                      lineHeight: '1.2',
                      color: '#0BC762',
                      letterSpacing: '-0.4px',
                    }}
                  >
                    63
                  </span>
                  <div 
                    style={{
                      width: '41px',
                      height: '2px',
                      backgroundColor: '#000',
                      borderRadius: '1000px',
                      margin: '9px 0',
                    }}
                  />
                  <span 
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '15px',
                      fontWeight: '600',
                      lineHeight: '1.2',
                      color: '#000',
                      letterSpacing: '-0.15px',
                    }}
                  >
                    100
                  </span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h2 
                className="mb-[16px]"
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '20px',
                  fontWeight: '600',
                  lineHeight: '1.2',
                  color: '#000',
                  letterSpacing: '-0.2px',
                }}
              >
                Summary
              </h2>
              <p 
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '14px',
                  fontWeight: '365',
                  lineHeight: '1.6',
                  color: 'rgba(0, 0, 0, 0.64)',
                  letterSpacing: '-0.14px',
                }}
              >
                Create helpful content about refrigerators to improve Lowe's visibility in this category. This increases AI placement and drives high-intent traffic.
              </p>
            </div>

            {/* Key Strategies */}
            <div>
              <h2 
                className="mb-[16px]"
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '20px',
                  fontWeight: '600',
                  lineHeight: '1.2',
                  color: '#000',
                  letterSpacing: '-0.2px',
                }}
              >
                Key Strategies
              </h2>
              <ul className="space-y-[12px]">
                <li 
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '14px',
                    fontWeight: '365',
                    lineHeight: '1.6',
                    color: 'rgba(0, 0, 0, 0.64)',
                    letterSpacing: '-0.14px',
                    listStyle: 'disc',
                    marginLeft: '20px',
                  }}
                >
                  Create short guides that explain refrigerator types, sizes, and features.
                </li>
                <li 
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '14px',
                    fontWeight: '365',
                    lineHeight: '1.6',
                    color: 'rgba(0, 0, 0, 0.64)',
                    letterSpacing: '-0.14px',
                    listStyle: 'disc',
                    marginLeft: '20px',
                  }}
                >
                  Publish comparison lists like "Best Refrigerators for Small Spaces" or "Top Energy-Efficient Picks."
                </li>
                <li 
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '14px',
                    fontWeight: '365',
                    lineHeight: '1.6',
                    color: 'rgba(0, 0, 0, 0.64)',
                    letterSpacing: '-0.14px',
                    listStyle: 'disc',
                    marginLeft: '20px',
                  }}
                >
                  Use simple structure so AI models easily surface Lowe's content in answers.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Opportunities
