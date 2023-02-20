import { FC } from 'react';
import styled from 'styled-components';

export interface IPrimaryInput extends React.ComponentPropsWithRef<'input'> {
  fullWidth?: boolean;
}

const StyledPrimaryInput = styled.input<IPrimaryInput>`
  width: ${({ fullWidth }) => fullWidth && '100%'};
  border: 2px solid transparent;
  outline: 1px solid hsla(var(--clr-text-light), 1);
  border-radius: 5px;

  &:focus {
    border-color: hsla(var(--clr-text-light), 1);
    outline: none;
  }
`;

const PrimaryInput: FC<IPrimaryInput> = ({ children, ...props }) => (
  <StyledPrimaryInput {...props}>{children}</StyledPrimaryInput>
);

export default PrimaryInput;
