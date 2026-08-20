import { ExternalLink, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../components/shared/Button'
import { PageHero } from '../components/shared/PageHero'
import type { SimulationRecord } from '../data/simulation'
import { useSimulationStorage } from '../hooks/useSimulationStorage'
import {
  calcMonthlySavingsNeeded,
  calculateFeasibility,
} from '../utils/simulation'

const statusLabels = {
  viable: 'Meta viável',
  needs_adjustment: 'Precisa de ajustes',
  unfeasible: 'Não viável nas condições atuais',
}

export function SimulationHistoryPage() {
  const navigate = useNavigate()
  const { getAllSimulations, deleteSimulation, clearSimulations } =
    useSimulationStorage()
  const [simulations, setSimulations] = useState<SimulationRecord[]>(() =>
    getAllSimulations(),
  )

  const handleDelete = (id: string) => {
    deleteSimulation(id)
    setSimulations((current) =>
      current.filter((simulation) => simulation.id !== id),
    )
  }

  const handleClear = () => {
    if (!window.confirm('Deseja excluir todas as simulações salvas?')) {
      return
    }

    clearSimulations()
    setSimulations([])
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        subtitle="Revise suas metas e compare diferentes cenários financeiros."
      />

      {simulations.length === 0 ? (
        <div className="bg-card rounded-2xl p-8 text-center shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
          <p className="text-muted-foreground mb-5">
            Você ainda não possui simulações salvas.
          </p>
          <Button variant="primary" onClick={() => void navigate('/')}>
            Criar primeira simulação
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-5 flex justify-end">
            <Button variant="ghost" icon={Trash2} onClick={handleClear}>
              Limpar histórico
            </Button>
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {simulations.map((simulation) => {
              const status = calculateFeasibility(simulation)
              const monthlyNeeded = calcMonthlySavingsNeeded(simulation)
              const createdAt = simulation.createdAt
                ? new Date(simulation.createdAt).toLocaleDateString('pt-BR')
                : 'Data não registrada'

              return (
                <li
                  key={simulation.id}
                  className="bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]"
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-muted-foreground text-xs">
                        {createdAt}
                      </p>
                      <h2 className="text-foreground mt-1 text-xl font-semibold">
                        {simulation.goalName}
                      </h2>
                    </div>
                    <span className="bg-muted-primary text-foreground rounded-full px-3 py-1 text-xs font-medium">
                      {statusLabels[status]}
                    </span>
                  </div>
                  <dl className="text-muted-foreground mb-5 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt>Custo</dt>
                      <dd className="text-foreground font-semibold">
                        R$ {simulation.goalAmount}
                      </dd>
                    </div>
                    <div>
                      <dt>Prazo</dt>
                      <dd className="text-foreground font-semibold">
                        {simulation.goalDeadline} meses
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt>Economia mensal necessária</dt>
                      <dd className="text-foreground font-semibold">
                        R${' '}
                        {monthlyNeeded.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </dd>
                    </div>
                  </dl>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="primary"
                      icon={ExternalLink}
                      onClick={() =>
                        void navigate(`/resultado/${simulation.id}`)
                      }
                    >
                      Abrir resultado
                    </Button>
                    <Button
                      variant="ghost"
                      icon={Trash2}
                      onClick={() => handleDelete(simulation.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </main>
  )
}
