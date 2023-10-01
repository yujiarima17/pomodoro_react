import { Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
// controlled / uncontrolled - conceito relacionado a trativa de inputs, sendo controlled é o controle a todo instante e uncontrolled apenas quando houver submit do form
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Its necessary to inform the task!'),
  minutesAmount: zod
    .number()
    .min(5)
    .max(60, 'The maximum minutes amount is 60 min to a cycle'),
})

// interface NewCycleFormData {
//   task: string
//   minutesAmount: number
// } - usa interface quando criamos uma tipagem completamente nova
//  usamos type quando herdamos uma tipagem
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}
export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }
    // sempre que uma alteração de estado depender do valor anterior, utiliza-se uma arrow function para isso
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    reset()
  }
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  console.log(activeCycle)
  // observando apenas o campo task
  const task = watch('task')
  const isSubmitDisabled = !task
  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">I will work in :</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1"></option>
            <option value="Projeto 2"></option>
            <option value="Projeto 3"></option>
            <option value="Projeto 4"></option>
          </datalist>
          <label htmlFor="">period</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>
        <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24}> </Play>
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
