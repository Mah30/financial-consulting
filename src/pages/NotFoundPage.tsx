import { useNavigate } from 'react-router-dom'

import { Button } from '../components/shared/Button'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="text-primary text-sm font-semibold tracking-widest uppercase">
        Erro 404
      </p>
      <h1 className="text-foreground mt-2 text-3xl font-bold">
        Página não encontrada
      </h1>
      <p className="text-muted-foreground mt-3 mb-6">
        O endereço informado não existe ou a página foi movida.
      </p>
      <Button variant="primary" onClick={() => void navigate('/')}>
        Voltar ao início
      </Button>
    </main>
  )
}
