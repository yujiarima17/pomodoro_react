import styled from 'styled-components'

export const LayoutContainer = styled.div`
  max-width: 50rem;
  height: fit-content;
  margin: 5rem auto;
  padding: 2rem;
  background: ${(props) => props.theme['gray-800']};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`
