import { Sparkles, ChevronRight } from 'lucide-react'

interface OpportunityCardProps {
  type: string
  title: string
  impactScore: number
  onWriteArticle?: () => void
}

function OpportunityCard({ type, title, impactScore, onWriteArticle }: OpportunityCardProps) {
  return (
    <div 
      className="p-[30px] rounded-[18px]"
      style={{
        background: 'rgba(0, 0, 0, 0.02)',
        border: '1px solid rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Type Label Badge */}
      <div className="mb-[16px]">
        <div
          className="inline-flex items-center h-[26px] px-[12px]"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            borderRadius: '9px',
            fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
            fontSize: '11.5px',
            fontWeight: '365',
            lineHeight: '1.2',
            color: '#000',
            letterSpacing: '-0.115px',
          }}
        >
          {type}
        </div>
      </div>

      {/* Title */}
      <h3 
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
        {title}
      </h3>

      {/* Impact Score */}
      <div className="mb-[24px]">
        <div className="flex items-center justify-between mb-[10px]">
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
            Impact Score
          </span>
          <span 
            style={{
              fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
              fontSize: '12.5px',
              fontWeight: '600',
              lineHeight: '1.2',
              color: '#000',
              letterSpacing: '-0.125px',
            }}
          >
            {impactScore}%
          </span>
        </div>
        {/* Progress Bar */}
        <div 
          className="h-[6px] rounded-full overflow-hidden"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${impactScore}%`,
              backgroundColor: '#0bc762',
            }}
          />
        </div>
      </div>

      {/* Write Article Button */}
      <button
        onClick={onWriteArticle}
        className="w-full flex items-center h-[27px] rounded-full transition-colors hover:bg-gray-800"
        style={{
          backgroundColor: '#000',
          fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
          fontSize: '13.5px',
          fontWeight: '365',
          lineHeight: '1.2',
          color: '#fff',
          letterSpacing: '-0.135px',
          paddingLeft: '12px',
          paddingRight: '12px',
        }}
      >
        <Sparkles className="w-[9px] h-[9px] flex-shrink-0" style={{ marginRight: '6px' }} />
        <span className="flex-1 text-left">Write Article</span>
        <ChevronRight className="w-[9px] h-[9px] flex-shrink-0" strokeWidth={3} />
      </button>
    </div>
  )
}

export default OpportunityCard

