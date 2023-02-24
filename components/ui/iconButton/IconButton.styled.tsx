import { ColorsType } from '@/types';
import { FC } from 'react';
import { CiLogout } from 'react-icons/ci';
import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi';
import styled from 'styled-components';

export interface IIconButton extends React.ComponentPropsWithRef<'button'> {
  fullWidth?: boolean;
  textLabel?: string;
  color: ColorsType;
  icon: 'add' | 'remove' | 'edit' | 'logout';
  background?: ColorsType;
}

const StyledIconButton = styled.button<IIconButton>`
  display: flex;
  justify-content: center;
  align-items: center;
  --gap: 0.5em;
  transition: all 0.2s;
  &:hover {
    filter: brightness(150%) contrast(250px);
    opacity: 0.8;

    & .icon {
      filter: brightness(150%) contrast(250px);
      opacity: 0.8;
    }
  }
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const IconButton: FC<IIconButton> = ({ ...props }) => (
  <StyledIconButton
    {...props}
    className={`add-subinput fs-400 text-${props.color} ${props.className} ${
      props.background ? `bg-${props.background}` : ''
    }`}
  >
    {props.icon === 'add' && (
      <HiOutlinePlus fontSize={'17px'} className={`icon text-${props.color}`} />
    )}
    {props.icon === 'remove' && (
      <HiOutlineMinus
        fontSize={'17px'}
        className={`icon text-${props.color}`}
      />
    )}
    {props.icon === 'add' && (
      <CiLogout fontSize={'17px'} className={`icon text-${props.color}`} />
    )}

    {props.textLabel}
  </StyledIconButton>
);

export default IconButton;
