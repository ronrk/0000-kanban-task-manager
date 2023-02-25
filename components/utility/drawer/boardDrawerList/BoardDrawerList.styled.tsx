import styled from 'styled-components';

const StyledBoardDrawerList = styled.div`
  flex: 1;
  width: 100%;
  & h3 {
    padding: 1em;
  }
  & .board-list {
    padding-block: 1em;
    flex: 1;

    & li {
      gap: 1em;
      align-items: center;
      padding: 1em 1em;
      position: relative;
      margin-block: 1em;

      & svg > * {
        transition: all 0.4s linear;
      }

      &.create-new-link {
        margin-left: 0.5em;
        & button {
          align-items: center;
          --gap: 0.5rem;
        }
      }
      &::before {
        position: absolute;
        content: '';
        width: 0;
        height: 100%;
        top: 0;
        left: 0;
        background-color: hsl(var(--clr-primary));
        z-index: 1;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        transition: width 0.4s linear;
      }
      &.active {
        &::before {
          width: 95%;
        }
        & button {
          color: #ffffff;
          /* letter-spacing: 2px; */
          width: 100%;
          & svg > * {
            fill: #ffffff;
          }
        }
      }
      & button {
        text-align: left;
        position: relative;
        align-items: center;
        --gap: 1em;
        z-index: 2;
        &:hover {
          filter: brightness(150%);
        }
      }
    }
  }
`;

export default StyledBoardDrawerList;
