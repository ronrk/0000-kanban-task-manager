import styled from 'styled-components';

const StyledEmptyColumn = styled.div`
  position: relative;
  z-index: 0;
  justify-self: center;
  align-items: center;
  justify-content: center;
  grid-row: 2/-1;
  height: 95%;
  margin-top: 0.5em;

  & button {
  }
  & .new-col-btn {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    --gap: 0.1em;
    filter: contrast(110%);
    transition: all 0.2s;
    &:hover {
      filter: saturate(250%);
    }
    &:active {
      transform: scale(0.98);
    }
  }
  & .empty-column-actions {
    position: absolute;

    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: hsla(var(--clr-text-dark), 0.3);

    & button {
      background-color: hsla(var(--clr-app-bg), 0.9);
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      & span {
        transition: all 0.2s;
        padding: 1em;
      }

      &:hover {
        background-color: hsl(var(--clr-primary-light));
        filter: saturate(250%);
        & span {
          transform: translateX(-50%);
          font-weight: 700;
        }
      }
      &:active {
        transform: scale(0.98);
      }
    }
    & .cancel-btn {
      flex-grow: 1;
      /* padding: 1em; */
      text-transform: uppercase;

      &:hover {
        background-color: hsla(var(--clr-red), 1);
        color: #ffffff;
      }
    }
  }
`;

export default StyledEmptyColumn;
