import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { ArrowLeft, Copy, Play, Edit } from 'lucide-react'
import Header from '../components/Header'

// Hardcoded article content - will be replaced with API data later
const articleContent = {
  title: "How to Choose the Right Refrigerator for Your Home",
  introduction: "Choosing the right refrigerator for your home involves considering several key factors, from size and style to energy efficiency and smart features. This guide will help you make an informed decision that fits your lifestyle and kitchen space.",
  sections: [
    {
      heading: "This Start With the Right Refrigerator",
      subsections: [
        {
          subheading: "French Door Refrigerators:",
          content: "French door refrigerators offer a spacious design with the freezer on the bottom and two side-by-side refrigerator doors on top. They're ideal for families who need plenty of fresh food storage and prefer easy access to frequently used items."
        },
        {
          subheading: "Side by Side Refrigerators:",
          content: "Side by side models feature vertical split design with the refrigerator on one side and freezer on the other. These are perfect for narrow kitchen spaces and offer excellent organization with multiple shelves and compartments."
        },
        {
          subheading: "Top Freezer and Bottom Freezer Models:",
          content: "Traditional top freezer models are budget-friendly and energy-efficient, while bottom freezer models place fresh food at eye level for easier access. Both options provide reliable performance and straightforward operation."
        },
        {
          subheading: "Counter Depth Refrigerators:",
          content: "Counter depth refrigerators are designed to align with your kitchen cabinets for a seamless, built-in look. They offer a streamlined appearance while still providing ample storage space for most households."
        },
        {
          subheading: "Measure Carefully:",
          content: "Before purchasing, measure your kitchen space including width, depth, and height. Ensure there's adequate clearance for door swing and ventilation. Consider the path from your entryway to the installation location."
        },
        {
          subheading: "Energy Efficiency Matters:",
          content: "Look for ENERGY STAR certified models that use less electricity and help reduce your utility bills. Modern refrigerators are significantly more efficient than older models, saving you money over time."
        },
        {
          subheading: "Smart Features That Improve Daily Life:",
          content: "Many modern refrigerators include Wi-Fi connectivity, touchscreen displays, and app integration. These features allow you to control temperature settings remotely, track expiration dates, and even view the interior via smartphone cameras."
        },
        {
          subheading: "Finish and Design Options",
          content: "Refrigerators come in various finishes including stainless steel, black stainless, white, and custom panel-ready options. Choose a finish that complements your kitchen's aesthetic and is easy to maintain."
        },
        {
          subheading: "Delivery and Installation Made Easy",
          content: "Professional delivery and installation services ensure your new refrigerator is properly set up, leveled, and connected. Many retailers offer haul-away of old appliances and extended warranty options for peace of mind."
        }
      ]
    },
    {
      heading: "Why Buy Your Refrigerator From Lowe's",
      content: [
        "Lowe's offers an extensive selection of refrigerators from top brands like Samsung, LG, Whirlpool, GE, and Frigidaire. With both in-store and online shopping options, you can compare models, read reviews, and find the perfect refrigerator for your needs.",
        "Our expert staff can help you navigate the buying process, answer questions about features and specifications, and ensure you choose a model that fits your space and lifestyle. Plus, with competitive pricing, flexible financing options, and comprehensive warranty coverage, Lowe's makes it easy to bring home the right refrigerator."
      ]
    }
  ],
  sources: [
    "https://www.energystar.gov",
    "https://www.consumerreports.org",
    "https://www.lowes.com"
  ],
  wordCount: 598,
  impactScore: 9,
  metaTitle: "The Ultimate Guide to Choosing the Right Refrigerator for Your Home",
  metaDescription: "Discover how to choose the perfect refrigerator for your home with our comprehensive guide. Learn about different styles, features, and energy efficiency options to make an informed decision.",
  slug: "morbi-dapibus-ante-eget-tempor-mollis",
  links: [
    { label: "P3", url: "https://www.energystar.gov" },
    { label: "P7", url: "https://www.consumerreports.org" },
    { label: "P9", url: "https://www.lowes.com" }
  ],
  aiLearningSources: [
    "https://www.lowes.com"
  ]
}

