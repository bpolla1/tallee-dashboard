import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react'
import { useState } from 'react'

const topics = [
  'All',
  'Refrigerator',
  'Air Purifiers',
  'Cooking',
  'Kitchen Cabinets',
  'Washer/Dryer',
  'Water Heater',
  'Tiles',
  'Dishwasher',
  'Power Tools'
]

function TopTopics() {
  const [selectedTopic, setSelectedTopic] = useState('All')
  const [selectedTab, setSelectedTab] = useState('Topics')

  // Map button names to topic names
  const topicNameMap: Record<string, string> = {
    'Refrigerator': 'Refrigerators',
    'Air Purifiers': 'Air purifiers',
    'Cooking': 'Cooking',
    'Kitchen Cabinets': 'Kitchen Cabinets',
    'Washer/Dryer': 'Washer & Dryer',
    'Water Heater': 'Water Heater',
    'Tiles': 'Tiles',
    'Dishwasher': 'Dishwasher',
    'Power Tools': 'Power Tools',
  }

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic)
    
    if (topic === 'All') {
      // Scroll to top of topics section
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // Get the topic name from the map
    const topicName = topicNameMap[topic]
    if (topicName) {
      // Create a safe ID from the topic name
      const topicId = `topic-${topicName.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`
      const element = document.getElementById(topicId)
      
      if (element) {
        // Calculate position with offset to ensure category name is visible
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offset = 150 // Offset to account for headers and ensure category name is visible
        const offsetPosition = elementPosition - offset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <div className="mb-6">
      {/* Tabs */}
      <div className="flex items-center gap-[21px] mb-[24px]">
        <button
          onClick={() => setSelectedTab('Topics')}
          className="flex flex-col gap-[6px] h-[28px]"
        >
          <span 
            style={{
              fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
              fontSize: '12.5px',
              fontWeight: '365',
              lineHeight: '1.2',
              color: selectedTab === 'Topics' ? '#000' : 'rgba(0, 0, 0, 0.42)',
              letterSpacing: '-0.125px',
            }}
          >
            Topics
          </span>
          {selectedTab === 'Topics' && (
            <div className="h-px w-full bg-black" />
          )}
        </button>
        <button
          onClick={() => setSelectedTab('Opportunities')}
          className="flex flex-col gap-[6px] h-[28px]"
        >
          <span 
            style={{
              fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
              fontSize: '12.5px',
              fontWeight: '365',
              lineHeight: '1.2',
              color: selectedTab === 'Opportunities' ? '#000' : 'rgba(0, 0, 0, 0.42)',
              letterSpacing: '-0.125px',
            }}
          >
            Opportunities
          </span>
          {selectedTab === 'Opportunities' && (
            <div className="h-px w-full bg-black" />
          )}
        </button>
        <button
          onClick={() => setSelectedTab('Prompts')}
          className="flex flex-col gap-[6px] h-[28px]"
        >
          <span 
            style={{
              fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
              fontSize: '12.5px',
              fontWeight: '365',
              lineHeight: '1.2',
              color: selectedTab === 'Prompts' ? '#000' : 'rgba(0, 0, 0, 0.42)',
              letterSpacing: '-0.125px',
            }}
          >
            Prompts
          </span>
          {selectedTab === 'Prompts' && (
            <div className="h-px w-full bg-black" />
          )}
        </button>
      </div>

      {/* Topics Heading */}
      <div className="mb-[18px]">
        <h2 
          style={{
            fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
            fontSize: '20px',
            fontWeight: '365',
            lineHeight: '1.35',
            color: '#000',
            letterSpacing: '-0.2px',
          }}
        >
          Topics
        </h2>
      </div>

      {/* Search Bar */}
      <div className="mb-[15px]">
        <div 
          className="flex items-center h-[46px] px-[18px] py-[12px] rounded-[9px]"
          style={{
            background: 'rgba(0, 0, 0, 0.04)',
          }}
        >
          <Search className="w-[18px] h-[18px] text-black mr-[9px] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search Topics"
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
      </div>

      {/* Filter Section */}
      <div className="flex items-center gap-[24px] h-[27px]">
        {/* Top Topics Dropdown */}
        <div className="flex items-center gap-[6px]">
          <ChevronLeft className="w-[9px] h-[9px] text-black" strokeWidth={2} />
          <span 
            style={{
              fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
              fontSize: '11.5px',
              fontWeight: '365',
              lineHeight: '1.2',
              color: '#000',
              letterSpacing: '-0.115px',
            }}
          >
            Top Topics
          </span>
        </div>

        {/* Vertical Line */}
        <div className="h-full w-px" style={{ backgroundColor: 'rgba(0, 0, 0, 0.08)' }} />

        {/* Topics Label */}
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
          Topics
        </span>

        {/* Topic Filter Pills */}
        <div className="flex items-center gap-[3px] flex-1">
          {/* Left Navigation */}
          <button
            className="flex items-center justify-center w-[9px] h-[9px]"
            aria-label="Previous topics"
          >
            <ChevronLeft className="w-[9px] h-[9px] text-black" strokeWidth={2} />
          </button>

          {/* Pills Container */}
          <div className="flex items-center gap-[3px] flex-1 overflow-x-auto">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className="flex items-center justify-center h-[27px] px-[14px] transition-colors whitespace-nowrap flex-shrink-0"
                style={{
                  borderRadius: '200px',
                  background: selectedTopic === topic 
                    ? '#000' 
                    : 'rgba(0, 0, 0, 0.04)',
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '11.5px',
                  fontWeight: '365',
                  lineHeight: '1.2',
                  letterSpacing: '-0.115px',
                  color: selectedTopic === topic ? '#fff' : '#000',
                }}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Right Navigation */}
          <button
            className="flex items-center justify-center w-[9px] h-[9px]"
            aria-label="Next topics"
          >
            <ChevronRight className="w-[9px] h-[9px] text-black" strokeWidth={2} />
          </button>

          {/* Add Topic Button */}
          <button 
            className="flex items-center justify-center gap-[6px] h-[27px] px-[12px] bg-black text-white transition-colors hover:bg-gray-800 flex-shrink-0"
            style={{
              borderRadius: '200px',
              fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
              fontSize: '11.5px',
              fontWeight: '365',
              lineHeight: '1.2',
              letterSpacing: '-0.115px',
            }}
          >
            <Plus className="w-[9px] h-[9px]" />
            <span>Add Topic</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TopTopics
