import styled from 'styled-components';

const StyledBoardDrawerList = styled.div`
  flex: 1;
  & h3 {
    padding: 1em;
  }
  & .board-list {
    padding-block: 1em;
    flex: 1;

    & li {
      transition: padding 0.6s linear;
      gap: 1em;
      align-items: center;
      & svg > * {
        transition: all 0.4s linear;
      }

      &.create-new-link {
        margin-left: 0.5em;
      }
    }
    & button {
      padding: 1em 1em;
      text-align: left;

      &.active {
        background-color: hsl(var(--clr-primary));
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;

        & li {
          color: #ffffff;
          letter-spacing: 2px;
          padding-right: 4vw;
          & svg > * {
            fill: #ffffff;
          }
        }
      }
    }
  }
`;

export default StyledBoardDrawerList;
