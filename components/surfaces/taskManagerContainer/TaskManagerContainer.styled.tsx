import styled from 'styled-components';

const StyledTaskManagerContainer = styled.div`
  height: 100%;
  width: 100%;

  padding: 1em;
  & .loading {
    align-self: center;
    margin-left: auto;
  }

  & .column {
    min-width: 300px;
    width: clamp(17.5rem, 15vw, 35.875rem);
    height: 100%;
    border-radius: 6px;
    border: 1px solid hsla(var(--clr-line));
    &.empty {
      margin-left: auto;
    }
  }
`;

export default StyledTaskManagerContainer;
