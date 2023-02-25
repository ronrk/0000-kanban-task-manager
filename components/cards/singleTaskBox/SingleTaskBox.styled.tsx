import styled from 'styled-components';

const StyledSingleTaskBox = styled.div`
  box-shadow: 0px 2px 4px rgba(54, 78, 126, 0.101545);
  border-radius: 8px;
  padding: 1em;
  margin: 1rem;
  text-align: left;
  cursor: pointer;
  align-items: center;
  transition: all 0.2s;
  &:hover {
    filter: contrast(50%) brightness(150%);
    box-shadow: 0px 8px 10px rgba(54, 78, 126, 0.301545);
  }
`;

export default StyledSingleTaskBox;
