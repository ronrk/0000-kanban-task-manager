import styled from 'styled-components';

const StyledBoardColumn = styled.div`
  & h3 {
    padding: 1rem;
    border-bottom: 2px hsla(var(--clr-line), 0.5) solid;
  }
  & .tasks {
    overflow-y: scroll;
  }

  & .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;

export default StyledBoardColumn;
