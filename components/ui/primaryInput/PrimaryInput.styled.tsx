import { FC } from 'react';
import styled from 'styled-components';

export interface IPrimaryInput extends React.ComponentPropsWithRef<'input'> {
  fullWidth?: boolean;
}

const StyledPrimaryInput = styled.input<IPrimaryInput>`
  width: ${({ fullWidth }) => fullWidth && '100%'};
  border: 2px solid transparent;
  border: 1px solid hsla(var(--clr-text-dark), 0.3);
  border-radius: 5px;
  padding: 0.875em 0.5em;

  &:hover {
    border: 1px solid hsla(var(--clr-primary-light), 1);
    outline: none;
  }
  &:focus {
    border: 1px solid hsla(var(--clr-primary), 1);
    outline: none;
  }
`;

const PrimaryInput: FC<IPrimaryInput> = ({ children, ...props }) => (
  <StyledPrimaryInput {...props}>{children}</StyledPrimaryInput>
);

export default PrimaryInput;
