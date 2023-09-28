import styled, { css } from "styled-components";

export type ButttonVariant = "primary" | "secondary" | "danger" | "success";
interface ButtonContainerProps {
  variant: ButttonVariant;
}
const buttonVariants = {
  primary: "purple",
  secondary: "orange",
  danger: "red",
  success: "green",
};
export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 50px;
  ${(props) => {
    return css`
      background-color: ${buttonVariants[props.variant]};
    `;
  }}
`;
