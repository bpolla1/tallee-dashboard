import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { Topic } from '../types'
import homeDepotLogo from '@/assets/home-depot-logo.jpg'
import lowesLogo from '@/assets/lowes-logo.png'
import flagIcon from '@/assets/flag-filled.svg'

interface TopicSectionProps {
  topic: Topic
}

// Fallback chart data if not provided from API
const defaultChartData = [
  { day: 'M', user: 50, competitor: 42 },
  { day: 'T', user: 52, competitor: 45 },
  { day: 'W', user: 48, competitor: 40 },
  { day: 'T', user: 55, competitor: 43 },
  { day: 'F', user: 50, competitor: 38 },
  { day: 'S', user: 53, competitor: 42 },
  { day: 'S', user: 50, competitor: 40 },
]

const competitorLogos: Record<string, string> = {
  'Home Depot': homeDepotLogo,
  "Lowe's": lowesLogo,
}

function TopicSection({ topic }: TopicSectionProps) {
  const [phrasesExpanded, setPhrasesExpanded] = useState(true)
  const [linksExpanded, setLinksExpanded] = useState(false)
  const [linksCitedExpanded, setLinksCitedExpanded] = useState(false)
  const [currentRanking, setCurrentRanking] = useState(1)
  const totalRankings = 15

  // Use chart data from topic if available, otherwise use default
  const chartData = topic.chartData && topic.chartData.length > 0 
    ? topic.chartData 
    : defaultChartData

  // Test data for Links Cited section (only show for Refrigerators)
  const linksCitedData = topic.name === 'Refrigerators' ? [
    { url: 'applianceanalysts.com', fullUrl: 'https://applianceanalysts.com/lowes-vs-home-depot-appliances/?utm_source=chatgpt.com', percentage: 34 },
    { url: 'www.lowes.com', fullUrl: 'https://www.lowes.com/n/buying-guide/refrigerator-buying-guide?utm_source=chatgpt.com', percentage: 26 },
    { url: 'www.thespruce.com', fullUrl: 'https://www.thespruce.com/lowes-vs-home-depot-1822425?utm_source=chatgpt.com', percentage: 19 },
    { url: 'www.housedigest.com', fullUrl: 'https://www.housedigest.com/1016325/home-depot-or-lowes-which-has-better-deals-on-refrigerators/?utm_source=chatgpt.com', percentage: 13 },
    { url: 'appliancesmadesimple.com', fullUrl: 'https://appliancesmadesimple.com/lowes-vs-home-depot-appliances/?utm_source=chatgpt.com', percentage: 8 },
  ] : []
  const linksCitedCount = 5

  const phraseChartData = topic.phrases.map((phrase) => ({
    phrase: phrase.phrase,
    user: phrase.userVisibility,
    competitor: phrase.competitorVisibility,
  }))

  return (
    <div className="mb-[30px]">
      {/* Three-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[270px_1fr_480px] gap-[60px] mb-[30px]">
        {/* Left Column: Topic Info */}
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-[12px]">
              <img src={flagIcon} alt="" className="w-[15px] h-[15px] flex-shrink-0" />
              <h3 
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '27.6px',
                  fontWeight: '420',
                  lineHeight: '1.25',
                  color: '#000',
                }}
              >
                # {topic.name}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-[6px]">
              <span 
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '13.5px',
                  fontWeight: '90',
                  lineHeight: '1.25',
                  color: '#000',
                }}
              >
                Associated:
              </span>
              {topic.keywords.split(', ').slice(0, 5).map((keyword, idx) => (
                <span
                  key={idx}
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '13.5px',
                    fontWeight: '90',
                    lineHeight: '1.25',
                    color: 'rgba(0, 0, 0, 0.64)',
                  }}
                >
                  #{keyword.toLowerCase().replace(/\s+/g, '')}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column: Brand Visibility Metric and Graph */}
        <div className="flex flex-col gap-[30px]">
          {/* Brand Visibility Metric */}
          <div className="flex flex-col gap-[6px]">
            <h4 
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
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '23px',
                  fontWeight: '600',
                  lineHeight: '1.2',
                  letterSpacing: '-0.2px',
                  color: '#000',
                }}
              >
                {topic.visibility}%
              </span>
              <div className="flex items-center gap-[6px] pb-0">
                <TrendingUp className="w-[15px] h-[15px] text-[#0bc762]" strokeWidth={2} />
                <div className="flex items-center gap-[3px]">
                  <span 
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '13.5px',
                      fontWeight: '600',
                      color: '#0bc762',
                    }}
                  >
                    Up {topic.visibilityChange}%
                  </span>
                  <span 
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '13.5px',
                      fontWeight: '90',
                      color: 'rgba(0, 0, 0, 0.64)',
                    }}
                  >
                    prev
                  </span>
                  <span 
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '13.5px',
                      fontWeight: '90',
                      color: 'rgba(0, 0, 0, 0.64)',
                    }}
                  >
                    7 days
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Line Chart */}
          <div className="h-[275px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 0, right: 15, left: 45, bottom: 12 }}>
                <CartesianGrid 
                  strokeDasharray="0" 
                  stroke="rgba(0, 0, 0, 0.04)" 
                  vertical={false}
                  horizontal={true}
                />
                <XAxis 
                  dataKey="day" 
                  hide={true}
                />
                <YAxis 
                  tick={{ 
                    fontSize: 11.5, 
                    fill: '#989898',
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Body", Inter, sans-serif)',
                  }}
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
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
                    fontWeight: '500'
                  }}
                />
                <Line 
                  type="linear" 
                  dataKey="user" 
                  stroke="#004990" 
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  dot={false}
                  activeDot={{ r: 4, fill: '#004990' }}
                />
                <Line 
                  type="linear" 
                  dataKey="competitor" 
                  stroke="#FF6600" 
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  dot={false}
                  activeDot={{ r: 4, fill: '#FF6600' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Competitor Ranking */}
        <div className="flex flex-col gap-0 max-w-[480px]">
          <div className="flex items-center justify-between mb-[18px]">
            <h4 
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
            <div className="flex items-center gap-[12px]">
              <button
                onClick={() => setCurrentRanking(Math.max(1, currentRanking - 1))}
                disabled={currentRanking === 1}
                className="flex items-center justify-center w-[12px] h-[12px] disabled:opacity-50"
              >
                <ChevronLeft className="w-[12px] h-[12px] text-black" strokeWidth={2} />
              </button>
              <span 
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '11.5px',
                  fontWeight: '365',
                  lineHeight: '1.6',
                  color: '#000',
                  letterSpacing: '-0.115px',
                }}
              >
                {currentRanking}–{Math.min(currentRanking + 4, totalRankings)}
              </span>
              <span 
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '11.5px',
                  fontWeight: '90',
                  lineHeight: '1.6',
                  color: 'rgba(0, 0, 0, 0.64)',
                  letterSpacing: '-0.115px',
                }}
              >
                of
              </span>
              <span 
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '11.5px',
                  fontWeight: '90',
                  lineHeight: '1.6',
                  color: 'rgba(0, 0, 0, 0.64)',
                  letterSpacing: '-0.115px',
                }}
              >
                {totalRankings}
              </span>
              <button
                onClick={() => setCurrentRanking(Math.min(totalRankings - 4, currentRanking + 1))}
                disabled={currentRanking >= totalRankings - 4}
                className="flex items-center justify-center w-[12px] h-[12px] disabled:opacity-50"
              >
                <ChevronRight className="w-[12px] h-[12px] text-black" strokeWidth={2} />
              </button>
            </div>
          </div>
          <div className="h-px w-full mb-[15px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }} />
          <div className="flex flex-col gap-[15px]">
            {topic.competitorData.map((competitor, index) => (
              <div key={competitor.name}>
                <div className="flex items-center gap-[30px] mb-[12px]">
                  <div className="flex items-center gap-[12px] flex-shrink-0" style={{ width: '130px' }}>
                    <img 
                      src={competitorLogos[competitor.name]} 
                      alt={competitor.name}
                      className="w-[24px] h-[24px] object-contain flex-shrink-0"
                    />
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
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
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
                        Total:
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
                          backgroundColor: competitor.color === '#f97316' ? '#ff6600' : competitor.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
                {index < topic.competitorData.length - 1 && (
                  <div className="h-px w-full mb-[15px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }} />
                )}
              </div>
            ))}
            <div className="flex items-center gap-[12px] mt-[15px]">
              <button 
                className="flex items-center justify-center h-[36px] px-[18px] border-[1.8px] border-black rounded-full transition-colors hover:bg-gray-50"
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '13.5px',
                  fontWeight: 'normal',
                  lineHeight: '1.11',
                  color: '#000',
                }}
              >
                + Add Competitor
              </button>
              <span 
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '12.5px',
                  fontWeight: '365',
                  lineHeight: '160%',
                  letterSpacing: '-0.125px',
                  color: 'rgba(0, 0, 0, 0.4)',
                }}
              >
                Total: -- %
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Separator */}
      <div className="h-px w-full mb-[21px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }} />

      {/* Topic-related Phrases */}
      <div className="mb-[30px]">
        <div className="flex items-center justify-between mb-[36px]">
          <div className="flex items-center gap-[9px]">
            <button
              onClick={() => setPhrasesExpanded(!phrasesExpanded)}
              className="flex items-center gap-[9px]"
            >
              <ChevronDown 
                className={`w-[12px] h-[12px] text-black transition-transform ${phrasesExpanded ? 'rotate-180' : ''}`} 
                strokeWidth={2}
              />
              <span 
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '13.5px',
                  fontWeight: '365',
                  lineHeight: '1.33',
                  color: '#000',
                  letterSpacing: '-0.27px',
                }}
              >
                Topic-related Prompts
              </span>
              <span 
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '13.5px',
                  fontWeight: '365',
                  lineHeight: '1.33',
                  color: '#000',
                  letterSpacing: '-0.27px',
                }}
              >
                {phraseChartData.length}
              </span>
            </button>
          </div>
          <a 
            href="#"
            style={{
              fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
              fontSize: '11.5px',
              fontWeight: '365',
              lineHeight: '1.3',
              color: '#000',
              letterSpacing: '-0.115px',
            }}
          >
            View All &gt;
          </a>
        </div>

        {phrasesExpanded && (
          <>
            {/* Header Row */}
            <div className="h-px w-full mb-[36px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }} />
            <div className="grid grid-cols-[360px_1fr] gap-0 mb-[25px]">
              <div 
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '11.5px',
                  fontWeight: '365',
                  lineHeight: '1.39',
                  color: '#000',
                  letterSpacing: '-0.115px',
                }}
              >
                Prompt
              </div>
              <div className="grid grid-cols-2 gap-0">
                <div className="flex items-center gap-[12px]">
                  <img 
                    src={lowesLogo} 
                    alt="Lowe's"
                    className="w-[24px] h-[24px] object-contain flex-shrink-0"
                  />
                  <div 
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '11.5px',
                      fontWeight: '365',
                      lineHeight: '1.39',
                      color: '#000',
                      letterSpacing: '-0.115px',
                    }}
                  >
                    Visibility: Lowes
                  </div>
                </div>
                <div className="flex items-center gap-[12px]">
                  <img 
                    src={homeDepotLogo} 
                    alt="Home Depot"
                    className="w-[24px] h-[24px] object-contain flex-shrink-0"
                  />
                  <div 
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '11.5px',
                      fontWeight: '365',
                      lineHeight: '1.39',
                      color: '#000',
                      letterSpacing: '-0.115px',
                    }}
                  >
                    Visibility: Home Depot
                  </div>
                </div>
              </div>
            </div>

            {/* Phrases List */}
            <div className="space-y-0">
              {phraseChartData.map((item, index) => (
                <div key={index}>
                  {index > 0 && (
                    <div className="h-px w-full mb-[25px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }} />
                  )}
                  <div className="grid grid-cols-[360px_1fr] gap-0 mb-[25px]">
                    <div 
                      style={{
                        fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                        fontSize: '13.8px',
                        fontWeight: '156',
                        lineHeight: '1.57',
                        color: '#000',
                        letterSpacing: '-0.115px',
                      }}
                    >
                      {item.phrase}
                    </div>
                    <div className="grid grid-cols-2 gap-0">
                      {/* Visibility: Lowes (blue) */}
                      <div className="flex flex-col gap-[12px]">
                        <div 
                          style={{
                            fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                            fontSize: '13.8px',
                            fontWeight: '700',
                            lineHeight: '1.57',
                            color: '#000',
                            letterSpacing: '-0.115px',
                          }}
                        >
                          {item.user}%
                        </div>
                        <div className="h-[6px] rounded-[6px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}>
                          <div
                            className="h-[6px] rounded-[6px]"
                            style={{
                              width: `${item.user}%`,
                              backgroundColor: '#004990',
                            }}
                          />
                        </div>
                      </div>
                      {/* Visibility: Home Depot (orange) */}
                      <div className="flex flex-col gap-[12px]">
                        <div 
                          style={{
                            fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                            fontSize: '13.8px',
                            fontWeight: '700',
                            lineHeight: '1.57',
                            color: '#000',
                            letterSpacing: '-0.115px',
                          }}
                        >
                          {item.competitor}%
                        </div>
                        <div className="h-[6px] rounded-[6px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}>
                          <div
                            className="h-[6px] rounded-[6px]"
                            style={{
                              width: `${item.competitor}%`,
                              backgroundColor: '#ff6600',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Links Cited - TEST FEATURE (only for Refrigerators) */}
      {topic.name === 'Refrigerators' && (
        <div className="mb-[30px]">
          <div className="h-px w-full mb-[21px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }} />
          <div className="mb-[18px]">
            <button
              onClick={() => setLinksCitedExpanded(!linksCitedExpanded)}
              className="flex items-center gap-[9px]"
            >
              {linksCitedExpanded ? (
                <ChevronUp className="w-[12px] h-[12px] text-black" strokeWidth={2} />
              ) : (
                <ChevronDown className="w-[12px] h-[12px] text-black" strokeWidth={2} />
              )}
              <span 
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '13.5px',
                  fontWeight: '365',
                  lineHeight: '1.33',
                  color: '#000',
                  letterSpacing: '-0.27px',
                }}
              >
                Links Cited
              </span>
              <span 
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '13.5px',
                  fontWeight: '365',
                  lineHeight: '1.33',
                  color: '#000',
                  letterSpacing: '-0.27px',
                }}
              >
                {linksCitedCount}
              </span>
            </button>
          </div>

          {linksCitedExpanded && (
            <div className="space-y-0">
              {linksCitedData.map((link, index) => (
                <div key={index}>
                  {index > 0 && (
                    <div className="h-px w-full mb-[15px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }} />
                  )}
                  <div className="flex items-center gap-[12px] mb-[15px]">
                    {/* External link icon */}
                    <ExternalLink className="w-[12px] h-[12px] text-black flex-shrink-0" strokeWidth={2} />
                    
                    {/* Link text - clickable */}
                    <a
                      href={link.fullUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                        fontSize: '13.5px',
                        fontWeight: '600',
                        lineHeight: '1.6',
                        color: '#000',
                        letterSpacing: '-0.135px',
                        textDecoration: 'none',
                      }}
                      className="hover:underline"
                    >
                      {link.url}
                    </a>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Show text and percentage */}
                    <div className="flex items-center gap-[12px]">
                      <span 
                        style={{
                          fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                          fontSize: '13.5px',
                          fontWeight: '90',
                          lineHeight: '1.6',
                          color: 'rgba(0, 0, 0, 0.64)',
                          letterSpacing: '-0.135px',
                        }}
                      >
                        Show
                      </span>
                      <span 
                        style={{
                          fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                          fontSize: '13.5px',
                          fontWeight: '90',
                          lineHeight: '1.6',
                          color: 'rgba(0, 0, 0, 0.64)',
                          letterSpacing: '-0.135px',
                        }}
                      >
                        {link.percentage}%
                      </span>
                      
                      {/* Progress bar */}
                      <div className="w-[120px] h-[6px] rounded-[6px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}>
                        <div
                          className="h-[6px] rounded-[6px]"
                          style={{
                            width: `${link.percentage}%`,
                            backgroundColor: '#000',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Links Clicked */}
      <div className="border-t border-gray-200 pt-6">
        <button
          onClick={() => setLinksExpanded(!linksExpanded)}
          className="flex items-center justify-between w-full"
        >
          <span 
            style={{
              fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
              fontSize: '13.5px',
              fontWeight: '365',
              lineHeight: '1.33',
              color: '#000',
              letterSpacing: '-0.27px',
            }}
          >
            Links Clicked
          </span>
          <div className="flex items-center gap-[12px]">
            <span 
              style={{
                fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                fontSize: '13.5px',
                fontWeight: '90',
                lineHeight: '1.33',
                color: 'rgba(0, 0, 0, 0.64)',
                letterSpacing: '-0.27px',
              }}
            >
              {topic.linksClicked}
            </span>
            {linksExpanded ? (
              <ChevronUp className="w-4 h-4 text-black" />
            ) : (
              <ChevronDown className="w-4 h-4 text-black" />
            )}
          </div>
        </button>
        {linksExpanded && (
          <div 
            className="mt-4"
            style={{
              fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
              fontSize: '13.5px',
              fontWeight: '90',
              lineHeight: '1.6',
              color: 'rgba(0, 0, 0, 0.64)',
            }}
          >
            No links clicked data available.
          </div>
        )}
      </div>
    </div>
  )
}

export default TopicSection
