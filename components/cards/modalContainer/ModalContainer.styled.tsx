import styled from 'styled-components';

const StyledModalContainer = styled.div`
  position: absolute;
  width: 100vw;
  min-height: 100%;
  height: 100vh;
  z-index: 100000;
  left: 0;
  top: 0;
  display: grid;
  place-items: center;
  & .bg {
    background-color: #000000;
    position: absolute;
    width: 100vw;
    min-height: 100%;
    height: 100vh;
    opacity: 0.5;
    z-index: -1;
    mix-blend-mode: normal;
  }
  & input {
  }

  & .col {
    align-items: center;
    --gap: 2em;
    & .icon {
      font-size: 2.5rem;
      transition: color 0.1s;
      &:hover {
        color: hsl(var(--clr-red));
      }
    }
  }
`;

export default StyledModalContainer;
