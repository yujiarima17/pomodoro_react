import { HandPalm, Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from 'react'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { FormProvider, useForm } from 'react-hook-form'

import { NewCycleForm } from './components/NewCyclesForm'
import { Countdown } from './components/Countdown'
import { CyclesContext } from '../../contexts/CyclesContext'
// controlled / uncontrolled - conceito relacionado a trativa de inputs, sendo controlled é o controle a todo instante e uncontrolled apenas quando houver  submit do form

interface NewCycleFormData {
  task: string
  minutesAmount: number
}
//  - usa interface quando criamos uma tipagem completamente nova
//  usamos type quando herdamos uma tipagem

export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } =
    useContext(CyclesContext)
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
  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }
  // observando apenas o campo task
  const task = watch('task')
  const isSubmitDisabled = !task
  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm></NewCycleForm>
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24}> </HandPalm>
            Stop
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24}> </Play>
            Start
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
