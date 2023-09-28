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
  border-radius: 4px;
  border: 0;
  margin: 8px;
  /* theme is a object with props, and these props are provided by the themeProvider */
  background-color: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme.white};
`;