function ViewArticle() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const contentRef = useRef<HTMLDivElement>(null)
  const [selectedTab, setSelectedTab] = useState<'info' | 'schema'>('info')
  const [additionalInstruction, setAdditionalInstruction] = useState('')
  const [schemaCode, setSchemaCode] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [savedMessage, setSavedMessage] = useState('')

  // Determine account from current path
  const account = location.pathname.startsWith('/havenly') ? 'havenly' : 'lowes'

  // Convert article content to HTML
  const articleToHTML = () => {
    let html = `<h2 style="font-family: var(--font-heading, 'Sequel Sans VF Head', Inter, sans-serif); font-size: 28px; font-weight: 370; line-height: 160%; color: #000; margin-bottom: 24px;">${articleContent.title}</h2>`
    
    html += `<p style="font-family: var(--font-heading, 'Sequel Sans VF Head', Inter, sans-serif); font-size: 15px; font-weight: 400; line-height: 1.6; color: #000; letter-spacing: -0.15px; margin-bottom: 32px;">${articleContent.introduction}</p>`
    
    articleContent.sections.forEach(section => {
      html += `<div style="margin-bottom: 32px;">`
      html += `<h3 style="font-family: var(--font-heading, 'Sequel Sans VF Head', Inter, sans-serif); font-size: 18px; font-weight: 600; line-height: 1.3; color: #000; letter-spacing: -0.18px; margin-bottom: 16px;">${section.heading}</h3>`
      
      if (section.subsections) {
        section.subsections.forEach(subsection => {
          html += `<div style="margin-bottom: 16px;">`
          html += `<h4 style="font-family: var(--font-heading, 'Sequel Sans VF Head', Inter, sans-serif); font-size: 16px; font-weight: 600; line-height: 1.3; color: #000; letter-spacing: -0.16px; margin-bottom: 8px;">${subsection.subheading}</h4>`
          html += `<p style="font-family: var(--font-heading, 'Sequel Sans VF Head', Inter, sans-serif); font-size: 15px; font-weight: 400; line-height: 1.6; color: #000; letter-spacing: -0.15px;">${subsection.content}</p>`
          html += `</div>`
        })
      } else if (section.content) {
        section.content.forEach(paragraph => {
          html += `<p style="font-family: var(--font-heading, 'Sequel Sans VF Head', Inter, sans-serif); font-size: 15px; font-weight: 400; line-height: 1.6; color: #000; letter-spacing: -0.15px; margin-bottom: 12px;">${paragraph}</p>`
        })
      }
      
      html += `</div>`
    })
    
    html += `<div style="padding-top: 24px; border-top: 1px solid rgba(0, 0, 0, 0.1); margin-top: 32px;">`
    html += `<h3 style="font-family: var(--font-heading, 'Sequel Sans VF Head', Inter, sans-serif); font-size: 14px; font-weight: 600; line-height: 1.2; color: #000; letter-spacing: -0.14px; margin-bottom: 12px;">Sources:</h3>`
    html += `<div style="display: flex; flex-direction: column; gap: 8px;">`
    articleContent.sources.forEach((source, index) => {
      html += `<div><a href="${source}" target="_blank" rel="noopener noreferrer" style="font-family: var(--font-heading, 'Sequel Sans VF Head', Inter, sans-serif); font-size: 14px; font-weight: 400; line-height: 1.5; color: #000; letter-spacing: -0.14px; text-decoration: underline;">${index + 1}. ${source}</a></div>`
    })
    html += `</div></div>`
    
    return html
  }

  // Load saved content from localStorage or use default
  const [articleHTML, setArticleHTML] = useState<string>(() => {
    const saved = localStorage.getItem(`view-article-${id}`)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return articleToHTML()
      }
    }
    return articleToHTML()
  })

  // Load saved schema code from localStorage
  useEffect(() => {
    const savedSchema = localStorage.getItem(`view-article-schema-${id}`)
    if (savedSchema) {
      try {
        setSchemaCode(JSON.parse(savedSchema))
      } catch {
        // Ignore parse errors
      }
    }
  }, [id])

  // Initialize content on mount only
  useEffect(() => {
    if (contentRef.current && !contentRef.current.hasAttribute('data-initialized')) {
      contentRef.current.innerHTML = articleHTML
      contentRef.current.setAttribute('data-initialized', 'true')
    }
  }, [])

  // Calculate word count from HTML content
  const getTextContent = (html: string) => {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  const [wordCount, setWordCount] = useState(() => {
    const text = getTextContent(articleHTML)
    return text.split(/\s+/).filter(word => word.length > 0).length
  })

  // Update word count when content changes
  useEffect(() => {
    const text = getTextContent(articleHTML)
    const count = text.split(/\s+/).filter(word => word.length > 0).length
    setWordCount(count)
  }, [articleHTML])

  const handleCopyText = () => {
    const textContent = getTextContent(articleHTML)
    navigator.clipboard.writeText(textContent)
    // TODO: Show toast notification
  }

  const handleSave = () => {
    setIsSaving(true)
    // Save to localStorage
    localStorage.setItem(`view-article-${id}`, JSON.stringify(articleHTML))
    
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

  const handleGenerate = () => {
    console.log('Generate with instruction:', additionalInstruction)
    // TODO: Implement generation logic
  }

  const handleCopySchema = () => {
    navigator.clipboard.writeText(schemaCode)
    setSavedMessage('Copied!')
    setTimeout(() => setSavedMessage(''), 2000)
  }

  const handleSchemaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value
    setSchemaCode(newCode)
    // Auto-save to localStorage
    localStorage.setItem(`view-article-schema-${id}`, JSON.stringify(newCode))
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
            <div className="mb-[24px]">
              <h1 
                className="mb-[8px]"
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
              <h2 
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '20px',
                  fontWeight: '400',
                  lineHeight: '1.2',
                  color: '#000',
                  letterSpacing: '-0.2px',
                }}
              >
                {articleContent.title}
              </h2>
            </div>

            {/* Suggested Content Label */}
            <div className="mb-[12px]">
              <h3 
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '16px',
                  fontWeight: '600',
                  lineHeight: '1.2',
                  color: '#000',
                  letterSpacing: '-0.16px',
                }}
              >
                Suggested Content
              </h3>
            </div>

            {/* Suggested Content Section */}
            <div 
              className="p-[30px] rounded-[18px] relative"
              style={{
                background: 'rgba(0, 0, 0, 0.02)',
                border: '1px solid rgba(0, 0, 0, 0.04)',
              }}
            >
              {/* Copy Text and Save Buttons - Top Right */}
              <div className="absolute top-[30px] right-[30px] flex items-center gap-[8px]">
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
                <button
                  onClick={handleSave}
                  className="flex items-center gap-[8px] h-[36px] px-[16px] rounded-full transition-colors border border-black"
                  style={{
                    backgroundColor: isSaving ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '13.5px',
                    fontWeight: '365',
                    lineHeight: '1.2',
                    color: '#000',
                    letterSpacing: '-0.135px',
                  }}
                >
                  {savedMessage || (isSaving ? 'Saving...' : 'Save')}
                </button>
              </div>

              {/* Editable Content */}
              <div
                ref={contentRef}
                contentEditable={true}
                onInput={handleContentChange}
                className="focus:outline-none"
                style={{
                  fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                  fontSize: '15px',
                  fontWeight: '400',
                  lineHeight: '1.6',
                  color: '#000',
                  letterSpacing: '-0.15px',
                  minHeight: '200px',
                }}
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-[32px]">
            {/* Impact Score */}
            <div>
              <div className="flex items-center justify-between mb-[8px]">
                <h3 
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '14px',
                    fontWeight: '365',
                    lineHeight: '1.2',
                    color: 'rgba(0, 0, 0, 0.64)',
                    letterSpacing: '-0.14px',
                  }}
                >
                  Impact Score
                </h3>
                <span 
                  style={{
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '14px',
                    fontWeight: '600',
                    lineHeight: '1.2',
                    color: '#000',
                    letterSpacing: '-0.14px',
                  }}
                >
                  {articleContent.impactScore}%
                </span>
              </div>
              <div 
                className="h-[8px] rounded-full overflow-hidden"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <div 
                  className="h-full rounded-full"
                  style={{
                    width: `${articleContent.impactScore}%`,
                    backgroundColor: '#0BC762',
                  }}
                />
              </div>
            </div>

            {/* Add more instruction - Only show on Info tab */}
            {selectedTab === 'info' && (
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
            )}

            {/* Copy button for Schema tab */}
            {selectedTab === 'schema' && (
              <div>
                <button
                  onClick={handleCopySchema}
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
                  <Copy className="w-[14px] h-[14px]" fill="white" />
                  <span>{savedMessage || 'Copy'}</span>
                </button>
              </div>
            )}

            {/* Tabs */}
            <div>
              <div className="flex items-center gap-[8px] mb-[24px]">
                <button
                  onClick={() => setSelectedTab('info')}
                  className="px-[16px] py-[8px] rounded-full transition-colors"
                  style={{
                    backgroundColor: selectedTab === 'info' ? '#000' : 'transparent',
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '14px',
                    fontWeight: '365',
                    lineHeight: '1.2',
                    color: selectedTab === 'info' ? '#fff' : '#000',
                    letterSpacing: '-0.14px',
                  }}
                >
                  Info
                </button>
                <button
                  onClick={() => setSelectedTab('schema')}
                  className="px-[16px] py-[8px] rounded-full transition-colors"
                  style={{
                    backgroundColor: selectedTab === 'schema' ? '#000' : 'transparent',
                    fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                    fontSize: '14px',
                    fontWeight: '365',
                    lineHeight: '1.2',
                    color: selectedTab === 'schema' ? '#fff' : '#000',
                    letterSpacing: '-0.14px',
                  }}
                >
                  Schema
                </button>
              </div>

              {selectedTab === 'info' && (
                <div className="space-y-[24px]">
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
                      {wordCount.toLocaleString()}
                    </p>
                  </div>

                  {/* Title */}
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
                      Title
                    </h3>
                    <p 
                      style={{
                        fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                        fontSize: '15px',
                        fontWeight: '400',
                        lineHeight: '1.4',
                        color: '#000',
                        letterSpacing: '-0.15px',
                      }}
                    >
                      {articleContent.metaTitle}
                    </p>
                  </div>

                  {/* Meta Description */}
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
                      Meta Description
                    </h3>
                    <p 
                      style={{
                        fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                        fontSize: '15px',
                        fontWeight: '400',
                        lineHeight: '1.4',
                        color: '#000',
                        letterSpacing: '-0.15px',
                      }}
                    >
                      {articleContent.metaDescription}
                    </p>
                  </div>

                  {/* Slug */}
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
                      Slug
                    </h3>
                    <p 
                      style={{
                        fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                        fontSize: '15px',
                        fontWeight: '400',
                        lineHeight: '1.4',
                        color: '#000',
                        letterSpacing: '-0.15px',
                      }}
                    >
                      {articleContent.slug}
                    </p>
                  </div>

                  {/* Links */}
                  <div>
                    <h3 
                      className="mb-[12px]"
                      style={{
                        fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                        fontSize: '14px',
                        fontWeight: '365',
                        lineHeight: '1.2',
                        color: 'rgba(0, 0, 0, 0.64)',
                        letterSpacing: '-0.14px',
                      }}
                    >
                      Links
                    </h3>
                    <div className="space-y-[12px]">
                      {articleContent.links.map((link, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-[8px]">
                            <span 
                              style={{
                                fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                                fontSize: '14px',
                                fontWeight: '600',
                                lineHeight: '1.2',
                                color: '#000',
                                letterSpacing: '-0.14px',
                              }}
                            >
                              {link.label}
                            </span>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:opacity-70 transition-opacity"
                              style={{
                                fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                                fontSize: '14px',
                                fontWeight: '400',
                                lineHeight: '1.2',
                                color: '#000',
                                letterSpacing: '-0.14px',
                                textDecoration: 'underline',
                              }}
                            >
                              {link.url}
                            </a>
                          </div>
                          <button
                            className="p-[4px] hover:opacity-70 transition-opacity"
                            aria-label="Edit link"
                          >
                            <Edit className="w-[14px] h-[14px]" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Learning Sources */}
                  <div>
                    <h3 
                      className="mb-[12px]"
                      style={{
                        fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                        fontSize: '14px',
                        fontWeight: '365',
                        lineHeight: '1.2',
                        color: 'rgba(0, 0, 0, 0.64)',
                        letterSpacing: '-0.14px',
                      }}
                    >
                      AI Learning Sources
                    </h3>
                    <div className="space-y-[8px]">
                      {articleContent.aiLearningSources.map((source, index) => (
                        <a
                          key={index}
                          href={source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-70 transition-opacity block"
                          style={{
                            fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                            fontSize: '14px',
                            fontWeight: '400',
                            lineHeight: '1.4',
                            color: '#000',
                            letterSpacing: '-0.14px',
                            textDecoration: 'underline',
                          }}
                        >
                          {source}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'schema' && (
                <div>
                  <textarea
                    value={schemaCode}
                    onChange={handleSchemaChange}
                    placeholder="Paste your schema code here..."
                    className="w-full px-[16px] py-[12px] rounded-[9px] border resize-none focus:outline-none font-mono"
                    style={{
                      fontFamily: 'monospace, "Courier New", Courier, monospace',
                      fontSize: '13px',
                      fontWeight: '400',
                      lineHeight: '1.5',
                      color: '#d4d4d4',
                      letterSpacing: '0',
                      backgroundColor: '#1e1e1e',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      width: '100%',
                      aspectRatio: '1',
                      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                    }}
                  />
                  <style>{`
                    textarea::placeholder {
                      color: rgba(212, 212, 212, 0.5);
                    }
                  `}</style>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewArticle
