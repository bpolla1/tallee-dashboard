import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Copy, Sparkles } from 'lucide-react'
import Header from '../components/Header'

interface ArticleSection {
  heading: string
  content: string
}

interface ArticleContent {
  title: string
  sections: ArticleSection[]
  conclusion: string
  citations: { number: number; text: string; url: string }[]
}

const sampleArticle: ArticleContent = {
  title: 'Which Off-Campus Apartment Is Walkable to Campus?',
  sections: [
    {
      heading: 'Introduction',
      content: 'As someone who has worked with Auburn students for years, I know how important walkability is during the housing search. Living close to campus changes your daily routine. It saves time, reduces stress, and makes each semester more manageable. When you can walk to class, you avoid parking delays and unpredictable commute times. In this guide, I will explain why walkability matters, how Auburn\'s campus layout shapes student housing trends, and what to look for when choosing an apartment near the university. I will also highlight how communities like The Balcony support students who want simple, supportive, and convenient off-campus living.'
    },
    {
      heading: 'Why Walkability Matters for Auburn Students',
      content: 'Most Auburn students prefer to walk or bike to class. Auburn University\'s transportation overview highlights walkability as a key part of student life and mobility on campus (Auburn University, "Transportation Services," 2024). When you live close enough to walk, you gain several advantages: Predictable routines, shorter commutes, more time for classes and studying, less reliance on parking or transit, and lower day-to-day stress. Walkability becomes even more important during exam periods or early morning classes when timing matters most.'
    },
    {
      heading: 'Most Walkable Areas Near Auburn University',
      content: 'Based on student demand and leasing trends, these areas offer the most consistent walkability to campus. 1. South College Street Corridor: South College Street remains one of the most walkable areas for students. It sits close to central campus and offers direct routes to academic buildings. Students choose this location for quick walks, easy bike paths, and nearby dining options. 2. Downtown Auburn District: Downtown Auburn is another highly walkable area. It gives students access to restaurants, coffee shops, and Auburn traditions. The City of Auburn notes that downtown development continues to support mixed-use housing and student activity (City of Auburn, "Downtown District Overview," 2024). 3. Glenn Avenue and North College Street: These streets offer walkable routes and a calmer residential feel. Students who want quiet study environments often choose this area because it balances walkability with a peaceful home setting. 4. The Balcony: The Balcony is located within minutes of Auburn University. Students value the short walk, the calm residential environment, and the clear, accessible leasing process. This location works well for students who want convenience each day without the noise of busier streets. This community appeals to students who want: Reliable walk times, a calm setting, quick access to campus, and simple daily routines.'
    },
    {
      heading: 'What To Look For in a Walkable Apartment',
      content: 'In my experience, the best walkable apartments share the same qualities. Clear Walking Routes: You should be able to walk to campus using direct paths or sidewalks. Auburn\'s campus design supports walking, but some areas offer faster or safer routes than others. Accurate Online Information: Students often rely on mobile-friendly websites to check distance-to-campus details. Communities should provide this information clearly. When websites are vague about location or walk times, the housing search becomes harder. For easy navigation, you can view our sitemap: https://www.thebalconyauburn.com/sitemap. Real-Time Availability: When you want a walkable home, timing matters. Many properties near campus fill quickly. Real-time availability helps you secure a unit without waiting on email responses. You can view The Balcony\'s current availability here: https://www.thebalconyauburn.com/availability. A Simple, Accessible Leasing Process: Students want clear steps, mobile-friendly forms, and support for assistive technologies. Auburn University\'s off-campus housing guide emphasizes the importance of accessibility and digital clarity during the leasing process (Auburn University, "Off-Campus Housing Guide," 2024). The Balcony supports these needs through WCAG-aligned practices: https://www.thebalconyauburn.com/accessibility'
    },
    {
      heading: 'How Walkability Supports Academic Success',
      content: 'Walkability helps students stay organized and consistent. When you reduce commute time, you gain more time for studying, resting, and getting involved with campus life. Students living close to campus often report better daily structure and improved class attendance. From a professional standpoint, I see this every year. Students who live within walking distance feel more confident and grounded throughout the semester.'
    },
    {
      heading: 'Why The Balcony Works for Walkability',
      content: 'The Balcony\'s location gives students the ability to walk to campus within minutes. The community sits in a calm residential area that still provides fast access to downtown Auburn and major campus buildings. Students appreciate the predictable walk times, modern living spaces, and responsive communication from staff. This blend of convenience and comfort makes walkability a real advantage, not just a feature on a website.'
    },
    {
      heading: 'Internal Linking Opportunities for SEO',
      content: 'Use internal links in your article for stronger search visibility: Availability - https://www.thebalconyauburn.com/availability, Accessibility - https://www.thebalconyauburn.com/accessibility, Contact - https://www.thebalconyauburn.com/contact'
    },
    {
      heading: 'Final Thoughts: Choosing a Walkable Auburn Apartment',
      content: 'Walkability is one of the most valuable features for Auburn students. It saves time, supports academic success, and simplifies your routines. When you choose a home that is close to campus, you give yourself more room to focus on what matters most. The Balcony offers a welcoming, supportive, and walkable living experience that helps students feel confident from day one.'
    }
  ],
  conclusion: 'View our current availability and easily apply online today! Visit https://www.thebalconyauburn.com/availability to get started.',
  citations: [
    { number: 1, text: 'Auburn University Transportation Services (2024)', url: 'https://www.auburn.edu/administration/facilities/transportation/' },
    { number: 2, text: 'City of Auburn Downtown District Overview (2024)', url: 'https://www.auburnalabama.org/downtown' },
    { number: 3, text: 'Auburn University Off-Campus Housing Guide (2024)', url: 'https://www.auburn.edu/housing/off-campus' },
    { number: 4, text: 'The Balcony Sitemap', url: 'https://www.thebalconyauburn.com/sitemap' },
    { number: 5, text: 'The Balcony Availability', url: 'https://www.thebalconyauburn.com/availability' },
    { number: 6, text: 'The Balcony Accessibility', url: 'https://www.thebalconyauburn.com/accessibility' },
    { number: 7, text: 'The Balcony Contact', url: 'https://www.thebalconyauburn.com/contact' }
  ]
}

