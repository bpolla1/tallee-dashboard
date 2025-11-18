export interface CompetitorData {
  name: string
  value: number
  color: string
}

export interface PhraseData {
  phrase: string
  userVisibility: number
  competitorVisibility: number
}

export interface Topic {
  id: string
  name: string
  keywords: string
  visibility: number
  visibilityChange: number
  competitorData: CompetitorData[]
  chartData?: Array<{ day: string; user: number; competitor: number }>
  phrases: PhraseData[]
  linksClicked: number
}

export type TimePeriod = 'Day' | 'Week' | 'Month' | 'Quarter' | 'Year'
