import styled from 'styled-components';

const StyledShowDrawerButton = styled.button`
  position: absolute;
  top: 85vh;
  width: 100px;
  display: flex;
  justify-content: flex-end;
  padding: 0.5em 1em;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  opacity: 0.2;
  z-index: 200;
  transition: all 0.3s;
  & .icon {
    font-size: 1.5em;
    filter: blur(0.9px) drop-shadow(0 0 0px transparent);
    transition: all 0.5s 0.2s;
  }

  &:hover {
    opacity: 1;
    & .icon {
      filter: blur(0) drop-shadow(0 0 2px red);
    }
  }
`;
export default StyledShowDrawerButton;