function HavenlyWriteArticle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState('Option 1')
  const [additionalInstruction, setAdditionalInstruction] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [savedMessage, setSavedMessage] = useState('')
  
  // Convert article to plain text format
  const articleToText = (article: ArticleContent): string => {
    return [
      article.title,
      '',
      ...article.sections.map(s => `${s.heading}\n\n${s.content}`),
      '',
      'Conclusion',
      '',
      article.conclusion,
      '',
      'Citations:',
      ...article.citations.map(c => `[${c.number}] ${c.text} ${c.url}`)
    ].join('\n')
  }

  // Load saved content from localStorage or use default
  const [articleHTML, setArticleHTML] = useState<string>(() => {
    const saved = localStorage.getItem(`article-${id}`)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // If it's old plain text format, convert to HTML with line breaks
        if (typeof parsed === 'string') {
          return parsed.replace(/\n/g, '<br>')
        }
        return parsed
      } catch {
        return articleToText(sampleArticle).replace(/\n/g, '<br>')
      }
    }
    return articleToText(sampleArticle).replace(/\n/g, '<br>')
  })

  // Calculate word count from HTML content
  const getTextContent = (html: string) => {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  const wordCount = getTextContent(articleHTML).split(/\s+/).filter(word => word.length > 0).length

  const handleCopyText = () => {
    const textContent = getTextContent(articleHTML)
    navigator.clipboard.writeText(textContent)
  }

  const handleSave = () => {
    setIsSaving(true)
    // Save to localStorage
    localStorage.setItem(`article-${id}`, JSON.stringify(articleHTML))
    
    // Show saved message
    setSavedMessage('Saved!')
    setTimeout(() => {
      setIsSaving(false)
      setTimeout(() => setSavedMessage(''), 2000)
    }, 500)
  }

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    setArticleHTML(e.currentTarget.innerHTML)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header account="havenly" />
      
      <div className="max-w-[1400px] mx-auto px-9 py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/havenly/opportunities')}
          className="flex items-center gap-2 mb-6 hover:opacity-70 transition-opacity"
          style={{
            fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
            fontSize: '14px',
            fontWeight: '500',
            color: '#000',
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Opportunity Info */}
            <div className="mb-6">
              <h2
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#000',
                }}
              >
                Opportunity: Blog Post
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '14px',
                  fontWeight: '400',
                  lineHeight: '1.6',
                  color: 'rgba(0, 0, 0, 0.72)',
                }}
              >
                Create a blog article that talks about which off-campus apartments are walkable to Auburn University campus, highlighting The Balcony as a premium walkable option.
              </p>
            </div>

            {/* Suggested Revisions */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#000',
                  }}
                >
                  Suggested Revisions:
                </h3>
                <div className="flex items-center gap-2">
                  {savedMessage && (
                    <span
                      className="text-green-600"
                      style={{
                        fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                        fontSize: '13px',
                        fontWeight: '500',
                      }}
                    >
                      {savedMessage}
                    </span>
                  )}
                  <button
                    onClick={handleCopyText}
                    className="flex items-center gap-2 h-[32px] px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#000',
                    }}
                  >
                    <Copy className="w-4 h-4" />
                    Copy Text
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 h-[32px] px-4 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '13px',
                      fontWeight: '500',
                    }}
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedOption('Option 1')}
                  className={`h-[32px] px-4 rounded-full transition-colors ${
                    selectedOption === 'Option 1'
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-black hover:bg-gray-300'
                  }`}
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '13px',
                    fontWeight: '500',
                  }}
                >
                  Option 1
                </button>
                <button
                  onClick={() => setSelectedOption('Compliance Audit')}
                  className={`h-[32px] px-4 rounded-full transition-colors ${
                    selectedOption === 'Compliance Audit'
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-black hover:bg-gray-300'
                  }`}
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '13px',
                    fontWeight: '500',
                  }}
                >
                  Compliance Audit
                </button>
                <button
                  className="h-[32px] px-4 rounded-full bg-gray-200 text-black hover:bg-gray-300 transition-colors"
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '13px',
                    fontWeight: '500',
                  }}
                >
                  + Add Option
                </button>
              </div>
            </div>

            {/* Article Content - ContentEditable Div (Google Doc Style with Rich Text) */}
            <div
              className="rounded-[12px] p-8"
              style={{
                background: 'rgba(0, 0, 0, 0.02)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              <div
                contentEditable
                suppressContentEditableWarning
                onInput={handleContentChange}
                dangerouslySetInnerHTML={{ __html: articleHTML }}
                className="w-full min-h-[800px] outline-none bg-transparent"
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '15px',
                  fontWeight: '400',
                  lineHeight: '1.7',
                  color: 'rgba(0, 0, 0, 0.8)',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                }}
                data-placeholder="Start typing your article here... or paste content from another source."
              />
              <style>
                {`
                  [contenteditable]:empty:before {
                    content: attr(data-placeholder);
                    color: rgba(0, 0, 0, 0.4);
                  }
                  [contenteditable] h1, [contenteditable] h2, [contenteditable] h3 {
                    font-weight: 600;
                    margin-top: 1em;
                    margin-bottom: 0.5em;
                  }
                  [contenteditable] h1 {
                    font-size: 28px;
                  }
                  [contenteditable] h2 {
                    font-size: 24px;
                  }
                  [contenteditable] h3 {
                    font-size: 20px;
                  }
                  [contenteditable] strong, [contenteditable] b {
                    font-weight: 600;
                  }
                  [contenteditable] p {
                    margin-bottom: 1em;
                  }
                `}
              </style>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-[300px] flex-shrink-0 space-y-4">
            {/* Word Count */}
            <div
              className="rounded-[12px] p-6"
              style={{
                background: 'rgba(0, 0, 0, 0.02)',
              }}
            >
              <div
                className="mb-1"
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: 'rgba(0, 0, 0, 0.64)',
                }}
              >
                Word Count
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '32px',
                  fontWeight: '600',
                  color: '#000',
                }}
              >
                {wordCount.toLocaleString()}
              </div>
            </div>

            {/* Add More Instruction */}
            <div
              className="rounded-[12px] p-6"
              style={{
                background: 'rgba(0, 0, 0, 0.02)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4" />
                <h3
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#000',
                  }}
                >
                  Add more instruction
                </h3>
              </div>
              
              <textarea
                value={additionalInstruction}
                onChange={(e) => setAdditionalInstruction(e.target.value)}
                placeholder="Additional Instruction"
                className="w-full h-[100px] p-3 border border-gray-300 rounded-lg mb-3 resize-none"
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '13px',
                }}
              />
              
              <button
                className="w-full h-[36px] rounded-lg bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '13px',
                  fontWeight: '500',
                }}
              >
                <Sparkles className="w-4 h-4" />
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HavenlyWriteArticle

