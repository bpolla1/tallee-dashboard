import talleeLogo from '@/assets/tallee-logo-full.png'
import menuIcon from '@/assets/menu-icon.svg'
import userIcon from '@/assets/user-icon.svg'
import lowesLogo from '@/assets/lowes-logo.png'

function Header() {
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

        {/* Right side: Lowes Logo + User icon */}
        <div className="flex items-center gap-4">
          <img 
            src={lowesLogo} 
            alt="Lowe's" 
            className="h-[24px] w-auto object-contain"
          />
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