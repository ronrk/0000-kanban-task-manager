import styled from 'styled-components';

const StyledSingleTaskBox = styled.div`
  box-shadow: 0px 4px 6px rgba(54, 78, 126, 0.101545);
  border-radius: 8px;
  padding: 2em;
  text-align: left;
  cursor: pointer;
  &:hover {
    filter: brightness(50%);
    box-shadow: 0px 6px 8px rgba(54, 78, 126, 0.101545);
  }
`;

export default StyledSingleTaskBox;
