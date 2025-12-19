import { useState } from 'react'
import { Search, ChevronLeft, ChevronRight, ChevronDown, Bookmark } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TopicData {
  id: string
  name: string
  associated: string[]
  visibility: number
  visibilityChange: number
  chartData: Array<{ day: string; user: number; competitor: number }>
  competitors: Array<{ name: string; value: number; color: string }>
  linksCited: number
}

// Hardcoded Havenly topics data
const havenlyTopics: TopicData[] = [
  {
    id: '1',
    name: 'Best student apartments near Auburn University',
    associated: ['#top-rated', '#highest-rated', '#most recommended', '#leading', '#premier', '#flagship', '#superior'],
    visibility: 56,
    visibilityChange: 7,
    chartData: [
      { day: 'M', user: 85, competitor: 90 },
      { day: 'T', user: 88, competitor: 87 },
      { day: 'W', user: 82, competitor: 92 },
      { day: 'T', user: 87, competitor: 89 },
      { day: 'F', user: 90, competitor: 85 },
      { day: 'S', user: 85, competitor: 88 },
      { day: 'S', user: 88, competitor: 90 },
    ],
    competitors: [
      { name: 'Uncommon', value: 80, color: '#000' },
      { name: 'Avenue', value: 10, color: '#000' },
      { name: 'Boulevard', value: 6, color: '#000' },
      { name: 'OLIV', value: 4, color: '#000' },
      { name: 'Balcony', value: 0, color: '#6881A8' },
    ],
    linksCited: 8,
  },
  {
    id: '2',
    name: 'Where do Auburn students live off campus?',
    associated: ['#off-campus', '#student-housing', '#Auburn-living', '#college-apartments', '#near-campus'],
    visibility: 71,
    visibilityChange: 5,
    chartData: [
      { day: 'M', user: 40, competitor: 60 },
      { day: 'T', user: 42, competitor: 58 },
      { day: 'W', user: 45, competitor: 55 },
      { day: 'T', user: 43, competitor: 57 },
      { day: 'F', user: 41, competitor: 59 },
      { day: 'S', user: 44, competitor: 56 },
      { day: 'S', user: 42, competitor: 58 },
    ],
    competitors: [
      { name: 'Avenue', value: 66, color: '#000' },
      { name: 'Uncommon', value: 26, color: '#000' },
      { name: 'Boulevard', value: 4, color: '#000' },
      { name: 'Balcony', value: 0, color: '#6881A8' },
      { name: 'OLIV', value: 0, color: '#000' },
    ],
    linksCited: 12,
  },
  {
    id: '3',
    name: 'Which off-campus apartment is walkable to campus?',
    associated: ['#walkable', '#walking-distance', '#close-to-campus', '#pedestrian-friendly', '#convenient'],
    visibility: 71,
    visibilityChange: 12,
    chartData: [
      { day: 'M', user: 65, competitor: 35 },
      { day: 'T', user: 68, competitor: 32 },
      { day: 'W', user: 70, competitor: 30 },
      { day: 'T', user: 67, competitor: 33 },
      { day: 'F', user: 69, competitor: 31 },
      { day: 'S', user: 66, competitor: 34 },
      { day: 'S', user: 68, competitor: 32 },
    ],
    competitors: [
      { name: 'Uncommon', value: 78, color: '#000' },
      { name: 'Boulevard', value: 20, color: '#000' },
      { name: 'OLIV', value: 2, color: '#000' },
      { name: 'Balcony', value: 0, color: '#6881A8' },
      { name: 'Avenue', value: 0, color: '#000' },
    ],
    linksCited: 6,
  },
  {
    id: '4',
    name: 'Best luxury apartments for Auburn students?',
    associated: ['#luxury', '#upscale', '#premium', '#high-end', '#modern', '#amenities'],
    visibility: 71,
    visibilityChange: 3,
    chartData: [
      { day: 'M', user: 50, competitor: 50 },
      { day: 'T', user: 52, competitor: 48 },
      { day: 'W', user: 48, competitor: 52 },
      { day: 'T', user: 51, competitor: 49 },
      { day: 'F', user: 53, competitor: 47 },
      { day: 'S', user: 50, competitor: 50 },
      { day: 'S', user: 51, competitor: 49 },
    ],
    competitors: [
      { name: 'Uncommon', value: 29, color: '#000' },
      { name: 'OLIV', value: 26, color: '#000' },
      { name: 'Avenue', value: 12, color: '#000' },
      { name: 'Boulevard', value: 4, color: '#000' },
      { name: 'Balcony', value: 0, color: '#6881A8' },
    ],
    linksCited: 5,
  },
  {
    id: '5',
    name: "What's the nicest place to live near Auburn?",
    associated: ['#nicest', '#best-neighborhood', '#quality', '#desirable', '#top-location'],
    visibility: 71,
    visibilityChange: -2,
    chartData: [
      { day: 'M', user: 40, competitor: 60 },
      { day: 'T', user: 38, competitor: 62 },
      { day: 'W', user: 37, competitor: 63 },
      { day: 'T', user: 39, competitor: 61 },
      { day: 'F', user: 36, competitor: 64 },
      { day: 'S', user: 38, competitor: 62 },
      { day: 'S', user: 38, competitor: 62 },
    ],
    competitors: [
      { name: 'Boulevard', value: 66, color: '#000' },
      { name: 'OLIV', value: 26, color: '#000' },
      { name: 'Avenue', value: 4, color: '#000' },
      { name: 'Uncommon', value: 4, color: '#000' },
      { name: 'Balcony', value: 0, color: '#6881A8' },
    ],
    linksCited: 9,
  },
  {
    id: '6',
    name: 'Pet-friendly student housing in Auburn?',
    associated: ['#pet-friendly', '#dogs-allowed', '#cats-welcome', '#animal-friendly', '#pets'],
    visibility: 71,
    visibilityChange: 15,
    chartData: [
      { day: 'M', user: 70, competitor: 30 },
      { day: 'T', user: 73, competitor: 27 },
      { day: 'W', user: 75, competitor: 25 },
      { day: 'T', user: 74, competitor: 26 },
      { day: 'F', user: 76, competitor: 24 },
      { day: 'S', user: 72, competitor: 28 },
      { day: 'S', user: 74, competitor: 26 },
    ],
    competitors: [
      { name: 'Uncommon', value: 68, color: '#000' },
      { name: 'OLIV', value: 16, color: '#000' },
      { name: 'Avenue', value: 10, color: '#000' },
      { name: 'Boulevard', value: 6, color: '#000' },
      { name: 'Balcony', value: 0, color: '#6881A8' },
    ],
    linksCited: 7,
  },
  {
    id: '7',
    name: 'Which apartments near Auburn have a pool or gym?',
    associated: ['#amenities', '#pool', '#gym', '#fitness', '#resort-style', '#facilities'],
    visibility: 71,
    visibilityChange: 9,
    chartData: [
      { day: 'M', user: 60, competitor: 40 },
      { day: 'T', user: 62, competitor: 38 },
      { day: 'W', user: 64, competitor: 36 },
      { day: 'T', user: 61, competitor: 39 },
      { day: 'F', user: 63, competitor: 37 },
      { day: 'S', user: 60, competitor: 40 },
      { day: 'S', user: 62, competitor: 38 },
    ],
    competitors: [
      { name: 'Uncommon', value: 66, color: '#000' },
      { name: 'OLIV', value: 20, color: '#000' },
      { name: 'Boulevard', value: 14, color: '#000' },
      { name: 'Balcony', value: 0, color: '#6881A8' },
      { name: 'Avenue', value: 0, color: '#000' },
    ],
    linksCited: 11,
  },
  {
    id: '8',
    name: 'Which student apartments near Auburn are close to downtown Auburn?',
    associated: ['#downtown', '#city-center', '#close-to-shops', '#convenient-location', '#urban'],
    visibility: 71,
    visibilityChange: 4,
    chartData: [
      { day: 'M', user: 44, competitor: 56 },
      { day: 'T', user: 46, competitor: 54 },
      { day: 'W', user: 45, competitor: 55 },
      { day: 'T', user: 47, competitor: 53 },
      { day: 'F', user: 44, competitor: 56 },
      { day: 'S', user: 45, competitor: 55 },
      { day: 'S', user: 45, competitor: 55 },
    ],
    competitors: [
      { name: 'Uncommon', value: 68, color: '#000' },
      { name: 'Boulevard', value: 22, color: '#000' },
      { name: 'OLIV', value: 10, color: '#000' },
      { name: 'Balcony', value: 0, color: '#6881A8' },
      { name: 'Avenue', value: 0, color: '#000' },
    ],
    linksCited: 10,
  },
  {
    id: '9',
    name: 'Affordable off-campus apartments at Auburn?',
    associated: ['#affordable', '#budget-friendly', '#cheap', '#low-cost', '#economical', '#value'],
    visibility: 71,
    visibilityChange: 2,
    chartData: [
      { day: 'M', user: 34, competitor: 66 },
      { day: 'T', user: 36, competitor: 64 },
      { day: 'W', user: 35, competitor: 65 },
      { day: 'T', user: 37, competitor: 63 },
      { day: 'F', user: 34, competitor: 66 },
      { day: 'S', user: 35, competitor: 65 },
      { day: 'S', user: 35, competitor: 65 },
    ],
    competitors: [
      { name: 'Boulevard', value: 90, color: '#000' },
      { name: 'Uncommon', value: 8, color: '#000' },
      { name: 'Balcony', value: 2, color: '#6881A8' },
      { name: 'Avenue', value: 0, color: '#000' },
      { name: 'OLIV', value: 0, color: '#000' },
    ],
    linksCited: 14,
  },
]

