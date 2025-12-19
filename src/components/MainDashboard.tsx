import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TimePeriod } from '../types'
import { TrendingUp } from 'lucide-react'
import homeDepotLogo from '../assets/home-depot-logo.jpg'
import lowesLogo from '../assets/lowes-logo.png'
import { useQuery } from '@tanstack/react-query'
import { fetchMainDashboard, fetchMetrics } from '../lib/sheetsApi'
import { useNavigate } from 'react-router-dom'

interface MainDashboardProps {
  selectedPeriod: TimePeriod
  account?: 'lowes' | 'havenly'
}

// Hardcoded Havenly data
const havenlyCompetitors = [
  { name: 'Uncommon', value: 84 },
  { name: 'Avenue', value: 56 },
  { name: 'Boulevard', value: 53 },
  { name: 'Oliv', value: 24 },
  { name: 'Balcony', value: 13 },
]

const havenlyChartData = [
  { day: '1', user: 80, competitor: 11 },
  { day: '2', user: 78, competitor: 12 },
  { day: '3', user: 75, competitor: 12 },
  { day: '4', user: 78, competitor: 9 },
  { day: '5', user: 77, competitor: 8 },
  { day: '6', user: 76, competitor: 9 },
  { day: '7', user: 79, competitor: 11 },
  { day: '8', user: 78, competitor: 12 },
  { day: '9', user: 79, competitor: 13 },
  { day: '10', user: 80, competitor: 13 },
]

