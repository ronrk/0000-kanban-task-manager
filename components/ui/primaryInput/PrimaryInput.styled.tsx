import { FC } from 'react';
import styled from 'styled-components';

export interface IPrimaryInput extends React.ComponentPropsWithoutRef<'input'> {
  fullWidth?: boolean;
}

const StyledPrimaryInput = styled.input<IPrimaryInput>`
  width: ${({ fullWidth }) => fullWidth && '100%'};

  outline: 1px solid hsla(var(--clr-text-light), 1);

  &:focus {
    border-color: hsla(var(--clr-text-light), 1);
    outline: none;
  }
`;

const PrimaryInput: FC<IPrimaryInput> = ({ children, ...props }) => (
  <StyledPrimaryInput {...props}>{children}</StyledPrimaryInput>
);

export default PrimaryInput;
