import { Clock, Moon, Sun, TrendingUp, Wallet } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { useTheme } from '../hooks/useTheme'
import Button from './Button'
import { Divider } from './Divider'

const Header = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="border-b border-border px-6 py-3">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <Wallet size={20} className="text-primary-foreground" />
          </div>
          <span className="text-lg">
            <span className="font-medium text-muted-foreground">Poket</span>
            <span className="font-extrabold">.mentor</span>
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="secondary" icon={TrendingUp} onClick={() => void navigate('/')}>
            <span className="hidden sm:inline">New Simulation</span>
          </Button>

          <Button variant="ghost" icon={Clock} onClick={() => void navigate('/history')}>
            <span className="hidden sm:inline">History</span>
          </Button>

          <Divider orientation="vertical" />

          <Button
            aria-label={`Change theme ${theme === 'light' ? 'dark' : 'light'}`}
            variant="ghost"
            icon={theme === 'light' ? Moon : Sun}
            onClick={toggleTheme}
          />
        </div>
      </nav>
    </header>
  )
}

export default Header
