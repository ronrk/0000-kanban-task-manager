import styled from 'styled-components';

export interface IPrimaryButton {
  fullWidth?: boolean;
  color: 'primary' | 'primary-light' | 'red' | 'white';
}
const PrimaryButton = styled.button<IPrimaryButton>`
  align-items: center;
  --gap: 0.5em;
  background-color: ${({ color }) =>
    color === 'white'
      ? 'hsla(var(--clr-primary-light),.3)'
      : `hsl(var(--clr-${color}))`};
  color: ${(props) =>
    props.color === 'white' ? 'hsl(var(--clr-primary))' : '#ffffff'};
  width: ${(props) => props.fullWidth && '100%'};
  padding: 1em 2em;
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

export default PrimaryButton;
