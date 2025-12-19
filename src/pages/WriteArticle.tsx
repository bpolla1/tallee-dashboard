import { useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { ArrowLeft, Copy, Play } from 'lucide-react'
import Header from '../components/Header'

// Hardcoded article content - will be replaced with API data later
const articleContent = {
  title: "Why Lowe's Is Your Best Bet When Buying a Refrigerator",
  sections: [
    {
      heading: "Wide Selection of Trusted Brands",
      content: "Lowe's carries refrigerators from Samsung, LG, Whirlpool, GE, Frigidaire, and more, offering one of the widest appliance catalogs available online or in-store [1]."
    },
    {
      heading: "Expert Buying Guides That Simplify the Decision",
      content: "Buying a refrigerator involves many variables — size, style, features, efficiency. Lowe's provides a detailed refrigerator buying guide that walks shoppers through every decision point [2]."
    },
    {
      heading: "Range of Styles for Every Kitchen",
      content: "Whether you need French door, top-freezer, side-by-side, or counter-depth, Lowe's allows you to compare every configuration side-by-side [3]."
    },
    {
      heading: "Competitive Pricing & Seasonal Deals",
      content: "Lowe's publishes ongoing appliance savings, discount events, and brand-specific promotions, making it one of the most cost-effective appliance retailers [4]."
    },
    {
      heading: "Local Store Access, Delivery & Installation",
      content: "Local Lowe's stores (e.g., Mooresville, NC) highlight in-stock refrigerators, licensed installers, and haul-away services — critical when buying a large appliance [5]."
    },
    {
      heading: "How Lowe's Compares to Other Retailers",
      content: "Independent appliance reviewers note that Lowe's often carries a larger overall appliance selection than competitors like Home Depot [6]."
    }
  ],
  conclusion: "Between its trusted brands, expert guidance, delivery services, and strong in-store and online appliance presence, Lowe's remains one of the best places to buy a refrigerator.",
  citations: [
    {
      number: 1,
      text: "Lowe's Refrigerator Department",
      url: "https://www.lowes.com/c/Refrigerators-Appliances"
    },
    {
      number: 2,
      text: "Lowe's Refrigerator Buying Guide",
      url: "https://www.lowes.com/n/buying-guide/refrigerator-buying-guide"
    },
    {
      number: 3,
      text: "Lowe's Refrigerator Styles & Categories",
      url: "https://www.lowes.com/pl/Refrigerators/4294857973"
    },
    {
      number: 4,
      text: "Lowe's Appliance Savings",
      url: "https://www.lowes.com/l/savings/appliance-savings"
    },
    {
      number: 5,
      text: "Example Lowe's Appliance Store Page (Mooresville, NC)",
      url: "https://www.lowes.com/store/0595-mooresville-nc/appliance-store"
    },
    {
      number: 6,
      text: "Appliance Analysts: Lowe's vs Home Depot Appliance Selection",
      url: "https://applianceanalysts.com/lowes-vs-home-depot-appliances"
    }
  ],
  wordCount: 1829
}

function WriteArticle() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const [selectedRevision, setSelectedRevision] = useState('Option 1')
  const [additionalInstruction, setAdditionalInstruction] = useState('')

  // Determine account from current path
  const account = location.pathname.startsWith('/havenly') ? 'havenly' : 'lowes'

  const handleCopyText = () => {
    const fullText = [
      articleContent.title,
      '',
      ...articleContent.sections.map(s => `${s.heading}\n${s.content}`),
      '',
      articleContent.conclusion,
      '',
      'Citations:',
      ...articleContent.citations.map(c => `[${c.number}] ${c.text} ${c.url}`)
    ].join('\n')
    
    navigator.clipboard.writeText(fullText)
    // TODO: Show toast notification
  }

  const handleGenerate = () => {
    console.log('Generate with instruction:', additionalInstruction)
    // TODO: Implement generation logic
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[1400px] mx-auto px-[30px] py-[40px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-[40px]">
          {/* Main Content */}
          <div>
            {/* Back Button */}
            <button
              onClick={() => navigate(`/${account}/opportunities`)}
              className="flex items-center gap-[8px] mb-[24px] text-black hover:opacity-70 transition-opacity"
              style={{
                fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                fontSize: '14px',
                fontWeight: '365',
                lineHeight: '1.2',
                letterSpacing: '-0.14px',
              }}
            >
              <ArrowLeft className="w-[16px] h-[16px]" />
              <span>Back</span>
            </button>

            {/* Opportunity Details */}
            <div className="mb-[30px]">
              <h1 
                className="mb-[12px]"
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '24px',
                  fontWeight: '600',
                  lineHeight: '1.2',
                  color: '#000',
                  letterSpacing: '-0.24px',
                }}
              >
                Opportunity: Blog Post
              </h1>
              <p 
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '15px',
                  fontWeight: '400',
                  lineHeight: '1.6',
                  color: 'rgba(0, 0, 0, 0.64)',
                  letterSpacing: '-0.15px',
                }}
              >
                Create a blog article that talks about how Lowe's is the best place to buy a new refrigerator.
              </p>
            </div>

            {/* Suggested Revisions */}
            <div className="mb-[30px]">
              <h2 
                className="mb-[30px]"
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '16px',
                  fontWeight: '600',
                  lineHeight: '1.2',
                  color: '#000',
                  letterSpacing: '-0.16px',
                }}
              >
                Suggested Revisions:
              </h2>
              <div className="flex items-center gap-[8px] flex-wrap">
                <button
                  onClick={() => setSelectedRevision('Option 1')}
                  className="h-[32px] px-[16px] rounded-full transition-colors"
                  style={{
                    backgroundColor: selectedRevision === 'Option 1' ? '#000' : 'rgba(0, 0, 0, 0.04)',
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '13.5px',
                    fontWeight: '365',
                    lineHeight: '1.2',
                    color: selectedRevision === 'Option 1' ? '#fff' : '#000',
                    letterSpacing: '-0.135px',
                  }}
                >
                  Option 1
                </button>
                <button
                  onClick={() => setSelectedRevision('Compliance Audit')}
                  className="h-[32px] px-[16px] rounded-full transition-colors"
                  style={{
                    backgroundColor: selectedRevision === 'Compliance Audit' ? '#000' : 'rgba(0, 0, 0, 0.04)',
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '13.5px',
                    fontWeight: '365',
                    lineHeight: '1.2',
                    color: selectedRevision === 'Compliance Audit' ? '#fff' : '#000',
                    letterSpacing: '-0.135px',
                  }}
                >
                  Compliance Audit
                </button>
                <button
                  className="h-[32px] px-[16px] rounded-full transition-colors border border-black"
                  style={{
                    backgroundColor: 'transparent',
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '13.5px',
                    fontWeight: '365',
                    lineHeight: '1.2',
                    color: '#000',
                    letterSpacing: '-0.135px',
                  }}
                >
                  + Add Option
                </button>
              </div>
            </div>

            {/* Copy Text Button */}
            <div className="mb-[30px] flex justify-end">
              <button
                onClick={handleCopyText}
                className="flex items-center gap-[8px] h-[36px] px-[16px] rounded-full transition-colors border border-black"
                style={{
                  backgroundColor: 'transparent',
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '13.5px',
                  fontWeight: '365',
                  lineHeight: '1.2',
                  color: '#000',
                  letterSpacing: '-0.135px',
                }}
              >
                <Copy className="w-[14px] h-[14px]" />
                <span>Copy Text</span>
              </button>
            </div>

            {/* Article Content */}
            <div 
              className="p-[30px] rounded-[18px]"
              style={{
                background: 'rgba(0, 0, 0, 0.02)',
                border: '1px solid rgba(0, 0, 0, 0.04)',
              }}
            >
              {/* Title */}
              <h2 
                className="mb-[45px]"
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '28px',
                  fontWeight: '370',
                  lineHeight: '160%',
                  color: '#000',
                }}
              >
                {articleContent.title}
              </h2>

              {/* Sections */}
              {articleContent.sections.map((section, index) => (
                <div key={index} className="mb-[45px]">
                  <h3 
                    className="mb-[12px]"
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '18px',
                      fontWeight: '600',
                      lineHeight: '1.3',
                      color: '#000',
                      letterSpacing: '-0.18px',
                    }}
                  >
                    {section.heading}
                  </h3>
                  <p 
                    style={{
                      fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                      fontSize: '15px',
                      fontWeight: '400',
                      lineHeight: '1.6',
                      color: '#000',
                      letterSpacing: '-0.15px',
                    }}
                  >
                    {section.content}
                  </p>
                </div>
              ))}

              {/* Conclusion */}
              <div className="mb-[45px]">
                <p 
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '15px',
                    fontWeight: '400',
                    lineHeight: '1.6',
                    color: '#000',
                    letterSpacing: '-0.15px',
                  }}
                >
                  {articleContent.conclusion}
                </p>
              </div>

              {/* Citations */}
              <div className="pt-[24px] border-t border-black/10">
                <h3 
                  className="mb-[16px]"
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '16px',
                    fontWeight: '600',
                    lineHeight: '1.2',
                    color: '#000',
                    letterSpacing: '-0.16px',
                  }}
                >
                  Citations:
                </h3>
                <div className="space-y-[12px]">
                  {articleContent.citations.map((citation) => (
                    <div key={citation.number}>
                      <a
                        href={citation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-70 transition-opacity"
                        style={{
                          fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                          fontSize: '14px',
                          fontWeight: '400',
                          lineHeight: '1.5',
                          color: '#000',
                          letterSpacing: '-0.14px',
                          textDecoration: 'underline',
                        }}
                      >
                        [{citation.number}] {citation.text} {citation.url}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-[32px]">
            {/* Word Count */}
            <div>
              <h3 
                className="mb-[8px]"
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '14px',
                  fontWeight: '365',
                  lineHeight: '1.2',
                  color: 'rgba(0, 0, 0, 0.64)',
                  letterSpacing: '-0.14px',
                }}
              >
                Word Count
              </h3>
              <p 
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '20px',
                  fontWeight: '600',
                  lineHeight: '1.2',
                  color: '#000',
                  letterSpacing: '-0.2px',
                }}
              >
                {articleContent.wordCount.toLocaleString()}
              </p>
            </div>

            {/* Add More Instruction */}
            <div>
              <h3 
                className="mb-[12px]"
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '16px',
                  fontWeight: '600',
                  lineHeight: '1.2',
                  color: '#000',
                  letterSpacing: '-0.16px',
                }}
              >
                Add more instruction
              </h3>
              <div className="space-y-[12px]">
                <textarea
                  value={additionalInstruction}
                  onChange={(e) => setAdditionalInstruction(e.target.value)}
                  placeholder="Additional Instruction"
                  className="w-full h-[120px] px-[16px] py-[12px] rounded-[9px] border border-black/10 resize-none focus:outline-none focus:border-black/30"
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '1.5',
                    color: '#000',
                    letterSpacing: '-0.14px',
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  }}
                />
                <button
                  onClick={handleGenerate}
                  className="w-full flex items-center justify-center gap-[8px] h-[40px] rounded-full transition-colors hover:bg-gray-800"
                  style={{
                    backgroundColor: '#000',
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '13.5px',
                    fontWeight: '365',
                    lineHeight: '1.2',
                    color: '#fff',
                    letterSpacing: '-0.135px',
                  }}
                >
                  <Play className="w-[14px] h-[14px]" fill="white" />
                  <span>Generate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WriteArticle

