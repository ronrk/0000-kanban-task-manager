import styled from 'styled-components';

const StyledTaskManagerContainer = styled.div`
  overflow-x: scroll;
  overflow-y: scroll;
  align-self: stretch;
  height: 83vh;
  max-height: 100%;
  width: 100%;
  padding: 1em;
  display: grid;

  column-gap: 1em;
  row-gap: 0.5em;
  justify-content: start;
  grid-template-rows: 20px 1fr;

  & .column {
    width: clamp(15.5rem, 5vw, 21.875rem);
    height: 100%;
    border-radius: 6px;
    grid-row: 1/-1;
  }
`;

export default StyledTaskManagerContainer;
