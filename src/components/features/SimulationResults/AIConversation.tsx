import { LoaderCircle, MessageCircle, Send } from 'lucide-react'
import { type FormEvent, useEffect, useRef, useState } from 'react'

import { useConversation } from '../../../hooks/useConversation'
import { Button } from '../../shared/Button'

interface AIConversationProps {
  simulationId: string
}

function MessageHeader({ children }: { children: string }) {
  return (
    <div className="text-foreground mb-1.5 flex items-center gap-2 text-sm font-semibold">
      <span className="bg-muted-primary flex size-7 items-center justify-center rounded-full">
        <MessageCircle aria-hidden="true" size={15} />
      </span>
      <span>{children}</span>
    </div>
  )
}

function AnswerText({ children }: { children: string }) {
  const parts = children.split(/(\*\*[^*]+\*\*)/g)

  return (
    <p className="text-muted-foreground ml-9 text-sm leading-relaxed whitespace-pre-wrap">
      {parts.map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index} className="text-foreground font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </p>
  )
}

export function AIConversation({ simulationId }: AIConversationProps) {
  const { conversation, pendingQuestion, isLoading, error, askQuestion } =
    useConversation(simulationId)
  const [question, setQuestion] = useState('')
  const conversationContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = conversationContainerRef.current

    if (container && conversation.length > 0) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
    }
  }, [conversation.length])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const submittedQuestion = question.trim()

    if (!submittedQuestion || isLoading) {
      return
    }

    setQuestion('')
    const wasAnswered = await askQuestion(submittedQuestion)

    if (!wasAnswered) {
      setQuestion(submittedQuestion)
    }
  }

  return (
    <section className="border-border mt-6 border-t pt-6">
      <div className="mb-4">
        <h2 className="text-foreground flex items-center gap-2 text-base font-semibold">
          <MessageCircle
            className="text-primary"
            aria-hidden="true"
            size={20}
          />
          Converse com o Educador Financeiro
        </h2>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
          Tire dúvidas sobre esta simulação. A IA levará em conta seu
          diagnóstico e toda a conversa anterior.
        </p>
      </div>

      {(conversation.length > 0 || pendingQuestion) && (
        <div
          ref={conversationContainerRef}
          className="border-border mb-4 max-h-96 [scrollbar-width:thin] [scrollbar-color:var(--border)_transparent] space-y-5 overflow-y-auto rounded-xl border p-4"
          aria-live="polite"
        >
          {conversation.map((turn) => (
            <div key={turn.id} className="space-y-4">
              <article>
                <MessageHeader>Você</MessageHeader>
                <p className="text-muted-foreground ml-9 text-sm leading-relaxed whitespace-pre-wrap">
                  {turn.question}
                </p>
              </article>
              <article>
                <MessageHeader>Resposta da IA</MessageHeader>
                <AnswerText>{turn.answer}</AnswerText>
              </article>
            </div>
          ))}

          {pendingQuestion && (
            <div className="space-y-4">
              <article>
                <MessageHeader>Você</MessageHeader>
                <p className="text-muted-foreground ml-9 text-sm leading-relaxed whitespace-pre-wrap">
                  {pendingQuestion}
                </p>
              </article>
              <div
                className="text-muted-foreground ml-9 flex items-center gap-2 text-sm"
                role="status"
              >
                <LoaderCircle
                  className="animate-spin"
                  aria-hidden="true"
                  size={16}
                />
                A IA está preparando a resposta...
              </div>
            </div>
          )}
        </div>
      )}

      <form onSubmit={(event) => void handleSubmit(event)}>
        <label
          htmlFor={`question-${simulationId}`}
          className="text-foreground mb-2 block text-sm font-medium"
        >
          Faça uma pergunta sobre sua simulação
        </label>
        <textarea
          id={`question-${simulationId}`}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ex.: Como posso ajustar meu orçamento para alcançar a meta antes?"
          maxLength={2_000}
          rows={3}
          disabled={isLoading}
          className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary w-full resize-y rounded-xl border p-3 text-sm leading-relaxed outline-none disabled:cursor-not-allowed disabled:opacity-70"
        />

        {error && (
          <p className="mt-2 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        <div className="mt-3 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            icon={isLoading ? LoaderCircle : Send}
            disabled={isLoading || question.trim().length === 0}
            className={isLoading ? '[&>svg]:animate-spin' : ''}
          >
            {isLoading ? 'Enviando...' : 'Enviar pergunta'}
          </Button>
        </div>
      </form>
    </section>
  )
}
