import Header from '../components/Header'
import MainDashboard from '../components/MainDashboard'
import TopTopics from '../components/TopTopics'
import TopicSection from '../components/TopicSection'
import { Topic, TimePeriod } from '../types'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCategory } from '../lib/sheetsApi'

const timePeriods: TimePeriod[] = ['Day', 'Week', 'Month', 'Quarter', 'Year']

// Category names that match your Google Sheet tab names
const categoryNames = [
  'Refrigerators',
  'Air purifiers',
  'Cooking',
  'Kitchen Cabinets',
  'Washer & Dryer'
]

// Helper function to transform category data to Topic format
function transformCategoryToTopic(categoryData: any, categoryName: string, id: string): Topic {
  const metadata = categoryData.metadata || {}
  
  return {
    id,
    name: categoryName,
    keywords: metadata.keywords || '',
    visibility: parseFloat(metadata.brandvisibility) || 50,
    visibilityChange: parseFloat(metadata.brandvisibilitychange) || 1.0,
    competitorData: categoryData.competitorData || [],
    phrases: categoryData.phrases || [],
    linksClicked: parseFloat(metadata.linksclicked) || 0,
  }
}

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('Month')

  // Fetch all categories
  const categoryQueries = categoryNames.map((name, index) => 
    useQuery({
      queryKey: ['category', name],
      queryFn: () => fetchCategory(name),
      enabled: true,
      refetchInterval: 60000, // Refetch every 60 seconds
    })
  )

  // Transform fetched data to topics
  const topics: Topic[] = categoryQueries.map((query, index) => {
    if (query.isLoading || !query.data) {
      // Return placeholder while loading
      return {
        id: String(index + 1),
        name: categoryNames[index],
        keywords: '',
        visibility: 50,
        visibilityChange: 1.0,
        competitorData: [],
        phrases: [],
        linksClicked: 0,
      }
    }
    return transformCategoryToTopic(query.data, categoryNames[index], String(index + 1))
  })

  const isLoading = categoryQueries.some(query => query.isLoading)
  const hasError = categoryQueries.some(query => query.isError)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-[1400px] mx-auto px-9 py-6">
        <div className="mb-6">
          <h1 
            className="text-black"
            style={{
              fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
              fontSize: '32px',
              fontWeight: '600',
              lineHeight: '32px',
              letterSpacing: '-0.64px',
            }}
          >
            Dashboard
          </h1>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-[30px] h-[27px] mb-6">
          {timePeriods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`h-[27px] flex items-center justify-center rounded-[200px] transition-colors ${
                selectedPeriod === period
                  ? 'bg-black text-white'
                  : 'bg-transparent text-black'
              }`}
              style={{
                fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                fontSize: '11.5px',
                fontWeight: '365',
                lineHeight: '120%',
                letterSpacing: '-0.115px',
                paddingLeft: selectedPeriod === period ? '14px' : '0px',
                paddingRight: selectedPeriod === period ? '14px' : '0px',
              }}
            >
              {period}
            </button>
          ))}
        </div>
        
        {hasError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-red-800" style={{
              fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
              fontSize: '14px',
            }}>
              Error loading data. Please check your backend connection.
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="mb-6 p-4 text-center">
            <p style={{
              fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
              fontSize: '14px',
              color: 'rgba(0, 0, 0, 0.64)',
            }}>
              Loading dashboard data...
            </p>
          </div>
        ) : (
          <>
        <MainDashboard selectedPeriod={selectedPeriod} />
        
        <div className="mb-[36px]" />
        
        <TopTopics />
        
        <div className="mt-[30px]">
              {topics.map((topic) => {
                const topicId = `topic-${topic.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`
                return (
                  <div key={topic.id} id={topicId}>
                    <TopicSection topic={topic} />
                  </div>
                )
              })}
        </div>
          </>
        )}
      </div>
    </div>
  )
}