function MainDashboard({ selectedPeriod, account = 'lowes' }: MainDashboardProps) {
  const navigate = useNavigate()
  
  // Fetch main dashboard data only for Lowes
  const { data: dashboardData, isLoading: isLoadingDashboard } = useQuery({
    queryKey: ['main-dashboard'],
    queryFn: fetchMainDashboard,
    refetchInterval: 60000, // Refetch every 60 seconds
    enabled: account === 'lowes', // Only fetch for Lowes
  })

  // Fetch metrics only for Lowes
  const { data: metricsData, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ['metrics'],
    queryFn: fetchMetrics,
    refetchInterval: 60000, // Refetch every 60 seconds
    enabled: account === 'lowes', // Only fetch for Lowes
  })

  // Use fetched data or fallback to defaults based on account
  const chartData = account === 'havenly' 
    ? havenlyChartData 
    : (dashboardData?.chartData || [
        { day: '1', user: 38, competitor: 62 },
        { day: '2', user: 25, competitor: 65 },
        { day: '3', user: 33, competitor: 67 },
        { day: '4', user: 31, competitor: 69 },
        { day: '5', user: 38, competitor: 62 },
        { day: '6', user: 27, competitor: 73 },
        { day: '7', user: 23, competitor: 77 },
        { day: '8', user: 19, competitor: 81 },
        { day: '9', user: 25, competitor: 75 },
        { day: '10', user: 27, competitor: 73 },
        { day: '11', user: 27, competitor: 73 },
        { day: '12', user: 31, competitor: 69 },
        { day: '13', user: 33, competitor: 67 },
        { day: '14', user: 35, competitor: 65 },
        { day: '15', user: 36, competitor: 64 },
      ])

  const competitors = account === 'havenly'
    ? havenlyCompetitors.map(comp => ({
        name: comp.name,
        value: comp.value,
        color: comp.name === 'Balcony' ? '#6881A8' : (comp.name === 'Uncommon' ? '#000' : '#000'),
        logo: undefined, // No logos for Havenly competitors
      }))
    : (dashboardData?.competitors?.map(comp => ({
        name: comp.name,
        value: comp.rate,
        color: comp.name === 'Home Depot' ? '#ff6600' : '#004990',
        logo: comp.name === 'Home Depot' ? homeDepotLogo : lowesLogo,
      })) || [
        { name: 'Home Depot', value: 84, color: '#ff6600', logo: homeDepotLogo },
        { name: "Lowe's", value: 56, color: '#004990', logo: lowesLogo },
      ])

  const overallRate = account === 'havenly' ? 22 : (dashboardData?.overallRate || 22)
  const overallChange = account === 'havenly' ? 7 : (dashboardData?.overallChange || 7)

  // Transform metrics data
  const getMetricValue = (metricName: string) => {
    if (account === 'havenly') {
      // Hardcoded values for Havenly from Figma
      if (metricName === 'Topics') return 3
      if (metricName === 'Opportunities') return 9
      if (metricName === 'Prompts') return 9
      return 0
    }
    const metric = metricsData?.find((m: any) => m['Metric Name'] === metricName)
    return metric ? metric.Value : 0
  }

  const topicsValue = getMetricValue('Topics') || (account === 'havenly' ? 3 : 127)
  const opportunitiesValue = getMetricValue('Opportunities') || (account === 'havenly' ? 9 : 629)
  const promptsValue = getMetricValue('Prompts') || (account === 'havenly' ? 9 : 784)

  if (account === 'lowes' && (isLoadingDashboard || isLoadingMetrics)) {
    return (
      <div 
        className="rounded-[18px] mb-6"
        style={{
          background: 'rgba(0, 0, 0, 0.02)',
        }}
      >
        <div className="px-[30px] py-[30px] text-center">
          <p style={{
            fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
            fontSize: '14px',
            color: 'rgba(0, 0, 0, 0.64)',
          }}>
            Loading dashboard data...
          </p>
        </div>
      </div>
    )
  }
  return (
    <div 
      className="rounded-[18px] mb-6"
      style={{
        background: 'rgba(0, 0, 0, 0.02)',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_410px_180px] gap-[60px] px-[30px] py-[30px]">
        {/* Overall Mention Rate */}
        <div>
          <div className="mb-[18px]">
            <h2 
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
              Overall Mention Rate
            </h2>
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
                {overallRate}%
              </span>
              <div className="flex items-center gap-[6px] pb-[3px]">
                <TrendingUp className="w-[15px] h-[15px] text-[#0bc762]" strokeWidth={2} />
                <div className="flex items-center gap-[3px]">
                  <span 
                    className="font-semibold"
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '13.5px',
                      color: '#0bc762',
                    }}
                  >
                    Up {overallChange}%
                  </span>
                  <span 
                    className="font-normal"
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '13.5px',
                      color: 'rgba(0, 0, 0, 0.64)',
                    }}
                  >
                    prev
                  </span>
                  <span 
                    className="font-normal"
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '13.5px',
                      color: 'rgba(0, 0, 0, 0.64)',
                    }}
                  >
                    7 days
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-[227px]">
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
                  stroke={account === 'havenly' ? '#000000' : '#004990'}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  dot={false}
                  activeDot={{ r: 4, fill: account === 'havenly' ? '#000000' : '#004990' }}
                />
                <Line 
                  type="linear" 
                  dataKey="competitor" 
                  stroke={account === 'havenly' ? '#6881A8' : '#FF6600'}
                  strokeWidth={account === 'havenly' ? 4 : 3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  dot={false}
                  activeDot={{ r: 4, fill: account === 'havenly' ? '#6881A8' : '#FF6600' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competitors */}
        <div className="flex flex-col gap-0 max-w-[410px]">
          <h3 
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
            Competitors
          </h3>
          <div className="flex flex-col gap-0">
            {/* Horizontal separator line */}
            <div className="h-px w-full mb-[15px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }} />
            
            {competitors.map((competitor, index) => (
              <div key={competitor.name}>
                <div className="flex items-center gap-[30px] mb-[12px]">
                  {/* Logo and Name */}
                  <div className="flex items-center gap-[12px] flex-shrink-0" style={{ width: '130px' }}>
                    {competitor.logo && (
                    <img 
                      src={competitor.logo} 
                      alt={competitor.name}
                      className="w-[24px] h-[24px] object-contain flex-shrink-0"
                    />
                    )}
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
                  
                  {/* Rate Label, Value, and Progress Bar */}
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
                
                {/* Separator line between competitors */}
                {index < competitors.length - 1 && (
                  <div className="h-px w-full mb-[15px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }} />
                )}
              </div>
            ))}
            
            {/* Add Competitor Button */}
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
                Rate: -- %
              </span>
            </div>
          </div>
        </div>
        
        {/* Metrics Sidebar */}
        <div 
          className="hidden lg:flex flex-col"
          style={{
            maxWidth: '180px',
            padding: '21px 24px',
            borderRadius: '12px',
            background: 'rgba(0, 0, 0, 0.02)',
            gap: '15px',
            flex: '1 0 0',
            alignSelf: 'stretch',
          }}
        >
          <div className="flex flex-col gap-[15px]">
            <div 
              style={{
                fontFamily: 'var(--font-heading, "Sequel Sans VF Body", Inter, sans-serif)',
                fontSize: '13.5px',
                fontWeight: '110',
                lineHeight: '120%',
                letterSpacing: '-0.27px',
                color: 'rgba(0, 0, 0, 0.64)',
              }}
            >
              Topics
            </div>
            <div 
              style={{
                fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                fontSize: '20px',
                fontWeight: '481',
                lineHeight: '120%',
                letterSpacing: '-0.2px',
                color: '#000',
              }}
            >
              {topicsValue}
            </div>
            <a 
              href="#"
              style={{
                fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                fontSize: '12.5px',
                fontWeight: '365',
                lineHeight: '1.2',
                color: '#000',
                letterSpacing: '-0.125px',
              }}
            >
              View →
            </a>
          </div>
          <div className="h-px w-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }} />
          <div className="flex flex-col gap-[15px]">
            <div 
              style={{
                fontFamily: 'var(--font-heading, "Sequel Sans VF Body", Inter, sans-serif)',
                fontSize: '13.5px',
                fontWeight: '110',
                lineHeight: '120%',
                letterSpacing: '-0.27px',
                color: 'rgba(0, 0, 0, 0.64)',
              }}
            >
              Opportunities
            </div>
            <div 
              style={{
                fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                fontSize: '20px',
                fontWeight: '481',
                lineHeight: '120%',
                letterSpacing: '-0.2px',
                color: '#000',
              }}
            >
              {opportunitiesValue}
            </div>
            <button
              onClick={() => account === 'lowes' ? navigate('/lowes/opportunities') : navigate('/havenly/opportunities')}
              className="text-left hover:opacity-70 transition-opacity"
              style={{
                fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                fontSize: '12.5px',
                fontWeight: '365',
                lineHeight: '1.2',
                color: '#000',
                letterSpacing: '-0.125px',
                cursor: 'pointer',
              }}
            >
              View →
            </button>
          </div>
          <div className="h-px w-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }} />
          <div className="flex flex-col gap-[15px]">
            <div 
              style={{
                fontFamily: 'var(--font-heading, "Sequel Sans VF Body", Inter, sans-serif)',
                fontSize: '13.5px',
                fontWeight: '110',
                lineHeight: '120%',
                letterSpacing: '-0.27px',
                color: 'rgba(0, 0, 0, 0.64)',
              }}
            >
              Prompts
            </div>
            <div 
              style={{
                fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                fontSize: '20px',
                fontWeight: '481',
                lineHeight: '120%',
                letterSpacing: '-0.2px',
                color: '#000',
              }}
            >
              {promptsValue}
            </div>
            <a 
              href="#"
              style={{
                fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                fontSize: '12.5px',
                fontWeight: '365',
                lineHeight: '1.2',
                color: '#000',
                letterSpacing: '-0.125px',
              }}
            >
              View →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainDashboard
