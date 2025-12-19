import talleeLogo from '@/assets/tallee-logo-full.png'
import menuIcon from '@/assets/menu-icon.svg'
import userIcon from '@/assets/user-icon.svg'
import lowesLogo from '@/assets/lowes-logo.png'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  account?: 'lowes' | 'havenly'
}

function Header({ account = 'lowes' }: HeaderProps) {
  const navigate = useNavigate()
  
  return (
    <header 
      className="sticky top-0 z-30 flex h-[45px] items-center border-b border-black/5"
      style={{
        background: 'rgba(250, 249, 240, 0.75)',
        backdropFilter: 'blur(22.5px)',
      }}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-9">
        {/* Left side: Logo + Menu */}
        <div className="flex items-center gap-4">
          <img 
            src={talleeLogo} 
            alt="Tallee" 
            className="h-[15px]"
            style={{ width: '64.032px', aspectRatio: '64.03/15.00' }}
          />
          {/* Hamburger menu button */}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center transition-colors"
            aria-label="Open navigation"
            style={{
              gap: '6px',
              borderRadius: '200px'
            }}
          >
            <img src={menuIcon} alt="" className="h-[15px] w-[15px]" />
          </button>
        </div>

        {/* Right side: Business Name or Logo + User icon */}
        <div className="flex items-center gap-4">
          {account === 'havenly' ? (
            <button
              onClick={() => navigate('/havenly/dashboard')}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Go to dashboard"
              style={{
                fontFamily: 'var(--font-heading, "Sequel Sans VF Head", Inter, sans-serif)',
                fontSize: '14px',
                fontWeight: '500',
                color: '#000',
                letterSpacing: '-0.14px',
              }}
            >
              Business Name
            </button>
          ) : (
            <button 
              onClick={() => navigate('/lowes/dashboard')}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Go to dashboard"
            >
              <img 
                src={lowesLogo} 
                alt="Lowe's" 
                className="h-[24px] w-auto object-contain"
              />
            </button>
          )}
          <div 
            className="flex h-9 w-9 items-center justify-center"
            style={{
              gap: '6px',
              borderRadius: '200px'
            }}
          >
            <img src={userIcon} alt="" className="h-[12px] w-[12px]" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header