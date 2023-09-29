import { ButtonContainer, ButttonVariant } from './Button.styles'

interface ButtonProps {
  variant?: ButttonVariant
}
export function Button({ variant = 'primary' }: ButtonProps) {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}
