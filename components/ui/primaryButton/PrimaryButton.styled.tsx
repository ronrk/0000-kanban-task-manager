import { FC } from 'react';
import styled from 'styled-components';

export interface IPrimaryButton
  extends React.ComponentPropsWithoutRef<'button'> {
  fullWidth?: boolean;
  color: 'primary' | 'primary-light' | 'red' | 'white';
}
const StyledPrimaryButton = styled.button<IPrimaryButton>`
  display: flex;
  justify-content: center;
  align-items: center;
  --gap: 0.5em;
  background-color: ${({ color }) =>
    color === 'white'
      ? 'hsla(var(--clr-primary-light),.3)'
      : `hsl(var(--clr-${color}))`};
  color: ${(props) =>
    props.color === 'white' ? 'hsl(var(--clr-primary-light))' : '#ffffff'};
  width: ${(props) => props.fullWidth && '100%'};
  padding: 0.75em 1.25em;
  border-radius: 100px;
  transition: all 0.2s;
  &:hover {
    filter: brightness(250%) contrast(150px);
    opacity: 0.8;
    color: ${({ color }) => color === 'primary-light' && '#000000'};
  }
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const PrimaryButton: FC<IPrimaryButton> = ({ children, ...props }) => (
  <StyledPrimaryButton {...props}>{children}</StyledPrimaryButton>
);

export default PrimaryButton;
