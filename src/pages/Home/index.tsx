import { HandPalm, Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { createContext, useState } from 'react'
import { NewCycleForm } from './components/NewCyclesForm'
import { Countdown } from './components/Countdown'
// controlled / uncontrolled - conceito relacionado a trativa de inputs, sendo controlled é o controle a todo instante e uncontrolled apenas quando houver  submit do form

interface NewCycleFormData {
  task: string
  minutesAmount: number
}
//  - usa interface quando criamos uma tipagem completamente nova
//  usamos type quando herdamos uma tipagem

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}
interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  markCurrentCycleAsFinished: () => void
}
export const CyclesContext = createContext({} as CyclesContextType)
export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Its necessary to inform the task!'),
    minutesAmount: zod
      .number()
      .min(5)
      .max(60, 'The maximum minutes amount is 60 min to a cycle'),
  })

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }
  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    // sempre que uma alteração de estado depender do valor anterior, utiliza-se uma arrow function para isso
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset()
  }
  function handleInterruptCycle() {
    setActiveCycleId(null)
  }

  // observando apenas o campo task
  const task = watch('task')
  const isSubmitDisabled = !task
  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown></Countdown>
        </CyclesContext.Provider>
        {activeCycle ? (
          <StopCountDownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24}> </HandPalm>
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24}> </Play>
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
