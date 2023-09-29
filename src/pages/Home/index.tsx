import { Play } from 'phosphor-react'
import { CountDownContainer, FormContainer, HomeContainer } from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">I will work in :</label>
          <input type="text" id="task" />
          <label htmlFor="">period</label>
          <input type="number" id="minutesAmount" />
          <span>minutes.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <span>:</span>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>
        <button type="submit">
          <Play size={24}> </Play>
          Começar
        </button>
      </form>
    </HomeContainer>
  )
}