const topicFilters = ['All', 'Best Apartment at Auburn', 'Where do students Live?', 'Which off-campus apartment is walkable to campus?', 'Pet-friendly student housing in Auburn']

function HavenlyTopics() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [expandedLinksCited, setExpandedLinksCited] = useState<{ [key: string]: boolean }>({})

  return (
    <div>
      {/* Topics Header */}
      <h2 
        className="text-black mb-6"
        style={{
          fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
          fontSize: '26px',
          fontWeight: '600',
          lineHeight: '1.2',
          letterSpacing: '-0.52px',
        }}
      >
        Topics
      </h2>

      {/* Search and Filters */}
      <div className="mb-6">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Topics"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[36px] pl-10 pr-4 border border-gray-200 rounded-lg"
            style={{
              fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
              fontSize: '13.5px',
              fontWeight: '365',
              color: '#000',
              backgroundColor: '#fff',
            }}
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          <button
            className="flex items-center gap-2 h-[27px] px-3 rounded-full bg-black text-white flex-shrink-0"
            style={{
              fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
              fontSize: '11.5px',
              fontWeight: '365',
              letterSpacing: '-0.115px',
            }}
          >
            Top Topics
            <ChevronDown className="w-3 h-3" />
          </button>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="h-[27px] w-[27px] flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50">
              <ChevronLeft className="w-3 h-3" />
            </button>
            <span
              style={{
                fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                fontSize: '11.5px',
                fontWeight: '365',
                color: 'rgba(0, 0, 0, 0.64)',
              }}
            >
              Topics
            </span>
            <button className="h-[27px] w-[27px] flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50">
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {topicFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`h-[27px] px-3 rounded-full flex-shrink-0 ${
                selectedFilter === filter ? 'bg-black text-white' : 'bg-transparent text-black border border-gray-300'
              }`}
              style={{
                fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                fontSize: '11.5px',
                fontWeight: '365',
                letterSpacing: '-0.115px',
              }}
            >
              {filter}
            </button>
          ))}

          <button
            className="h-[27px] px-3 rounded-full border border-gray-300 text-black flex-shrink-0"
            style={{
              fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
              fontSize: '11.5px',
              fontWeight: '365',
              letterSpacing: '-0.115px',
            }}
          >
            + Add Topic
          </button>
        </div>
      </div>

      {/* Topic Cards */}
      <div className="space-y-6">
        {havenlyTopics.map((topic) => (
          <div
            key={topic.id}
            className="rounded-[18px] p-[30px]"
            style={{
              background: 'rgba(0, 0, 0, 0.02)',
            }}
          >
            {/* Topic Name and Associated Tags */}
            <div className="mb-[24px]">
              <div className="flex items-start gap-2 mb-2">
                <Bookmark className="w-5 h-5 flex-shrink-0 text-black" fill="black" />
                <h3
                  className="text-black"
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '20px',
                    fontWeight: '600',
                    lineHeight: '1.2',
                    letterSpacing: '-0.4px',
                  }}
                >
                  #{topic.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '12.5px',
                    fontWeight: '365',
                    color: 'rgba(0, 0, 0, 0.64)',
                  }}
                >
                  Associated:
                </span>
                {topic.associated.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '12.5px',
                      fontWeight: '365',
                      color: 'rgba(0, 0, 0, 0.64)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Brand Visibility Chart and Ranking */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_410px] gap-[60px]">
              {/* Brand Visibility Chart */}
              <div>
                <div className="mb-[18px]">
                  <h4
                    className="mb-[6px]"
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Body", Inter, sans-serif)',
                      fontSize: '13.5px',
                      fontWeight: 'normal',
                      lineHeight: '1.2',
                      color: 'rgba(0, 0, 0, 0.64)',
                      letterSpacing: '-0.27px',
                    }}
                  >
                    Brand Visibility
                  </h4>
                  <div className="flex items-end gap-[12px]">
                    <span
                      className="font-semibold text-black"
                      style={{
                        fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                        fontSize: '30px',
                        lineHeight: '1.2',
                        letterSpacing: '-0.3px',
                      }}
                    >
                      {topic.visibility}%
                    </span>
                    <div className="flex items-center gap-[6px] pb-[3px]">
                      <span
                        className="font-semibold"
                        style={{
                          fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                          fontSize: '13.5px',
                          color: '#0bc762',
                        }}
                      >
                        ↑ Up {topic.visibilityChange}%
                      </span>
                      <span
                        className="font-normal"
                        style={{
                          fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                          fontSize: '13.5px',
                          color: 'rgba(0, 0, 0, 0.64)',
                        }}
                      >
                        prev 7 days
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-[227px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={topic.chartData} margin={{ top: 0, right: 15, left: 45, bottom: 12 }}>
                      <CartesianGrid strokeDasharray="0" stroke="rgba(0, 0, 0, 0.04)" vertical={false} horizontal={true} />
                      <XAxis dataKey="day" hide={true} />
                      <YAxis
                        tick={{
                          fontSize: 11.5,
                          fill: '#989898',
                          fontFamily: 'var(--font-heading, "Sequel Sans VF Body", Inter, sans-serif)',
                        }}
                        domain={[0, 100]}
                        ticks={[0, 20, 40, 50, 80, 100]}
                        tickFormatter={(value) => `${value}%`}
                        axisLine={false}
                        tickLine={false}
                        width={45}
                        style={{
                          letterSpacing: '-0.115px',
                        }}
                      />
                      <Tooltip
                        formatter={(value: number) => [`${value}%`, 'Visibility']}
                        labelFormatter={() => ''}
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          padding: '8px 12px',
                          fontSize: '12px',
                          fontWeight: '500',
                        }}
                      />
                      <Line
                        type="linear"
                        dataKey="user"
                        stroke="#333"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        dot={false}
                        activeDot={{ r: 4, fill: '#333' }}
                      />
                      <Line
                        type="linear"
                        dataKey="competitor"
                        stroke="#999"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        dot={false}
                        activeDot={{ r: 4, fill: '#999' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Brand Visibility Ranking */}
              <div className="flex flex-col gap-0 max-w-[410px]">
                <h4
                  className="mb-[18px]"
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '13.5px',
                    fontWeight: 'normal',
                    lineHeight: '1.2',
                    color: 'rgba(0, 0, 0, 0.64)',
                    letterSpacing: '-0.27px',
                  }}
                >
                  Brand Visibility Ranking
                </h4>
                <div className="flex flex-col gap-0">
                  <div className="h-px w-full mb-[15px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }} />

                  {topic.competitors.map((competitor, index) => (
                    <div key={competitor.name}>
                      <div className="flex items-center gap-[30px] mb-[12px]">
                        <div className="flex items-center gap-[12px] flex-shrink-0" style={{ width: '130px' }}>
                          <span
                            style={{
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 1,
                              flex: '1 0 0',
                              overflow: 'hidden',
                              color: '#000',
                              textOverflow: 'ellipsis',
                              fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                              fontSize: '12.5px',
                              fontWeight: '480',
                              lineHeight: '160%',
                              letterSpacing: '-0.125px',
                            }}
                          >
                            {index + 1} {competitor.name}
                          </span>
                        </div>

                        <div className="flex flex-1 items-center gap-[12px]">
                          <div className="flex items-center gap-[3px] flex-shrink-0">
                            <span
                              style={{
                                fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                                fontSize: '13.5px',
                                fontWeight: 'normal',
                                lineHeight: '160%',
                                letterSpacing: '-0.135px',
                                color: 'rgba(0, 0, 0, 0.4)',
                              }}
                            >
                              Rate:
                            </span>
                            <span
                              style={{
                                fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                                fontSize: '13.5px',
                                fontWeight: '438',
                                lineHeight: '160%',
                                letterSpacing: '-0.135px',
                                color: '#000',
                              }}
                            >
                              {competitor.value}%
                            </span>
                          </div>
                          <div className="flex-1 h-[9px] rounded-[6px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}>
                            <div
                              className="h-[9px] rounded-[6px]"
                              style={{
                                width: `${competitor.value}%`,
                                backgroundColor: competitor.color,
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {index < topic.competitors.length - 1 && (
                        <div className="h-px w-full mb-[15px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Links Cited */}
            <div className="mt-[30px]">
              <button
                onClick={() => setExpandedLinksCited(prev => ({ ...prev, [topic.id]: !prev[topic.id] }))}
                className="flex items-center gap-2 text-left hover:opacity-70 transition-opacity"
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '13.5px',
                  fontWeight: '365',
                  color: '#000',
                }}
              >
                <span className="text-green-600">✓</span>
                Links Cited {topic.linksCited}
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedLinksCited[topic.id] ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HavenlyTopics

