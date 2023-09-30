import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }
`
const STATUS_COLOR = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const
interface StatusProps {
  statusColor: keyof typeof STATUS_COLOR
}
export const Status = styled.span<StatusProps>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  /* pseudo elemento para adicionar conteúdo extra a elementos HTML, antes no caso */
  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background: ${(props) => props.theme[STATUS_COLOR[props.statusColor]]};
  }
  &::after {
  }
`
export const CountDownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};
  display: flex;
  gap: 2rem;
  span {
    background: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`
export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme['green-500']};
  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`
export const StartCountDownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-100']};
  &:not(:disabled)hover {
    background: ${(props) => props.theme['green-700']};
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
// forma de reutilizar o css dentro do styled components por meio de herança
const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500  ']};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};

  &::placeholder {
    color: ${(props) => props.theme['gray-500 ']};
  }
  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }
`
export const TaskInput = styled(BaseInput)`
  flex: 1;
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`
export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`
