import { FC } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import styled from 'styled-components';

export interface IIconButton extends React.ComponentPropsWithRef<'button'> {
  fullWidth?: boolean;
}

const StyledIconButton = styled.button<IIconButton>`
  display: flex;
  justify-content: center;
  align-items: center;
  --gap: 0.5em;
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

const IconButton: FC<IIconButton> = ({ children, ...props }) => (
  <StyledIconButton
    {...props}
    className={`add-subinput fs-400 text-primary ${props.className}`}
  >
    <HiOutlinePlus fontSize={'17px'} className="text-primary" />
    {children}
  </StyledIconButton>
);

export default IconButton;
