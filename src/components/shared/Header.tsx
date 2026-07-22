/* import { Clock, Moon, Sun, TrendingUp, Wallet } from 'lucide-react' */

import { useNavigate } from 'react-router-dom';
import { Clock, TrendingUp, Wallet } from 'lucide-react'
import Button from './Button';





const Header = () => {
  const navigate = useNavigate();

  
  return ( 
    <header className="border-b border-(--border) px-6 py-3">
      <nav className="flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full">
            <Wallet size={20} className="text-primary-foreground" />
          </div>
          <span className="text-lg">
            <span className="text-muted-foreground font-medium">Poket</span>
            <span className="font-extrabold">.mentor</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="secondary"
            icon={TrendingUp}
            onClick={() => void navigate('/')}
          >
            <span className="hidden sm:inline">New Simulation</span>
          </Button>

          <Button
            variant="ghost"
            icon={Clock}
            onClick={() => void navigate('/historico')}
          >
            <span className="hidden sm:inline">History</span>
          </Button>

        </div>
      </nav>
    </header>
   );
}
 
export default Header;

