import { Clock, Moon, Sun, TrendingUp, Wallet } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { Button } from './Button'
import { Divider } from './Divider'

export function Header() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="border-b border-(--border) px-3 py-3 sm:px-6">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full">
            <Wallet size={20} className="text-primary-foreground" />
          </div>
          <span className="hidden text-lg min-[360px]:inline">
            <span className="text-muted-foreground font-medium">Poket</span>
            <span className="font-extrabold">.mentor</span>
          </span>
        </div>

        {/* Actions Buttons */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            aria-label="Criar nova simulação"
            variant="secondary"
            icon={TrendingUp}
            className="max-sm:px-2.5"
            onClick={() => void navigate('/')}
          >
            <span className="hidden sm:inline">Nova Simulação</span>
          </Button>
          <Button
            type="button"
            aria-label="Abrir histórico de simulações"
            variant="ghost"
            icon={Clock}
            className="max-sm:px-2.5"
            onClick={() => void navigate('/historico')}
          >
            <span className="hidden sm:inline">Histórico</span>
          </Button>
          <Divider orientation="vertical" />
          <Button
            type="button"
            aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
            variant="ghost"
            icon={theme === 'light' ? Moon : Sun}
            className="max-sm:px-2.5"
            onClick={toggleTheme}
          />
        </div>
      </nav>
    </header>
  )
}
